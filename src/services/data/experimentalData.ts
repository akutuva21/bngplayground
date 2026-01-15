
export interface ExperimentalDataPoint {
  time: number;
  values: Record<string, number>;
}

/**
 * Parse experimental data from CSV string.
 * Format: time, Obs1, Obs2, ...
 * Comments start with #
 */
export function parseExperimentalData(input: string): ExperimentalDataPoint[] {
  if (!input.trim()) {
    return [];
  }

  const lines = input.split('\n').filter(line => line.trim() && !line.trim().startsWith('#'));
  if (lines.length === 0) {
    return [];
  }

  const data: ExperimentalDataPoint[] = [];
  const headers: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const parts = lines[i].split(',').map(s => s.trim());

    if (i === 0 && isNaN(parseFloat(parts[0]))) {
      // Header row
      headers.push(...parts.slice(1));
      continue;
    }

    const time = parseFloat(parts[0]);
    if (isNaN(time)) {
      throw new Error(`Invalid time value on line ${i + 1}`);
    }

    const values: Record<string, number> = {};
    for (let j = 1; j < parts.length; j++) {
      const value = parseFloat(parts[j]);
      if (isNaN(value)) {
        throw new Error(`Invalid value on line ${i + 1}, column ${j + 1}`);
      }
      // Use header if available, otherwise default name
      const key = headers[j - 1] || `Observable${j}`;
      values[key] = value;
    }

    data.push({ time, values });
  }

  return data;
}
