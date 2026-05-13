import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'
import type { Linter } from 'eslint'
import { globalRules } from '../rules/global'

interface BaseOptions {
  tsconfigRootDir: string
}

export function base(options: BaseOptions): Linter.Config[] {
  return [
    ...tseslint.configs.recommendedTypeChecked,
    stylistic.configs.customize({
      indent: 2,
      quotes: 'single',
      semi: false,
      commaDangle: 'always-multiline',
      jsx: false,
    }),
    {
      languageOptions: {
        parserOptions: {
          tsconfigRootDir: options.tsconfigRootDir,
          projectService: {
            allowDefaultProject: ['*.config.ts', '*.config.mts'],
          },
        },
      },
    },
    {
      rules: globalRules,
    },
  ] as Linter.Config[]
}
