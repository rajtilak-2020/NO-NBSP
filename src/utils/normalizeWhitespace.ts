export function normalizeWhitespace(text: string): string {
  if (!text) return '';

  let result = text;

  result = result.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  result = result.replace(/[\u00A0\u202F\u2007\u200B\u2060\u180E\u2000-\u200A\u205F\u3000\uFEFF]/g, ' ');

  const codeBlockPattern = /```[\s\S]*?```/g;
  const codeBlocks: string[] = [];
  result = result.replace(codeBlockPattern, (match) => {
    codeBlocks.push(match);
    return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
  });

  result = result.replace(/ {2,}/g, ' ');

  result = result.replace(/\n{4,}/g, '\n\n\n');

  result = result.split('\n').map(line => line.replace(/^\s+|\s+$/g, '')).join('\n');

  codeBlocks.forEach((block, index) => {
    result = result.replace(`__CODE_BLOCK_${index}__`, block);
  });

  return result;
}
