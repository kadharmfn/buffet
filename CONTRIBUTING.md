# Contributing to Buffet

Thank you for your interest in contributing to Buffet! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please be respectful and constructive in all interactions.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/yourusername/buffet/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (OS, Node version, etc.)
   - Screenshots if applicable

### Suggesting Features

1. Check existing feature requests
2. Create a new issue with the `enhancement` label
3. Describe the feature and its use case
4. Explain why it would be valuable

### Pull Requests

1. Fork the repository
2. Create a feature branch from `main`
3. Make your changes
4. Write/update tests
5. Update documentation
6. Ensure all tests pass
7. Submit a pull request

### Development Setup

\`\`\`bash
# Clone your fork
git clone https://github.com/yourusername/buffet.git
cd buffet

# Install dependencies
npm install

# Start development
npm run dev

# Run tests
npm test
\`\`\`

### Coding Standards

- Use TypeScript for all new code
- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

### Commit Message Format

\`\`\`
type(scope): subject

body

footer
\`\`\`

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Example:
\`\`\`
feat(core): add support for dynamic remote loading

Implemented dynamic import mechanism for loading remote apps
at runtime with fallback support.

Closes #123
\`\`\`

## Questions?

Feel free to ask questions in:
- GitHub Discussions
- Discord community
- Twitter

Thank you for contributing! 🎉
