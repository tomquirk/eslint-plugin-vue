'use strict'

module.exports = {
  // https://github.com/eslint/eslint/issues/11888
  root: false,
  parserOptions: {
    ecmaVersion: 6
  },
  env: {
    node: true,
    mocha: true
  },
  extends: [
    'plugin:eslint-plugin/recommended',
    'plugin:vue-libs/recommended'
  ],
  plugins: [
    'eslint-plugin'
  ],
  rules: {
    'eslint-plugin/report-message-format': ['error', '^[A-Z`\'{].*\\.$'],
    'eslint-plugin/prefer-placeholders': 'error',
    'eslint-plugin/consistent-output': 'error',
    'no-mixed-operators': 'error'
  },

  overrides: [{
    files: ['lib/rules/*.js'],
    rules: {
      'consistent-docs-description': 'error',
      'no-invalid-meta': 'error',
      'no-invalid-meta-docs-categories': 'error',
      'eslint-plugin/require-meta-type': 'error',
      'require-meta-docs-url': ['error', {
        'pattern': `https://eslint.vuejs.org/rules/{{name}}.html`
      }]
    }
  }]
}
