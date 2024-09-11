/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@repo/eslint-config/next.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [["@", "./"]],
        extensions: [".ts", ".js", ".jsx", ".json"],
      },
    },
  },
};
