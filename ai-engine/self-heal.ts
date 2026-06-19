import fs from 'fs';
import { generatePrompt } from './prompt-generator';
import { queryPhi } from './phi-client';
import { validatePatch } from './validator';
import { applyPatch } from './patcher';
import { sanitizeLLMResponse } from './parser';

async function main() {
  const failure = JSON.parse(
    fs.readFileSync('./artifacts/failure.json', 'utf8')
  );

  const prompt = generatePrompt(failure);

  console.log('Querying Phi-3...');
  const rawResponse = await queryPhi(prompt);

  console.log('Phi Response:');
  console.log(rawResponse);

  const sanitized = sanitizeLLMResponse(rawResponse);
  console.log('Sanitized response:');
  console.log(sanitized);
  const response = JSON.parse(sanitized);

  const validation = validatePatch(
    response.suggestedSelector,
    failure.dom,
    response.confidence
  );

  console.log(validation);

  if (!validation.valid) {
    console.log('Patch rejected.');
    return;
  }

  applyPatch(
    './tests/login.spec.ts',
    failure.failedSelector,
    response.suggestedSelector
  );

  console.log('Self-healing complete.');
}

main();
