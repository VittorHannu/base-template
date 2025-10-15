# Base Template: Next.js, Supabase, and Documentation

This is a comprehensive template for building modern web applications. It provides a pre-configured, multi-package repository structure that includes a Next.js frontend, a Supabase backend, and a ready-to-use documentation site.

This template is designed to give you a head start by providing a solid foundation with a focus on developer experience and scalability.

## What's Inside?

This template is structured as a multi-package repository and includes:

*   `frontend/`: A [Next.js](https://nextjs.org/) 14 application with App Router, TypeScript, and Tailwind CSS.
*   `supabase/`: A [Supabase](https://supabase.io/) project with the CLI, ready for local development, database migrations, and edge functions.
*   `.documentation/`: A documentation site built with [Fumadocs](https://fumadocs.vercel.app/), allowing you to document your project from day one.
*   `backend/`: An empty directory, reserved for a potential future backend service (e.g., a Node.js API) to maintain a clean project structure.
*   **VS Code Integration**: The `.vscode/` directory and `base-template.code-workspace` file provide pre-configured settings and a multi-root workspace for a seamless development experience.

## Getting Started

Follow these instructions to get the template up and running on your local machine.

### Prerequisites

Make sure you have the following tools installed:

*   [Node.js](https://nodejs.org/en) (v18 or later)
*   [pnpm](https://pnpm.io/installation)
*   [Docker](https://www.docker.com/products/docker-desktop/) (must be running for Supabase local development)
*   [Supabase CLI](https://supabase.com/docs/guides/cli/getting-started)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/base-template.git your-project-name
    cd your-project-name
    ```

2.  **Install dependencies for each project:**
    This template does not use a single monorepo tool, so you need to install dependencies for the `frontend` and `documentation` projects separately.

    ```bash
    # Install frontend dependencies
    cd frontend
    pnpm install
    cd ..

    # Install documentation dependencies
    cd .documentation
    pnpm install
    cd ..
    ```

### Running the Development Environment

You will need to run each part of the application in a separate terminal.

1.  **Start Supabase:**
    This command starts the Supabase services (Postgres, GoTrue, etc.) in Docker containers.
    ```bash
    supabase start
    ```
    Once it's running, it will output your local Supabase URL and API keys. You will need these for your frontend application.

2.  **Run the Frontend:**
    ```bash
    cd frontend
    # You may need to create a .env.local file and add your Supabase keys here
    pnpm dev
    ```
    The frontend will be available at `http://localhost:3000`.

3.  **Run the Documentation Site:**
    ```bash
    cd .documentation
    pnpm dev
    ```
    The documentation site will be available at `http://localhost:3001`.

## Using This Template

To start building your own application based on this template:

1.  **Rename the project:** Go through the `package.json` files in `frontend` and `.documentation` and update the `name` field.
2.  **Configure Environment Variables:** Create a `.env.local` file in the `frontend` directory by copying `.env.example` (if it exists) and add your local Supabase API keys.
3.  **Start Building:**
    *   Modify the Next.js components in `frontend/src/`.
    *   Create new database tables using Supabase migrations in `supabase/migrations/`.
    *   Write your documentation in the `.documentation/content/` folder.

---

This template provides the structure. Now it's your turn to bring your ideas to life!