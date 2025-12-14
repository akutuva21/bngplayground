/**
 * Hook and utilities for sharing models via URL.
 * Encodes model source code as base64 in URL hash.
 */

// Compress and encode BNGL code for URL
export function encodeModelForUrl(code: string): string {
  try {
    // Use TextEncoder for proper UTF-8 handling, then base64
    const bytes = new TextEncoder().encode(code);
    const binString = Array.from(bytes, (b) => String.fromCodePoint(b)).join('');
    return btoa(binString);
  } catch {
    // Fallback to simple base64
    return btoa(unescape(encodeURIComponent(code)));
  }
}

// Decode BNGL code from URL
export function decodeModelFromUrl(encoded: string): string {
  try {
    const binString = atob(encoded);
    const bytes = Uint8Array.from(binString, (c) => c.codePointAt(0) ?? 0);
    return new TextDecoder().decode(bytes);
  } catch {
    // Fallback
    return decodeURIComponent(escape(atob(encoded)));
  }
}

// Generate a shareable URL for the current model
export function generateShareUrl(code: string): string {
  const encoded = encodeModelForUrl(code);
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}#model=${encoded}`;
}

// Extract model from URL hash if present
export function getModelFromUrl(): string | null {
  if (typeof window === 'undefined') return null;
  const hash = window.location.hash;
  if (!hash || !hash.includes('model=')) return null;
  
  try {
    const match = hash.match(/model=([A-Za-z0-9+/=]+)/);
    if (match && match[1]) {
      return decodeModelFromUrl(match[1]);
    }
  } catch (e) {
    console.warn('Failed to decode model from URL:', e);
  }
  return null;
}

// Clear the model from URL hash
export function clearModelFromUrl(): void {
  if (typeof window !== 'undefined' && window.location.hash.includes('model=')) {
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
  }
}
