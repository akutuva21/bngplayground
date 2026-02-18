import React from 'react';

export interface Status {
    type: 'success' | 'error' | 'warning' | 'info';
    message: string | React.ReactNode;
}

export type ValidationSeverity = 'error' | 'warning' | 'info';

export interface ValidationWarning {
    severity: ValidationSeverity;
    message: string;
    suggestion?: string;
    relatedElement?: string;
    sourceHint?: string;
}

export interface EditorMarker {
    severity: ValidationSeverity;
    message: string;
    startLineNumber: number;
    endLineNumber: number;
    startColumn?: number;
    endColumn?: number;
}
