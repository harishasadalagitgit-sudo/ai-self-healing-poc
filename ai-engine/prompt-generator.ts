export function generatePrompt(failure: any): string {
  return `
You are an AI assistant that repairs failed Playwright selectors.

TASK:
A Playwright test failed because a selector no longer matches an element in the DOM.

YOUR JOB:
Find the best replacement selector from the DOM snapshot.

STRICT RULES:
1. Respond with ONLY valid JSON
2. Do NOT use markdown
3. Do NOT include explanation
4. Do NOT include code fences
5. Do NOT include comments
6. Use ONLY selectors that exist in the DOM
7. Prefer selectors in this priority order:
   - id selector (#elementId)
   - data-testid
   - role or text selector
   - CSS selector

OUTPUT FORMAT (must match exactly):
{
  "suggestedSelector": "string",
  "confidence": 0.0
}

CONFIDENCE RULES:
- 0.90 to 1.00 → exact unique match found
- 0.70 to 0.89 → likely match but some ambiguity
- below 0.70 → low confidence

FAILED SELECTOR:
${failure.failedSelector}

ERROR:
${failure.error}

DOM SNAPSHOT:
${failure.dom}
`;
}
