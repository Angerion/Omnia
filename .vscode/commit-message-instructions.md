# Commit Message Guidelines 📃

- **Subject** (📝): Use prefixes like `feat`, `fix`, `docs`, etc.
- **Body** (💡): Include relevant details or context if needed.
- **Footer** (🔗): Reference issues or tasks (e.g., `Closes #123`).
- **Emojis** (🎨): Allowed, but use them sparingly.
- **Version Bumps** (🔢): Follow [SemVer](https://semver.org/). For example:
  - **Major**: Breaking changes (e.g., `2.0.0`)
  - **Minor**: Backward-compatible features (e.g., `1.1.0`)
  - **Patch**: Backward-compatible bug fixes (e.g., `1.0.1`)
- **Release Commands** (🚀): Use the following format:
  - `release: bump to v1.2.3`
  - `release(scope): bump to v1.2.3` for specific package
  Examples:
  - `release: bump to v2.0.0` (full workspace)
  - `release(api): bump to v1.1.0` (single package)