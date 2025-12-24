<div align="center">

# NbspNeutralizer

**A powerful web application for detecting and removing hidden whitespace characters and formatting artifacts from text**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3.1-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-646cff.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

</div>

---

## 🎯 Overview

A modern web application designed to identify and normalize problematic whitespace characters in text. It detects non-breaking spaces (NBSP), zero-width characters, excessive spacing, and other hidden formatting artifacts that can cause issues in text processing, AI-generated content, and document formatting.

### Problem Statement

```mermaid
graph LR
    A[AI Generated Text] --> B{Hidden Characters?}
    B -->|Yes| C[Detection Issues]
    B -->|Yes| D[Formatting Problems]
    B -->|Yes| E[Copy-Paste Errors]
    C --> F[NONBSP Solution]
    D --> F
    E --> F
    F --> G[Clean Text Output]
```

---

## ✨ Features

### Core Functionality

- **🔍 Real-time Detection** - Instantly identifies problematic whitespace characters
- **🎨 Visual Highlighting** - Color-coded display of issues in the input text
- **🧹 Smart Normalization** - Intelligently cleans text while preserving meaning
- **📊 Character Counter** - Live character count for both input and output
- **📋 One-Click Copy** - Quick clipboard integration for cleaned text
- **🔄 Reset Function** - Easy reset to start fresh

### Detected Issues

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {
  'primaryColor': '#ffffff',
  'primaryTextColor': '#000000',
  'primaryBorderColor': '#ffffff',
  'lineColor': '#ffffff',
  'secondaryColor': '#ffffff',
  'tertiaryColor': '#ffffff'
}}}%%
mindmap
  root((NONBSP<br/>Detects))
    Non-Breaking Spaces
      U+00A0
      U+202F
      U+2007
    Zero-Width Characters
      U+200B
      U+2060
      U+FEFF
    Excessive Spacing
      Multiple Spaces
      4+ Newlines
    Special Whitespace
      Em Space U+2003
      Thin Space U+2009
      Ideographic Space U+3000
```

---

## 🏗️ Architecture

### System Architecture

```mermaid
graph TB
    subgraph "Frontend Layer"
        A[React App] --> B[App Component]
        B --> C[Input Panel]
        B --> D[Output Panel]
        B --> E[Control Panel]
    end
    
    subgraph "Utility Layer"
        F[normalizeWhitespace]
        G[highlightNbsp]
        H[hasRemovableContent]
    end
    
    subgraph "State Management"
        I[useState Hooks]
        J[useEffect Hooks]
    end
    
    C --> F
    C --> G
    C --> H
    F --> D
    G --> C
    I --> B
    J --> B
    
    style A fill:#61dafb
    style F fill:#3178c6
    style G fill:#3178c6
    style H fill:#3178c6
```
---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/rajtilak-2020/NONBSP.git

# Navigate to project directory
cd NONBSP

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Run tests
npm test

# Run tests with UI
npm run test:ui

# Type checking
npm run typecheck

# Lint code
npm run lint
```

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 💻 Usage

### Basic Usage

1. **Paste Text**: Copy and paste your text into the left input panel
2. **View Issues**: Click "Show Issues" to highlight problematic characters
3. **Review Output**: Check the cleaned text in the right output panel
4. **Copy Result**: Click "Copy Cleaned Text" to copy the normalized text

### Processing Pipeline

```mermaid
flowchart LR
    A[Input Text] --> B{Has Issues?}
    B -->|Yes| C[Normalize Line Endings]
    B -->|No| H[Output Text]
    C --> D[Replace Special Whitespace]
    D --> E[Preserve Code Blocks]
    E --> F[Remove Excess Spaces]
    F --> G[Trim Lines]
    G --> H
    
    style A fill:#fbbf24
    style H fill:#34d399
    style B fill:#60a5fa
```

---

**Detected Characters:**
- Non-breaking spaces: `\u00A0`, `\u202F`, `\u2007`
- Zero-width characters: `\u200B`, `\u2060`, `\u180E`, `\uFEFF`
- Various space types: `\u2000-\u200A`, `\u205F`, `\u3000`

#### highlightNbsp Function

Provides visual feedback by segmenting text into:
- **Normal segments**: Regular text content
- **Removed segments**: Problematic characters marked for removal

### File Structure

```
NONBSP/
├── public/
│   ├── favicon.png
│   └── og-image.webp
├── src/
│   ├── utils/
│   │   ├── normalizeWhitespace.ts      # Core normalization logic
│   │   ├── normalizeWhitespace.test.ts # Unit tests
│   │   ├── highlightNbsp.ts            # Highlighting logic
│   │   └── highlightNbsp.test.ts       # Unit tests
│   ├── App.tsx                         # Main application component
│   ├── main.tsx                        # Application entry point
│   ├── index.css                       # Global styles
│   └── vite-env.d.ts                   # Vite type definitions
├── package.json
├── vite.config.ts
├── vitest.config.ts
├── tsconfig.json
└── tailwind.config.js
```

---

## 🧪 Testing

### Test Coverage

```mermaid
pie title Test Coverage by Module
    "normalizeWhitespace" : 45
    "highlightNbsp" : 35
    "Integration Tests" : 20
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Open test UI
npm run test:ui
```

### Test Cases

- ✅ Line ending normalization (CRLF → LF)
- ✅ Special whitespace character replacement
- ✅ Multiple space reduction
- ✅ Excessive newline limiting
- ✅ Code block preservation
- ✅ Edge cases (empty strings, null values)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Workflow

```mermaid
gitGraph
    commit id: "Initial commit"
    branch develop
    checkout develop
    commit id: "Add feature"
    branch feature/new-feature
    checkout feature/new-feature
    commit id: "Implement feature"
    commit id: "Add tests"
    checkout develop
    merge feature/new-feature
    checkout main
    merge develop tag: "v1.0.0"
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**K Rajtilak**

- GitHub: [@rajtilak-2020](https://github.com/rajtilak-2020)
- Project Link: [https://github.com/rajtilak-2020/NONBSP](https://github.com/rajtilak-2020/NONBSP)

---

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite for blazing fast build tooling
- Tailwind CSS for utility-first styling
- Lucide for beautiful icons
- The open-source community

---

<div align="center">

**Made with ❤️ by K Rajtilak**

⭐ Star this repository if you find it helpful!

</div>
