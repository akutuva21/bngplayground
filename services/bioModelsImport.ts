const BIOMODELS_DOWNLOAD_BASE = 'https://www.ebi.ac.uk/biomodels/model/download';
const ZIP_MAGIC_0 = 0x50;
const ZIP_MAGIC_1 = 0x4b;
const ZIP_MAGIC_2 = 0x03;
const ZIP_MAGIC_3 = 0x04;

const SBML_TAG_RE = /<\s*sbml(?:\s|>)/i;
const HTML_TAG_RE = /<!doctype\s+html|<\s*html(?:\s|>)/i;

type FetchLike = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

export interface BioModelsSbmlResult {
  normalizedId: string;
  sbmlText: string;
  sourceUrl: string;
  sourceEntry?: string;
}

const stripBom = (text: string): string => text.replace(/^\uFEFF/, '');

const isLikelySbml = (text: string): boolean => SBML_TAG_RE.test(stripBom(text).slice(0, 8192));

const isLikelyHtml = (text: string): boolean => HTML_TAG_RE.test(stripBom(text).slice(0, 4096));

const looksLikeZip = async (blob: Blob): Promise<boolean> => {
  if (blob.size < 4) return false;
  const head = new Uint8Array(await blob.slice(0, 4).arrayBuffer());
  return (
    head[0] === ZIP_MAGIC_0 &&
    head[1] === ZIP_MAGIC_1 &&
    head[2] === ZIP_MAGIC_2 &&
    head[3] === ZIP_MAGIC_3
  );
};

const normalizeZipPath = (entryPath: string): string => {
  try {
    const decoded = decodeURIComponent(entryPath);
    return decoded.replace(/^\.?\//, '').replace(/^\/+/, '');
  } catch {
    return entryPath.replace(/^\.?\//, '').replace(/^\/+/, '');
  }
};

const parseManifestSbmlEntries = (manifestXml: string): string[] => {
  const entries: string[] = [];
  const contentTagRe = /<\s*content\b([^>]*)>/gi;
  let match: RegExpExecArray | null = null;
  while ((match = contentTagRe.exec(manifestXml)) !== null) {
    const attrs = match[1] ?? '';
    const locationMatch = attrs.match(/\blocation\s*=\s*["']([^"']+)["']/i);
    const formatMatch = attrs.match(/\bformat\s*=\s*["']([^"']+)["']/i);
    if (!locationMatch || !formatMatch) continue;
    if (!/sbml/i.test(formatMatch[1])) continue;
    entries.push(normalizeZipPath(locationMatch[1]));
  }
  return entries;
};

const scoreEntryName = (name: string): number => {
  const lower = name.toLowerCase();
  let score = 0;
  if (lower.endsWith('.sbml')) score += 6;
  if (lower.endsWith('.xml')) score += 3;
  if (lower.includes('model')) score += 2;
  if (lower.includes('manifest')) score -= 10;
  if (lower.includes('metadata')) score -= 7;
  if (lower.endsWith('.rdf')) score -= 7;
  if (lower.includes('sedml') || lower.endsWith('.sedx')) score -= 6;
  return score;
};

const extractSbmlFromOmex = async (blob: Blob): Promise<{ sbmlText: string; sourceEntry: string }> => {
  const jsZipModule = await import('jszip');
  const JSZip = jsZipModule.default || jsZipModule;
  const zip = await JSZip.loadAsync(await blob.arrayBuffer());
  const allEntries = Object.values(zip.files)
    .filter((entry) => !entry.dir)
    .map((entry) => entry.name);

  const prioritized = new Set<string>();
  const manifestFile = zip.file('manifest.xml');
  if (manifestFile) {
    try {
      const manifestXml = await manifestFile.async('string');
      const manifestCandidates = parseManifestSbmlEntries(manifestXml);
      for (const candidate of manifestCandidates) {
        if (zip.file(candidate)) {
          prioritized.add(candidate);
        }
      }
    } catch {
      // Ignore malformed manifest and continue with content heuristics.
    }
  }

  allEntries
    .filter((name) => /\.(xml|sbml)$/i.test(name))
    .sort((a, b) => scoreEntryName(b) - scoreEntryName(a))
    .forEach((name) => prioritized.add(name));

  for (const entryName of prioritized) {
    const file = zip.file(entryName);
    if (!file) continue;
    const text = await file.async('string');
    if (isLikelySbml(text)) {
      return { sbmlText: text, sourceEntry: entryName };
    }
  }

  throw new Error('OMEX archive did not contain a valid SBML XML document.');
};

const fetchAttempt = async (
  fetchImpl: FetchLike,
  normalizedId: string,
  url: string
): Promise<BioModelsSbmlResult> => {
  const response = await fetchImpl(url, {
    headers: {
      Accept: 'application/xml,text/xml,application/octet-stream,*/*',
    },
    redirect: 'follow',
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const blob = await response.blob();
  const resolvedUrl = response.url || url;

  if (await looksLikeZip(blob)) {
    const { sbmlText, sourceEntry } = await extractSbmlFromOmex(blob);
    return {
      normalizedId,
      sbmlText,
      sourceUrl: resolvedUrl,
      sourceEntry,
    };
  }

  const text = await blob.text();
  if (isLikelySbml(text)) {
    return {
      normalizedId,
      sbmlText: text,
      sourceUrl: resolvedUrl,
    };
  }

  if (isLikelyHtml(text)) {
    throw new Error('Received HTML instead of SBML.');
  }

  throw new Error('Response did not contain SBML content.');
};

export const normalizeBioModelsId = (id: string): string => {
  const trimmed = id.trim().toUpperCase();
  if (/^\d{1,10}$/.test(trimmed)) {
    return `BIOMD${trimmed.padStart(10, '0')}`;
  }
  if (/^BIOMD\d{10}$/.test(trimmed)) {
    return trimmed;
  }
  throw new Error('Enter a valid BioModels ID (e.g., BIOMD0000000001).');
};

export const fetchBioModelsSbml = async (
  id: string,
  fetchImpl: FetchLike = fetch
): Promise<BioModelsSbmlResult> => {
  const normalizedId = normalizeBioModelsId(id);
  const encodedId = encodeURIComponent(normalizedId);
  const attempts = [
    `${BIOMODELS_DOWNLOAD_BASE}/${encodedId}?filename=${encodedId}_url.xml`,
    `${BIOMODELS_DOWNLOAD_BASE}/${encodedId}`,
  ];

  let lastError: unknown = null;
  for (const url of attempts) {
    try {
      return await fetchAttempt(fetchImpl, normalizedId, url);
    } catch (error) {
      lastError = error;
    }
  }

  const detail = lastError instanceof Error ? lastError.message : String(lastError ?? 'Unknown error');
  throw new Error(`Failed to fetch SBML for ${normalizedId}. ${detail}`);
};
