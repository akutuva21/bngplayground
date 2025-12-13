/**
 * Experimental data point for overlaying on simulation results
 */
export interface ExperimentalDataPoint {
    time: number;
    value: number;
    error?: number; // Optional error bar (e.g., standard deviation)
}

/**
 * Experimental dataset (one column of experimental data)
 */
export interface ExperimentalDataset {
    name: string;          // Column name (should match an observable)
    points: ExperimentalDataPoint[];
    color?: string;        // Optional custom color
}

/**
 * Collection of experimental datasets from a single CSV file
 */
export interface ExperimentalData {
    datasets: ExperimentalDataset[];
    fileName?: string;
}

/**
 * Parse a CSV string into experimental data.
 * Expected format:
 *   time,Observable1,Observable1_error,Observable2,...
 *   0.0,100.5,5.2,200.3,...
 *   1.0,95.2,4.8,195.1,...
 * 
 * Columns ending with "_error" or "_sd" or "_err" are treated as error bars
 * for the preceding column.
 */
export function parseExperimentalCSV(csvText: string): ExperimentalData {
    const lines = csvText.trim().split(/\r?\n/);
    if (lines.length < 2) {
        throw new Error('CSV must have at least a header row and one data row');
    }

    // Parse header
    const headers = lines[0].split(',').map(h => h.trim());

    // Find time column
    const timeColIndex = headers.findIndex(h =>
        h.toLowerCase() === 'time' || h.toLowerCase() === 't'
    );
    if (timeColIndex === -1) {
        throw new Error('CSV must have a "time" or "t" column');
    }

    // Identify data columns vs error columns
    const errorSuffixes = ['_error', '_err', '_sd', '_stdev', '_stderr'];
    const isErrorColumn = (name: string) =>
        errorSuffixes.some(suffix => name.toLowerCase().endsWith(suffix));

    const getBaseColumnName = (errorColName: string) => {
        for (const suffix of errorSuffixes) {
            if (errorColName.toLowerCase().endsWith(suffix)) {
                return errorColName.slice(0, -suffix.length);
            }
        }
        return errorColName;
    };

    // Build dataset map
    const datasetMap = new Map<string, ExperimentalDataPoint[]>();
    const errorMap = new Map<string, number[]>(); // Maps base column name to error values

    // Initialize datasets for non-error, non-time columns
    headers.forEach((header, idx) => {
        if (idx === timeColIndex) return;
        if (isErrorColumn(header)) return;
        datasetMap.set(header, []);
    });

    // Parse data rows
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        const values = line.split(',').map(v => v.trim());
        const time = parseFloat(values[timeColIndex]);
        if (isNaN(time)) continue;

        headers.forEach((header, idx) => {
            if (idx === timeColIndex) return;

            const value = parseFloat(values[idx]);
            if (isNaN(value)) return;

            if (isErrorColumn(header)) {
                const baseName = getBaseColumnName(header);
                if (!errorMap.has(baseName)) {
                    errorMap.set(baseName, []);
                }
                errorMap.get(baseName)!.push(value);
            } else {
                const dataset = datasetMap.get(header);
                if (dataset) {
                    dataset.push({ time, value });
                }
            }
        });
    }

    // Merge error values into datasets
    const datasets: ExperimentalDataset[] = [];
    datasetMap.forEach((points, name) => {
        const errors = errorMap.get(name);
        if (errors && errors.length === points.length) {
            points.forEach((point, idx) => {
                point.error = errors[idx];
            });
        }
        datasets.push({ name, points });
    });

    return { datasets };
}

/**
 * Read a CSV file and parse it into experimental data
 */
export async function readExperimentalCSVFile(file: File): Promise<ExperimentalData> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const text = e.target?.result as string;
                const data = parseExperimentalCSV(text);
                data.fileName = file.name;
                resolve(data);
            } catch (err) {
                reject(err);
            }
        };
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsText(file);
    });
}
