import type { Linter } from 'eslint'

/**
 * Vue 3 ESLint configuration — stub for future use.
 *
 * To enable Vue linting in apps/frontend:
 * 1. Install: pnpm --filter frontend add -D eslint-plugin-vue
 * 2. Replace the body of this function:
 *
 *   import pluginVue from 'eslint-plugin-vue'
 *   return [...pluginVue.configs['flat/recommended']] as Linter.Config[]
 */
export function vue(): Linter.Config[] {
  return []
}
