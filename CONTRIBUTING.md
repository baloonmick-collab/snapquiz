/**
 * Contributing Guidelines
 */

# Contributing to SnapQuiz

First off, thanks for taking the time to contribute! 🎉

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed after following the steps**
- **Explain which behavior you expected to see instead and why**
- **Include screenshots and animated GIFs if possible**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the steps**
- **Describe the current behavior and the expected behavior**

### Pull Requests

- Fill in the required template
- Follow the TypeScript styleguides
- End all files with a newline
- Avoid platform-dependent code
- Include appropriate test cases

## Development Setup

1. Fork the repository
2. Clone your fork locally:
   ```bash
   git clone https://github.com/your-username/snapquiz.git
   cd snapquiz
   ```
3. Add upstream remote:
   ```bash
   git remote add upstream https://github.com/baloonmick-collab/snapquiz.git
   ```
4. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
5. Install dependencies:
   ```bash
   npm install
   ```
6. Start development server:
   ```bash
   npm run dev
   ```

## Code Style Guidelines

### TypeScript

- Use strict type checking
- Export types from `src/types/index.ts`
- Use interfaces for object types
- Avoid `any` type
- Use meaningful variable names

### Components

- Create functional components with hooks
- Use TypeScript for all props
- Add JSDoc comments for complex components
- Keep components small and focused
- Use proper folder structure

### Styling

- Use Tailwind CSS utility classes
- Follow the defined color scheme
- Use custom theme colors from `tailwind.config.js`
- Keep inline styles minimal
- Use CSS modules or Tailwind for complex styles

### Naming Conventions

- **Components**: PascalCase (e.g., `QuestionCard.tsx`)
- **Files**: PascalCase for components, camelCase for utilities
- **Variables/Functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **CSS Classes**: kebab-case (Tailwind)

## Commit Messages

- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

## Branch Naming

- **Features**: `feature/description`
- **Bug fixes**: `fix/description`
- **Documentation**: `docs/description`
- **Refactoring**: `refactor/description`

## Testing

- Write tests for new features
- Ensure all tests pass before submitting PR
- Test across different browsers
- Test responsiveness on mobile devices

## Documentation

- Update README.md if needed
- Add JSDoc comments to functions
- Document complex logic
- Update CHANGELOG.md for significant changes

## Review Process

1. Submit your pull request
2. Respond to any feedback or requests for changes
3. Your PR will be merged once approved

## Additional Notes

- Check the TODO comments in the code for areas that need work
- Follow the existing code style and patterns
- Don't commit `node_modules` or build artifacts
- Use meaningful commit messages

## Questions?

Feel free to open an issue with the `question` label or reach out to the maintainers.

Thanks again for contributing! 🚀
