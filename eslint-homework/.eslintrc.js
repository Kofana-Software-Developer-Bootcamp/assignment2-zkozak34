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
    'no-unused-vars': 0,
    'no-dupe-else-if': 0,
    'for-direction': 0,
    'no-use-before-define': 0,
    'no-empty': 0,
  },
}
