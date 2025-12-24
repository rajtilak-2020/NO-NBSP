import { describe, it, expect } from 'vitest';
import { highlightRemovedContent, hasRemovableContent } from './highlightNbsp';

describe('highlightRemovedContent', () => {
  it('should return empty array for empty string', () => {
    expect(highlightRemovedContent('')).toEqual([]);
  });

  it('should return single segment for text without removable content', () => {
    const result = highlightRemovedContent('Hello world');
    expect(result).toEqual([
      { text: 'Hello world', isRemoved: false }
    ]);
  });

  it('should highlight NBSP characters', () => {
    const textWithNbsp = 'Hello\u00A0world';
    const result = highlightRemovedContent(textWithNbsp);
    expect(result).toEqual([
      { text: 'Hello', isRemoved: false },
      { text: '•', isRemoved: true },
      { text: 'world', isRemoved: false }
    ]);
  });

  it('should highlight multiple spaces', () => {
    const textWithSpaces = 'Hello  world';
    const result = highlightRemovedContent(textWithSpaces);
    expect(result).toEqual([
      { text: 'Hello', isRemoved: false },
      { text: ' ', isRemoved: false },
      { text: '•', isRemoved: true },
      { text: 'world', isRemoved: false }
    ]);
  });
});

describe('hasRemovableContent', () => {
  it('should return false for text without removable content', () => {
    expect(hasRemovableContent('Hello world')).toBe(false);
  });

  it('should return true for text with NBSP', () => {
    expect(hasRemovableContent('Hello\u00A0world')).toBe(true);
  });

  it('should return true for text with multiple spaces', () => {
    expect(hasRemovableContent('Hello  world')).toBe(true);
  });

  it('should return false for empty string', () => {
    expect(hasRemovableContent('')).toBe(false);
  });
});