# 🌌 Omnia

Omnia is a modular and type-safe server framework built with [Encore.ts](https://encore.dev), designed to support scalable, reliable, and extensible applications. With a monorepo structure and shared configurations, Omnia ensures seamless integration between multiple services.



## ✨ Features

- **🛠 Modular Architecture**: Build and extend services effortlessly with a structured monorepo.
- **🔒 Type-Safe APIs**: Powered by Encore.ts and TypeScript for maximum reliability.
- **✅ Integrated Testing**: Leverage `vitest` for comprehensive test coverage.
- **🗄 Database Management**: Use Prisma or Drizzle ORM with type-safe schema generation.
- **💻 Optimized for Developers**: Shared configurations, debugging support, and seamless integration in VSCode.
- **🚀 Deployment-Ready**: Dockerized services for easy deployment on platforms like Railway.



## 🗂 Project Structure

```
omnia/
├── 📁 .vscode/                  # VSCode workspace settings and debugging configurations
├── 📄 pnpm-workspace.yaml       # pnpm configuration for managing the monorepo
├── 📄 tsconfig.base.json        # Base TypeScript configuration shared by all projects
├── 📄 .eslintrc.js              # Base ESLint configuration shared by all projects
├── 📄 vitest.config.ts          # Base Vitest configuration for the monorepo
├── 📝 README.md                 # Project documentation
├── 📁 packages/                 # All services and sub-projects
│   ├── 📁 server/               # Backend service
│   ├── 📁 client/               # Frontend client
│   └── 📁 other-service/        # Additional service
└── 📄 .gitignore                # Files and directories to ignore in Git
```



## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **pnpm** (v8 or higher)
- **Docker** (for deployments)
- **VSCode** with WSL2 (optional, recommended)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/angerion/omnia.git
   cd omnia
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```



## 🛠 Development

### 🧪 Running Tests

Run all tests using Vitest:
```bash
pnpm test
```

### 🐞 Debugging

Omnia includes preconfigured VSCode debugging settings. To debug a service:
1. Open VSCode and select the appropriate configuration in the Debug panel.
2. Press **F5** to start debugging.



## 📦 Deployment

Each service is Dockerized and can be deployed individually. For example, to build and run the `server` service:
```bash
cd packages/server
docker build -t omnia-server .
docker run -p 3000:3000 omnia-server
```



## 🤝 Contributing

Contributions are welcome! Please follow the [contributing guidelines](CONTRIBUTING.md) to submit issues or pull requests.



## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.



## 🙌 Acknowledgments

Omnia is powered by:
- [Encore.ts](https://encore.dev)
- [TypeScript](https://www.typescriptlang.org/)
- [pnpm](https://pnpm.io/)
- [Vitest](https://vitest.dev/)
```

