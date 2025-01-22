FROM node:18-alpine
WORKDIR /app
# Copy files
COPY package.json ./
COPY src ./src
RUN pnpm install --frozen-lockfile
RUN pnpm build

# Expose port and start app
EXPOSE 3000
CMD ["npx", "encore", "run"]