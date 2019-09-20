module.exports =  {
  extends: [
    "plugin:vue/essential",
    "eslint-config-standard"
  ],
  parserOptions: {
    parser: require.resolve('@typescript-eslint/parser')
  },
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  plugins: [
    "@typescript-eslint"
  ],
  rules: {
    'no-undef': 'off',
    'no-unused-vars': 'off',
  }
};



