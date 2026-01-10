
function tokenize(expr) {
  const tokens = [];
  let i = 0;
  
  while (i < expr.length) {
    const char = expr[i];
    
    // Skip whitespace
    if (/\s/.test(char)) {
      i++;
      continue;
    }
    
    // Number (including scientific notation)
    if (/[0-9.]/.test(char)) {
      let num = '';
      // Integer/decimal part
      while (i < expr.length && /[0-9.]/.test(expr[i])) {
        num += expr[i++];
      }
      // Scientific notation: e or E followed by optional sign and digits
      if (i < expr.length && /[eE]/.test(expr[i])) {
        num += expr[i++];  // 'e' or 'E'
        if (i < expr.length && /[+-]/.test(expr[i])) {
          num += expr[i++];  // optional sign (critical fix for negative exponents)
        }
        while (i < expr.length && /[0-9]/.test(expr[i])) {
          num += expr[i++];  // exponent digits
        }
      }
      tokens.push(num);
      continue;
    }
    
    // Identifier (parameter name, function name)
    if (/[a-zA-Z_]/.test(char)) {
      let ident = '';
      while (i < expr.length && /[a-zA-Z0-9_]/.test(expr[i])) {
        ident += expr[i++];
      }
      tokens.push(ident);
      continue;
    }
    
    // Operators and parentheses
    if ('+-*/^()'.includes(char)) {
      tokens.push(char);
      i++;
      continue;
    }
    
    // Unknown character - skip
    i++;
  }
  
  return tokens;
}

const tests = [
  "1.4e-15",
  "1e-8",
  "6.02e23",
  "c0/Na/V*tF/pF",
  "1e6/NaV",
  "1.0e+4",
  "1e8"
];

tests.forEach(t => console.log(`${t} ->`, JSON.stringify(tokenize(t))));
