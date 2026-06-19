export function sanitizeLLMResponse(raw: string): string {
  let cleaned = raw.trim();

  // Remove markdown fences
  cleaned = cleaned.replace(/```[a-zA-Z]*/g, '');
  cleaned = cleaned.replace(/```/g, '');

  // Keep only JSON object portion
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');

  if (start === -1 || end === -1) {
    throw new Error('No JSON object found in response');
  }

  cleaned = cleaned.substring(start, end + 1);

  // Remove JS comments
  cleaned = cleaned.replace(/\/\/.*$/gm, '');

  // Replace multiline patch strings using backticks with quoted strings
  cleaned = cleaned.replace(/`/g, '"');

  return cleaned;
}
