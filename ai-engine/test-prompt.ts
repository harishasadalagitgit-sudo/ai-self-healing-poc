import fs from 'fs';
import { generatePrompt } from './prompt-generator';

const failure = JSON.parse(
  fs.readFileSync('./artifacts/failure.json', 'utf8')
);

const prompt = generatePrompt(failure);

console.log(prompt);
