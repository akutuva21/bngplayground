import type { BNGLModel } from '../../types';

export enum ValidationErrorType {
  TOTAL_RATE_MODIFIER = 'TOTAL_RATE_MODIFIER',
  OBSERVABLE_DEPENDENT_RATE = 'OBSERVABLE_DEPENDENT_RATE',
  UNSUPPORTED_FUNCTION = 'UNSUPPORTED_FUNCTION',
  MISSING_REQUIREMENTS = 'MISSING_REQUIREMENTS'
}

export interface ValidationIssue {
  type: ValidationErrorType;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
}

const containsToken = (value: string, token: string): boolean =>
  value.toLowerCase().includes(token.toLowerCase());

export class NFsimValidator {
  static validateForNFsim(model: BNGLModel): ValidationResult {
    return getValidator().validateForNFsim(model);
  }

  validateForNFsim(model: BNGLModel): ValidationResult {
    const errors: ValidationIssue[] = [];
    const warnings: ValidationIssue[] = [];

    if (!model.species || model.species.length === 0) {
      errors.push({
        type: ValidationErrorType.MISSING_REQUIREMENTS,
        message: 'Model must include at least one species for NFsim simulation.'
      });
    }

    const rules = model.reactionRules || [];
    for (const rule of rules) {
      const rate = String(rule.rate ?? '');
      if (containsToken(rate, 'TotalRate')) {
        errors.push({
          type: ValidationErrorType.TOTAL_RATE_MODIFIER,
          message: 'TotalRate modifiers are not supported by NFsim.'
        });
      }

      const observables = model.observables || [];
      for (const obs of observables) {
        if (obs?.name && containsToken(rate, obs.name)) {
          errors.push({
            type: ValidationErrorType.OBSERVABLE_DEPENDENT_RATE,
            message: `Observable-dependent rate detected: ${obs.name}`
          });
          break;
        }
      }
    }

    if (model.functions && model.functions.length > 0) {
      warnings.push({
        type: ValidationErrorType.UNSUPPORTED_FUNCTION,
        message: 'Model contains functions; NFsim compatibility is not guaranteed in fallback mode.'
      });
    }

    return { valid: errors.length === 0, errors, warnings };
  }
}

let cachedValidator: NFsimValidator | null = null;

export function getValidator(): NFsimValidator {
  if (!cachedValidator) cachedValidator = new NFsimValidator();
  return cachedValidator;
}

export function resetValidator(): void {
  cachedValidator = null;
}