/**
 * Strips the "snap-" prefix and splits the rest into tokens.
 * Treats [...] bracket groups as a single unbreakable token.
 *
 * Examples:
 *   "snap-p-4"              → ["p", "4"]
 *   "snap-pt-[150px]"       → ["pt", "[150px]"]
 *   "snap-bg-red-500"       → ["bg", "red", "500"]
 *   "snap-border-t-[3px]"   → ["border", "t", "[3px]"]
 *   "snap-rounded-tl-lg"    → ["rounded", "tl", "lg"]
 *   "snap-grid-cols-[1fr_2fr]" → ["grid", "cols", "[1fr_2fr]"]
 */

export const tokenize = (cls: string) => {
  const withoutPrefix = cls.replace(/^snap-/, "");
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
};
