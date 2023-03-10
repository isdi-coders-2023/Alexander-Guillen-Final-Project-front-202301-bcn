module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["plugin:react/recommended", "xo", "prettier"],
  overrides: [
    {
      extends: ["xo-typescript", "prettier"],
      files: ["*.ts", "*.tsx"],
      rules: {
        "@typescript-eslint/consistent-type-definitions": [
          "error",
          "interface",
        ],
        "@typescript-eslint/naming-convention": "off",
      },
    },
    {
      files: ["*.test.tsx"],
      rules: {
        "@typescript-eslint/no-unsafe-assignment": "off",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {},
};
