# Development Workflow

This project uses Prettier, ESLint, and Husky to automate code formatting and quality checks.

## Automated Pre-commit Hook

1.  Code as usual.
2.  Stage and commit your files.
3.  A pre-commit hook automatically formats and lints your staged files.
4.  If there are errors, the commit is stopped. Fix them and commit again.

## Manual Commands

-   **Format all files:**
    ```bash
    pnpm prettier --write .
    ```
-   **Lint all files:**
    ```bash
    pnpm eslint --fix .
    ```
-   **Build the project:**
    ```bash
    pnpm run build
    ```