import fs from 'fs';

function extractSelector(message: string) {
  const match = message.match(/locator\('(.+?)'\)/);
  return match ? match[1] : null;
}

export function saveFailure(dom: string, error: any) {
  const failure = {
    error: error.message,
    failedSelector: extractSelector(error.message),
    dom,
    timestamp: new Date().toISOString()
  };

  fs.writeFileSync(
    './artifacts/failure.json',
    JSON.stringify(failure, null, 2)
  );
}
