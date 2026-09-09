import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import prettier from "eslint-config-prettier";
import react from "eslint-plugin-react";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import process from "node:process";
import tseslint from "typescript-eslint";

const config = [
  // Ignore folders
  {
    ignores: ["node_modules", ".next", "dist", "*.config.js"],
  },

  // JS base rules
  js.configs.recommended,

  // TypeScript rules
  ...tseslint.configs.recommended,

  // React rules
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],

  // Next.js config (adaptado para flat config)
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },

  {
    plugins: {
      "simple-import-sort": simpleImportSort,
      react: react,
    },

    rules: {
      // React specific
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

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

  // Scripts de utilidad en docs/: corren en Node, no en el navegador
  {
    files: ["docs/**/*.mjs"],
    languageOptions: {
      globals: {
        console: "readonly",
        fetch: "readonly",
        process: "readonly",
        URL: "readonly",
      },
    },
  },

  prettier,
];

export default config;
