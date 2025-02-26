module.exports = {
  env: {
    node: true,
    browser: true,
  },
  extends: "airbnb-typescript",
  parser: "@typescript-eslint/parser",
  parserOptions: {
    "project": ["/app/frontend/tsconfig.json"]
  },
  plugins: [
    "@typescript-eslint",
    "promise",
    "import",
  ],
  rules: {
    "comma-dangle": "off",
    "global-require": "off",
    "import/prefer-default-export": "off",
    "react/destructuring-assignmen": "off",
    "react/jsx-filename-extension": "off",
    "react/require-default-props": "off",
    "react/prop-types": "off",
  }
};
