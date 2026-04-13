export const globalRules = {
  'no-console': 'warn',
  '@typescript-eslint/no-unused-vars': [
    'warn',
    {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      caughtErrorsIgnorePattern: '^_',
    },
  ],
  // Async functions without await are a common pattern in Fastify plugins
  '@typescript-eslint/require-await': 'off',
  // Allow async functions in Node.js event handlers (process.on, etc.)
  '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
}
