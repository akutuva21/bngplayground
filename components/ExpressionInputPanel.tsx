import React, { useState, useCallback } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { CHART_COLORS } from '../constants';
import { validateObservablePattern } from '../src/utils/dynamicObservable';

export interface CustomExpression {
  id: string;
  name: string;
  expression: string;
  color: string;
  type: 'math' | 'bngl';  // math = computed from observable values, bngl = computed from species patterns
}

interface ExpressionInputPanelProps {
  expressions: CustomExpression[];
  onExpressionsChange: (expressions: CustomExpression[]) => void;
  observableNames: string[];
  hasSpeciesData?: boolean;  // Whether species-level data is available for BNGL patterns
}

// Simple expression evaluator that supports +, -, *, /, parentheses, and numbers
export function evaluateExpression(expression: string, variables: Record<string, number>): number | null {
  try {
    let expr = expression;
    
    // Sort variables by length (longest first) to avoid partial replacement issues
    const sortedVars = Object.keys(variables).sort((a, b) => b.length - a.length);
    
    for (const varName of sortedVars) {
      const value = variables[varName];
      const regex = new RegExp(`\\b${varName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
      expr = expr.replace(regex, `(${value})`);
    }
    
    // Validate: only allow numbers, operators, parentheses, spaces, dots
    if (!/^[\d\s+\-*/().e]+$/i.test(expr)) {
      return null;
    }
    
    // eslint-disable-next-line no-new-func
    const result = new Function(`return ${expr}`)();
    
    if (typeof result !== 'number' || !Number.isFinite(result)) {
      return null;
    }
    
    return result;
  } catch {
    return null;
  }
}

export const ExpressionInputPanel: React.FC<ExpressionInputPanelProps> = ({
  expressions,
  onExpressionsChange,
  observableNames,
  hasSpeciesData = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newExprName, setNewExprName] = useState('');
  const [newExpr, setNewExpr] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'math' | 'bngl'>('math');

  const addExpression = useCallback(() => {
    if (!newExprName.trim() || !newExpr.trim()) {
      setError('Provide both name and expression.');
      return;
    }
    
    if (mode === 'math') {
      // Validate math expression syntax
      const testVars: Record<string, number> = {};
      observableNames.forEach((name) => { testVars[name] = 1; });
      testVars['time'] = 1;
      
      const testResult = evaluateExpression(newExpr.trim(), testVars);
      if (testResult === null) {
        setError('Invalid expression. Use observable names, numbers, and operators (+, -, *, /).');
        return;
      }
    } else {
      // Validate BNGL pattern
      const validationError = validateObservablePattern(newExpr.trim());
      if (validationError) {
        setError(validationError);
        return;
      }
    }
    
    setError(null);
    const newId = `expr_${Date.now()}`;
    const colorIndex = (expressions.length + observableNames.length) % CHART_COLORS.length;
    
    onExpressionsChange([
      ...expressions,
      {
        id: newId,
        name: newExprName.trim(),
        expression: newExpr.trim(),
        color: CHART_COLORS[colorIndex],
        type: mode,
      },
    ]);
    
    setNewExprName('');
    setNewExpr('');
  }, [newExprName, newExpr, observableNames, expressions, onExpressionsChange, mode]);

  const removeExpression = useCallback((id: string) => {
    onExpressionsChange(expressions.filter((e) => e.id !== id));
  }, [expressions, onExpressionsChange]);

  return (
    <div className="border-t border-slate-200 dark:border-slate-700 pt-3 mt-3">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
      >
        <span className={`transform transition-transform ${isExpanded ? 'rotate-90' : ''}`}>▶</span>
        <span className="font-medium">Custom Expressions</span>
        {expressions.length > 0 && (
          <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs">
            {expressions.length}
          </span>
        )}
      </button>
      
      {isExpanded && (
        <div className="mt-3 space-y-3 pl-4">
          {/* Mode toggle */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Mode:</span>
            <div className="inline-flex rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
              <button
                onClick={() => setMode('math')}
                className={`px-2.5 py-1 rounded-l-lg transition-colors ${
                  mode === 'math' 
                    ? 'bg-primary text-white' 
                    : 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                Math
              </button>
              <button
                onClick={() => setMode('bngl')}
                disabled={!hasSpeciesData}
                title={hasSpeciesData ? 'Define observable using BNGL pattern' : 'Requires species-level simulation data'}
                className={`px-2.5 py-1 rounded-r-lg transition-colors ${
                  mode === 'bngl' 
                    ? 'bg-primary text-white' 
                    : 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700'
                } ${!hasSpeciesData ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                BNGL Pattern
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-500">
            {mode === 'math' ? (
              <>
                Compute from observables: {' '}
                {observableNames.slice(0, 3).map((n, i) => (
                  <code key={n} className="bg-slate-100 dark:bg-slate-700 px-1 rounded text-xs">
                    {n}{i < 2 && observableNames.length > i + 1 ? ', ' : ''}
                  </code>
                ))}
                {observableNames.length > 3 && '...'}
              </>
            ) : (
              <>Define a BNGL observable pattern like <code className="bg-slate-100 dark:bg-slate-700 px-1 rounded">A(b!+)</code> or <code className="bg-slate-100 dark:bg-slate-700 px-1 rounded">A.B</code></>
            )}
          </p>
          
          <div className="flex flex-wrap gap-2 items-end">
            <Input
              value={newExprName}
              onChange={(e) => setNewExprName(e.target.value)}
              placeholder="Name"
              className="w-24 text-sm"
            />
            <Input
              value={newExpr}
              onChange={(e) => setNewExpr(e.target.value)}
              placeholder={mode === 'math' ? 'e.g., A / (A + B)' : 'e.g., A(b!+)'}
              className="flex-1 min-w-[120px] text-sm"
              onKeyDown={(e) => e.key === 'Enter' && addExpression()}
            />
            <Button onClick={addExpression} className="text-sm py-1 px-3">Add</Button>
          </div>
          
          {error && (
            <div className="text-xs text-red-500">{error}</div>
          )}
          
          {expressions.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {expressions.map((expr) => (
                <div
                  key={expr.id}
                  className="flex items-center gap-1.5 px-2 py-1 rounded-full text-xs border"
                  style={{ borderColor: expr.color, backgroundColor: `${expr.color}15` }}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: expr.color }} />
                  <span className="font-medium">{expr.name}</span>
                  <span className="text-slate-500">
                    {expr.type === 'bngl' && '📦 '}
                    = {expr.expression}
                  </span>
                  <button
                    onClick={() => removeExpression(expr.id)}
                    className="ml-1 text-slate-400 hover:text-red-500"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
