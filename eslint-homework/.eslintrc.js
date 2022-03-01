module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': 2,
    'no-dupe-else-if': 2,
    'for-direction': 2,
    'no-use-before-define': 2,
    'no-empty': 0,
  },
}
