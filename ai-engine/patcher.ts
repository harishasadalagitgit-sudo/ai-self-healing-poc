import fs from 'fs';

export function applyPatch(
  filePath: string,
  oldSelector: string,
  newSelector: string
) {
  let content = fs.readFileSync(filePath, 'utf8');

  content = content.replace(oldSelector, newSelector);

  fs.writeFileSync(filePath, content);

  console.log(`Patched: ${oldSelector} → ${newSelector}`);
}
