import { describe, it, expect } from 'vitest';
import { normalizeWhitespace } from './normalizeWhitespace';

describe('normalizeWhitespace', () => {
  it('should handle empty string', () => {
    expect(normalizeWhitespace('')).toBe('');
  });

  it('should normalize line endings to \\n', () => {
    expect(normalizeWhitespace('line1\r\nline2')).toBe('line1\nline2');
    expect(normalizeWhitespace('line1\rline2')).toBe('line1\nline2');
  });

  it('should replace non-breaking spaces with normal spaces', () => {
    const textWithNbsp = 'Hello\u00A0world';
    expect(normalizeWhitespace(textWithNbsp)).toBe('Hello world');
  });

  it('should replace various Unicode whitespace characters with normal spaces', () => {
    const textWithUnicode = 'Hello\u202Fworld\u2007test\u200Bexample';
    const result = normalizeWhitespace(textWithUnicode);
    expect(result).toBe('Hello world test example');
  });

  it('should collapse multiple spaces into single space', () => {
    expect(normalizeWhitespace('Hello    world')).toBe('Hello world');
    expect(normalizeWhitespace('Multiple   spaces   here')).toBe('Multiple spaces here');
  });

  it('should collapse 4+ consecutive blank lines to max 3', () => {
    const input = 'line1\n\n\n\n\n\nline2';
    const expected = 'line1\n\n\nline2';
    expect(normalizeWhitespace(input)).toBe(expected);
  });

  it('should preserve up to 2 blank lines', () => {
    const input = 'line1\n\n\nline2';
    expect(normalizeWhitespace(input)).toBe(input);
  });

  it('should trim leading and trailing spaces on each line', () => {
    const input = '  line1  \n  line2  \n  line3  ';
    const expected = 'line1\nline2\nline3';
    expect(normalizeWhitespace(input)).toBe(expected);
  });

  it('should preserve spacing inside code blocks', () => {
    const input = 'Text before\n```\ncode    with   spaces\n  indented  line\n```\nText after';
    const result = normalizeWhitespace(input);
    expect(result).toContain('code    with   spaces');
    expect(result).toContain('  indented  line');
  });

  it('should collapse spaces outside code blocks but not inside', () => {
    const input = 'Multiple    spaces\n```\ncode    with   spaces\n```\nMore    spaces';
    const result = normalizeWhitespace(input);
    expect(result).toBe('Multiple spaces\n```\ncode    with   spaces\n```\nMore spaces');
  });

  it('should handle multiple code blocks', () => {
    const input = '```\nblock1   spaces\n```\nRegular    text\n```\nblock2   spaces\n```';
    const result = normalizeWhitespace(input);
    expect(result).toContain('block1   spaces');
    expect(result).toContain('block2   spaces');
    expect(result).toContain('Regular text');
  });

  it('should apply all transformations together', () => {
    const input = '  Line1\u00A0with\u202Fnbsp    \r\n\r\n\r\n\r\n  Line2  with   spaces  ';
    const result = normalizeWhitespace(input);
    expect(result).toBe('Line1 with nbsp\n\n\nLine2 with spaces');
  });

  it('should handle text with code blocks and all transformations', () => {
    const input = 'Text  with  spaces\n```\ncode   preserved\n```\n\n\n\n\nMore   text\u00A0here';
    const result = normalizeWhitespace(input);
    expect(result).toBe('Text with spaces\n```\ncode   preserved\n```\n\n\nMore text here');
  });
});
