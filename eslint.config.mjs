import path from 'node:path';
import { fileURLToPath } from 'node:url';

import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import securityPlugin from 'eslint-plugin-security';
import promisePlugin from 'eslint-plugin-promise';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  {
    // Global ignores
    ignores: [
      '**/node_modules/**',
      'dist/**',
      'build/**',
      '.github/**',
      '.vscode/**',
      'coverage/**',
      'eslint.config.mjs'  // Explicitly ignore the ESLint config file
    ]
  },
  
  // Base configuration for JavaScript files
  js.configs.recommended,
  
  // TypeScript-specific configs
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  
  // Configuration for JavaScript and TypeScript files
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      import: importPlugin,
      security: securityPlugin,
      promise: promisePlugin,
      prettier: prettierPlugin
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: path.join(__dirname, 'tsconfig.json'),
        tsconfigRootDir: __dirname,
        sourceType: 'module'
      }
    },
    rules: {
      // TypeScript-specific rules
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/no-unnecessary-condition': 'error',
      
      // Import rules
      'import/order': ['error', {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index'
        ],
        'newlines-between': 'always',
        alphabetize: { 
          order: 'asc', 
          caseInsensitive: true 
        }
      }],
      'import/no-duplicates': 'error',
      
      // Security rules
      'security/detect-object-injection': 'warn',
      'security/detect-non-literal-fs-filename': 'error',
      
      // Promise rules
      'promise/always-return': 'error',
      'promise/no-return-wrap': 'error',
      'promise/catch-or-return': 'error',

      // Prettier rules
      'prettier/prettier': 'error'
    }
  },
  
  // Specific configuration for ESLint config file
  {
    files: ['eslint.config.mjs'],
    languageOptions: {
      parserOptions: {
        sourceType: 'module'
      }
    },
    rules: {
      // Disable type-checking rules for the ESLint config
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'off'
    }
  },
  
  // Prettier configuration (must be last)
  prettierConfig
];