module.exports =  {
  extends: [
    "plugin:vue/essential",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
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
    "function-paren-newline": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/explicit-function-return-type": "off"
  }
};



