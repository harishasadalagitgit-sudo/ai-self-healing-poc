export function validatePatch(
  selector: string,
  dom: string,
  confidence: number
) {
  if (confidence < 0.7) {
    return {
      valid: false,
      reason: 'Low confidence'
    };
  }

  const id = selector.replace('#', '');

  if (!dom.includes(`id="${id}"`)) {
    return {
      valid: false,
      reason: 'Selector not found in DOM'
    };
  }

  return {
    valid: true,
    reason: 'Patch validated'
  };
}
