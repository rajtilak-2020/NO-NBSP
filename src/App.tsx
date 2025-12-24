import { useState, useEffect } from 'react';
import { Copy, RotateCcw, X, Github, Eye, EyeOff } from 'lucide-react';
import { normalizeWhitespace } from './utils/normalizeWhitespace';
import { highlightRemovedContent, hasRemovableContent } from './utils/highlightNbsp';

function App() {
  const [inputText, setInputText] = useState('');
  const [cleanedText, setCleanedText] = useState('');
  const [showBanner, setShowBanner] = useState(true);
  const [copied, setCopied] = useState(false);
  const [hasIssues, setHasIssues] = useState(false);
  const [showHighlights, setShowHighlights] = useState(false);

  useEffect(() => {
    const cleaned = normalizeWhitespace(inputText);
    setCleanedText(cleaned);
    setHasIssues(hasRemovableContent(inputText));
  }, [inputText]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cleanedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleReset = () => {
    setInputText('');
    setCleanedText('');
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col">
      {showBanner && (
        <div className="banner-enter bg-zinc-900 border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
          <p className="text-sm text-zinc-400">
            This tool only fixes spacing and hidden characters. It does not make AI text undetectable and should be used in line with your school or workplace policies.
          </p>
          <button
            onClick={() => setShowBanner(false)}
            className="text-zinc-400 hover:text-accent transition-smooth ml-4 flex-shrink-0"
            aria-label="Dismiss banner"
          >
            <X size={18} />
          </button>
        </div>
      )}

      <div className="flex-1 flex flex-col lg:flex-row">
        <div className="flex-1 flex flex-col border-b lg:border-b-0 lg:border-r border-zinc-800">
          <div className="section-header px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Input Text</h2>
            <div className="flex items-center gap-4">
              {hasIssues && (
                <>
                  <button
                    onClick={() => setShowHighlights(!showHighlights)}
                    className="flex items-center gap-2 text-xs text-red-400 bg-red-900/20 px-2 py-1 rounded hover:bg-red-900/30 transition-smooth"
                  >
                    {showHighlights ? <EyeOff size={14} /> : <Eye size={14} />}
                    {showHighlights ? 'Hide' : 'Show'} Issues
                  </button>
                </>
              )}
              <span className="text-sm text-zinc-500">
                {inputText.length.toLocaleString()} characters
              </span>
            </div>
          </div>
          <div className="flex-1 relative overflow-hidden">
            {showHighlights && inputText ? (
              <div className="absolute inset-0 px-6 py-4 font-mono text-sm leading-relaxed overflow-auto whitespace-pre-wrap break-words bg-black">
                {highlightRemovedContent(inputText).map((segment, index) => (
                  <span
                    key={index}
                    className={segment.isRemoved ? 'nbsp-highlight text-white px-1 rounded inline-block' : 'text-white'}
                    title={segment.isRemoved ? 'Extra spacing (will be removed)' : undefined}
                  >
                    {segment.text}
                  </span>
                ))}
              </div>
            ) : (
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste your AI-generated text here..."
                className="absolute inset-0 bg-black text-white px-6 py-4 resize-none focus:outline-none font-mono text-sm leading-relaxed placeholder:text-zinc-700"
              />
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="section-header px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cleaned Text</h2>
            <span className="text-sm text-zinc-500">
              {cleanedText.length.toLocaleString()} characters
            </span>
          </div>
          <textarea
            value={cleanedText}
            readOnly
            placeholder="Cleaned text will appear here..."
            className="flex-1 bg-black text-white px-6 py-4 resize-none focus:outline-none font-mono text-sm leading-relaxed placeholder:text-zinc-700"
          />
        </div>
      </div>

      <div className="border-t border-zinc-800 px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-zinc-950">
        <div className="button-group flex gap-3">
          <button
            onClick={handleCopy}
            disabled={!cleanedText}
            className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-hover text-black font-medium rounded-lg transition-smooth disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-accent"
          >
            <Copy size={18} />
            {copied ? 'Copied!' : 'Copy Cleaned Text'}
          </button>
          <button
            onClick={handleReset}
            disabled={!inputText}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-lg transition-smooth disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-zinc-800"
          >
            <RotateCcw size={18} />
            Reset
          </button>
        </div>

        <div className="flex items-center gap-4 text-xs text-zinc-500">
          <p className="hidden sm:block">
            Formatting artifacts removed • Original meaning preserved
          </p>
          <div className="footer-name cursor-pointer transition-smooth flex items-center gap-2">
            <span>by K Rajtilak</span>
            <a
              href="https://github.com/rajtilak-2020"
              target="_blank"
              rel="noopener noreferrer"
              className="github-link hover:text-accent"
              aria-label="GitHub profile"
            >
              <Github size={16} />
              <span>rajtilak-2020</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
