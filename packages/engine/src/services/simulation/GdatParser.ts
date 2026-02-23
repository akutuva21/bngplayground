export interface GdatData {
  headers: string[];
  data: Record<string, number>[];
  rawHeaderLine?: string;
}

const splitLine = (line: string): string[] => {
  if (line.includes('\t')) return line.split('\t');
  if (line.includes(',')) return line.split(',');
  return line.trim().split(/\s+/);
};

export function parseGdat(gdat: string): GdatData {
  const lines = gdat.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const firstDataLine = lines.find((l) => !l.startsWith('#')) || '';
  const headerTokens = firstDataLine ? splitLine(firstDataLine).filter(Boolean) : [];

  const looksNumeric = (token: string) => Number.isFinite(Number(token));
  const hasTimeHeader = headerTokens.some((t) => t.toLowerCase() === 'time');
  const headerIsData = headerTokens.length > 0 && !hasTimeHeader && headerTokens.every(looksNumeric);

  const headers = headerIsData
    ? ['time', ...Array.from({ length: Math.max(0, headerTokens.length - 1) }, (_, i) => `O${i + 1}`)]
    : (headerTokens.length > 0 ? headerTokens : ['time']);

  const data: Record<string, number>[] = [];
  for (const line of lines) {
    if (!line || line.startsWith('#')) continue;
    const tokens = splitLine(line);
    if (tokens.length === 0) continue;
    const row: Record<string, number> = {};
    for (let i = 0; i < headers.length && i < tokens.length; i++) {
      const value = Number(tokens[i]);
      row[headers[i]] = Number.isFinite(value) ? value : 0;
    }
    data.push(row);
  }

  const rawHeaderLine = headerIsData || !firstDataLine ? undefined : `# ${firstDataLine}`;
  return { headers, data, rawHeaderLine };
}