# Project Structure

This document outlines the structure of the monorepo for the Encore.ts Base Server project.

## Root Directory

```
my-monorepo/
├── 📁 .vscode/                  # VSCode workspace settings and debugging configurations
│   ├── 📝 launch.json           # Debugging configurations for all services
│   ├── 🛠️ settings.json         # Workspace-wide settings (e.g., ESLint, TypeScript paths)
│   └── 📝 tasks.json            # Tasks for building and running services
├── 📄 pnpm-workspace.yaml       # pnpm configuration for managing the monorepo
├── 📄 tsconfig.base.json        # Base TypeScript configuration shared by all projects
├── 📄 .eslintrc.js              # Base ESLint configuration shared by all projects
├── 📄 vitest.config.ts          # Base Vitest configuration for the monorepo
├── 🐳 Dockerfile                # Root-level Dockerfile if needed for orchestration
├── 📝 README.md                 # Project overview and documentation
├── 📁 packages/                 # All services and sub-projects
│   ├── 📁 server/               # Backend service
│   │   ├── 📁 src/              # Source code
│   │   │   └── 📝 index.ts      # Entry point for the server
│   │   ├── 📁 prisma/           # Prisma or Drizzle ORM schema and migrations
│   │   ├── 📄 tsconfig.json     # TypeScript configuration for the server
│   │   ├── 🐳 Dockerfile        # Dockerfile for the server service
│   │   └── 📄 package.json      # Dependencies and scripts for the server
│   ├── 📁 client/               # Frontend client (e.g., Vue.js prototype)
│   │   ├── 📁 src/              # Source code
│   │   │   └── 📝 main.ts       # Entry point for the client
│   │   ├── 📄 tsconfig.json     # TypeScript configuration for the client
│   │   ├── 🐳 Dockerfile        # Dockerfile for the client
│   │   └── 📄 package.json      # Dependencies and scripts for the client
│   └── 📁 other-service/        # Additional service (placeholder for future)
│       ├── 📁 src/              # Source code
│       │   └── 📝 index.ts      # Entry point for the service
│       ├── 📄 tsconfig.json     # TypeScript configuration for the service
│       ├── 🐳 Dockerfile        # Dockerfile for the service
│       └── 📄 package.json      # Dependencies and scripts for the service
├── 📁 node_modules/             # Installed dependencies (managed by pnpm)
└── 📄 .gitignore                # Files and directories to ignore in Git
```

### Notes
- **Shared Configurations**: Development dependencies like `typescript`, `eslint`, and `vitest` are installed at the root level and shared across all sub-projects.
- **Dockerfiles**: Each service has its own Dockerfile for deployment compatibility.
- **Database Configuration**: Prisma or Drizzle ORM schemas are managed within the `server` package.
- **Modular Design**: Sub-projects are organized to support scalability and isolated configurations.

