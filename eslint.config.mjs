import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Global ignores should be in their own config object
  {
    ignores: [
      "lib/generated/prisma/", // Ignore the entire directory
      // You can add other global ignores here if needed, e.g., ".next/", "dist/"
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // You can add your custom rules here.
  // These rules will apply to files that are *not* ignored.
  {
    rules: {
      // Keep your custom rules here, e.g.:
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      // If you specifically want to disallow require() for your own code, keep this:
      "@typescript-eslint/no-require-imports": "error",
    },
  },
];

export default eslintConfig;
