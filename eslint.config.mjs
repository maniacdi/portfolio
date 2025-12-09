// eslint.config.mjs
import js from "@eslint/js";
import nextConfig from "eslint-config-next";
import prettier from "eslint-config-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";

const config = [
  // Ignore folders
  {
    ignores: ["node_modules", ".next", "dist", "*.config.js"],
  },

  // JS base rules
  js.configs.recommended,

  // Next config
  ...nextConfig.configs.recommended,

  // TypeScript rules
  ...tseslint.configs.recommended,

  // React rules
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],

  {
    plugins: {
      "simple-import-sort": simpleImportSort,
      react: react,
    },

    rules: {
      // React specific
      "react/react-in-jsx-scope": "off", // No necesario en Next.js
      "react/prop-types": "off", // Usamos TypeScript

      // Import sorting
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // React + Next first
            ["^react", "^next", "^@react-three"],

            // External packages
            ["^@?\\w"],

            // Internal aliases
            ["^@/", "^@components/", "^@styles/"],

            // Parent imports
            ["^\\.\\./"],

            // Same folder imports
            ["^\\."],

            // Style imports
            ["^.+\\.s?css$"],

            // Side effect imports
            ["^\\u0000"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",

      // Turn off conflicting rules
      "import/order": "off",
      "sort-imports": "off",

      // Unused vars
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      // TypeScript
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-require-imports": "off",

      // Allow console in development
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",

      // Prettier compatibility
      ...prettier.rules,
    },

    // Settings for React
    settings: {
      react: {
        version: "detect",
      },
    },

    // Language options
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
];

export default config;
