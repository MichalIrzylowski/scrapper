module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'prettier',
  ],
  rules: {
    'import/prefer-default-export': 0,
    'implicit-arrow-linebreak': 0,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'no-plusplus': 0,
    'no-await-in-loop': 1,
  },
};
