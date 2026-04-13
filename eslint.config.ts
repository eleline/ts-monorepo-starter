import { defineConfig } from 'eslint/config'
import { base } from '@repo/eslint-config'

export default defineConfig([
  { ignores: ['**/dist/**', '**/generated/**', 'apps/frontend/**', 'apps/batch/**', 'eslint.config.ts'] },
  ...base(),
])
