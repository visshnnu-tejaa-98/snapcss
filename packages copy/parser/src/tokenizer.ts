/**
 * Splits a class string into tokens on "-" delimiters.
 * Treats [...] bracket groups as a single unbreakable token.
 *
 * Examples:
 *   "p-4"              → ["p", "4"]
 *   "pt-[150px]"       → ["pt", "[150px]"]
 *   "bg-red-500"       → ["bg", "red", "500"]
 *   "border-t-[3px]"   → ["border", "t", "[3px]"]
 *   "rounded-tl-lg"    → ["rounded", "tl", "lg"]
 *   "grid-cols-[1fr_2fr]" → ["grid", "cols", "[1fr_2fr]"]
 */
export function tokenize(cls: string): string[] {
  const withoutPrefix = cls;
  const tokens: string[] = [];
  let current = "";
  let inBracket = false;

  for (const char of withoutPrefix) {
    if (char === "[") {
      inBracket = true;
      current += char;
    } else if (char === "]") {
      inBracket = false;
      current += char;
    } else if (char === "-" && !inBracket) {
      if (current) tokens.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  if (current) tokens.push(current);
  return tokens;
}
