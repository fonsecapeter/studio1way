module.exports = {
  env: {
    node: true,
    browser: true,
  },
  extends: ["airbnb-typescript", "prettier"],
  ignorePatterns: ["src/__generated__/*"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    "project": ["/app/frontend/tsconfig.json"]
  },
  plugins: [
    "@typescript-eslint",
    "promise",
    "import",
    "prettier"
  ],
  rules: {
    "comma-dangle": "off",
    "global-require": "off",
    "import/prefer-default-export": "off",
    "prettier/prettier": "error",
    "react/destructuring-assignmen": "off",
    "react/jsx-filename-extension": "off",
    "react/require-default-props": "off",
    "react/prop-types": "off",
    "quotes": [2, "double", { "avoidEscape": true }],
  }
};
