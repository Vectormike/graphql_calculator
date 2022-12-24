module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  overrides: [
    {
      files: ["*.ts"],
      extends: [
        "airbnb-base",
        "airbnb-typescript/base",
        "prettier",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
      ],
      parserOptions: {
        parser: "@typescript-eslint/parser",
        project: "tsconfig.json",
        sourceType: "module",
      },
      rules: {
        "class-methods-use-this": "off",
        "import/prefer-default-export": "off",
        "max-classes-per-file": "off",
      },
    },
  ],
};
