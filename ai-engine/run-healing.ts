import fs from 'fs';
import { generatePrompt } from './prompt-generator';
import { queryPhi } from './phi-client';

async function main() {
  const failure = JSON.parse(
    fs.readFileSync('./artifacts/failure.json', 'utf8')
  );

  const prompt = generatePrompt(failure);

  console.log('Sending prompt to Phi-3...\n');

  const response = await queryPhi(prompt);

  console.log('\n===== PHI-3 RESPONSE =====\n');
  console.log(response);
}

main();
