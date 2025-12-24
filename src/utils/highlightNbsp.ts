export interface HighlightedSegment {
  text: string;
  isRemoved: boolean;
}

export function highlightRemovedContent(text: string): HighlightedSegment[] {
  if (!text) return [];

  const segments: HighlightedSegment[] = [];
  let i = 0;

  while (i < text.length) {
    const char = text[i];
    
    // Check for NBSP and special whitespace characters
    if (/[\u00A0\u202F\u2007\u200B\u2060\u180E\u2000-\u200A\u205F\u3000\uFEFF]/.test(char)) {
      segments.push({ text: '•', isRemoved: true });
      i++;
    }
    // Check for multiple consecutive spaces (2 or more)
    else if (char === ' ' && text[i + 1] === ' ') {
      let spaceCount = 0;
      while (i < text.length && text[i] === ' ') {
        spaceCount++;
        i++;
      }
      // Keep first space, highlight the rest
      segments.push({ text: ' ', isRemoved: false });
      if (spaceCount > 1) {
        segments.push({ text: '•'.repeat(spaceCount - 1), isRemoved: true });
      }
    }
    // Check for excessive newlines (4 or more)
    else if (char === '\n') {
      let newlineCount = 0;
      const startIdx = i;
      while (i < text.length && text[i] === '\n') {
        newlineCount++;
        i++;
      }
      if (newlineCount >= 4) {
        // Keep 3 newlines, highlight the rest
        segments.push({ text: text.slice(startIdx, startIdx + 3), isRemoved: false });
        segments.push({ text: '\u21b5'.repeat(newlineCount - 3), isRemoved: true });
      } else {
        segments.push({ text: text.slice(startIdx, i), isRemoved: false });
      }
    }
    // Regular character
    else {
      let normalText = '';
      while (i < text.length && 
             !/[\u00A0\u202F\u2007\u200B\u2060\u180E\u2000-\u200A\u205F\u3000\uFEFF]/.test(text[i]) &&
             text[i] !== '\n' &&
             !(text[i] === ' ' && text[i + 1] === ' ')) {
        normalText += text[i];
        i++;
      }
      if (normalText) {
        segments.push({ text: normalText, isRemoved: false });
      }
    }
  }

  return segments;
}

export function hasRemovableContent(text: string): boolean {
  // Check for NBSP characters
  if (/[\u00A0\u202F\u2007\u200B\u2060\u180E\u2000-\u200A\u205F\u3000\uFEFF]/.test(text)) return true;
  // Check for multiple spaces
  if (/ {2,}/.test(text)) return true;
  // Check for 4+ newlines
  if (/\n{4,}/.test(text)) return true;
  return false;
}