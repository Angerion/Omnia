# Copilot Instructions for API Development

## Purpose

Guide Copilot to generate concise, type-safe, and modular API code for the Omnia project.

## Instructions

1. **Type Safety**
   - Use strict TypeScript.
   - Prefer `zod` for validation.

2. **Conciseness**
   - Minimize boilerplate.

3. **TypeScript Decorators**
   - Suggest decorators for routes and controllers.
   - Example:
     ```typescript
     @Controller('/users')
     class UserController {
       @Get()
       getAllUsers() {
         return this.userService.getUsers();
       }
     }
     ```

4. **Encore.ts Patterns**
   - Align suggestions with Encore.ts conventions.
   - Example:
     ```typescript
     export const getUser = api.get('/user', z.object({ id: z.string() }))
       .handler(async ({ id }) => {
         const user = await User.findById(id);
         return { user };
       });
     ```

5. **Modular Code**
   - Keep code reusable, testable, and scalable.

6. **Versioning**
   - Follow SemVer as described in [Commit Message Guidelines](commit-message-instructions.md).
   - Ensure commits reflect version increments accurately.

7. **Release Automation**
   - Detect version bump commits using pattern `release: bump to vX.Y.Z`
   - Suggest appropriate package.json changes
   - Example response:
     ```typescript
     // Detected version bump to v1.1.0
     // Suggested changes:
     // 1. Update version in package.json
     // 2. Update CHANGELOG.md
     // 3. Create git tag v1.1.0
     ```

## Updates

These instructions should evolve alongside the project. Copilot will request updates periodically.

[See Commit Message Guidelines](commit-message-instructions.md)

