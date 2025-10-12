# Development Workflow Guide

This project is equipped with a professional-grade, automated code quality workflow using ESLint, Prettier, and Husky. This guide explains how it works and the commands you should be aware of.

## The Automated Workflow (Pre-commit Hook)

The most important part of this setup is that it's **automatic**. You don't need to change how you work.

1.  **Write Your Code:** Make changes to the project as you normally would.
2.  **Stage Your Files:** Use `git add <files...>` or the VS Code Source Control panel to stage the files you want to commit.
3.  **Commit Your Changes:** Use `git commit -m "..."` or the VS Code UI to commit.

When you try to commit, the following happens automatically in the background:
- **Husky**, our Git hook manager, triggers a `pre-commit` script.
- **lint-staged** runs Prettier (the code formatter) and ESLint (the code linter) on all the files you've staged for the commit.
- If the tools find any issues they can fix automatically (like formatting or simple code errors), they will fix them and include the fixes in your commit.
- If they find a serious error that can't be fixed automatically, **the commit will be aborted**, and you will see the error message in your terminal. This is a safety feature to prevent errors from entering the codebase. You can then fix the error and try to commit again.

**The result is that all code in the project history is guaranteed to be formatted and linted.**

## Manual Commands

While the process is automatic, you might occasionally want to run the tools manually on the entire project.

### Formatting (Prettier)

To format the entire project at once:

```bash
pnpm prettier --write .
```

### Linting (ESLint)

To run the linter across the entire project and fix any auto-fixable issues:

```bash
pnpm eslint --fix .
```

### Building

To build the application for production:

```bash
pnpm run build
```

Note: The build process will also run the linter and will fail if there are any ESLint errors. This is another layer of protection to ensure code quality.

---

This setup ensures a high-quality, consistent codebase. While it added some initial complexity, it will save time and prevent errors in the long run.
