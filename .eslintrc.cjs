module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-refresh', 'simple-import-sort', 'unused-imports'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'no-shadow': 'off',
    'no-redeclare': 'off',
    'arrow-parens': 'error',
    'init-declarations': 'off',
    'no-multi-spaces': 'error',
    quotes: ['warn', 'single'],
    'lines-around-comment': 'off',
    'no-trailing-spaces': 'error',
    'eol-last': ['error', 'always'],
    'no-shadow-restricted-names': 'error',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

    // react
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react/jsx-tag-spacing': 'error',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],

    // typescript
    '@typescript-eslint/semi': 'error',
    '@typescript-eslint/ban-types': 'error',
    '@typescript-eslint/no-redeclare': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-use-before-define': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    // Unused Import
    'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],

    // Import Sort
    'simple-import-sort/exports': 'warn',
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          // Side effect + ext library imports
          ['^\\w', '^\\u0000', '^@'],
          // internal + relative imports
          ['src/*', './*'],
          // css, scss + img files
          ['.*.module.s?css$', '^.+\\.s?css$', '.*\\.svg', '.*\\.png', '.*\\.jpg', '.*\\.mp4'],
          // other
          ['^'],
        ],
      },
    ],
  },
};
