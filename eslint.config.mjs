// eslint.config.mjs
import js from "@eslint/js";
import nextConfig from "eslint-config-next";
import prettier from "eslint-config-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";

const config = [
  // Ignore folders
  {
    ignores: ["node_modules", ".next", "dist"],
  },

  // JS base rules
  {
    ...js.configs.recommended,
  },

  // Next config
  ...nextConfig,

  // TypeScript rules
  ...tseslint.configs.recommended,

  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },

    rules: {
      // Import sorting
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // React + Next first
            ["^react", "^next"],

            // External packages
            ["^@?\\w"],

            // Alias paths (src/*)
            ["^@"],

            // Absolute imports
            ["^[^.]"],

            // Relative imports
            ["^\\./", "^\\.\\./", "^\\.\\./\\.\\./"],

            // Styles
            ["^.+\\.s?css$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",

      "import/order": "off",
      "sort-imports": "off",

      // Unused vars
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["warn"],

      // Prettier override last
      ...prettier.rules,
    },
  },
];

export default config;
