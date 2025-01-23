import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
    test: {
        coverage: {
            provider: "v8",
            reporter: ["text-summary", "html"],
        }
    },
    resolve: {
        alias: {
            "~encore": path.resolve(__dirname, "./packages/server/encore.gen"),
        },

    },
});