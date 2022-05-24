module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'linebreak-style': ['error', 'windows'],
    'no-console': 'off',
    'comma-dangle': 'off',
    'react/prop-types': 'off',
    'prefer-destructuring': 'off',
    'object-curly-newline': 'off',
  },
};
