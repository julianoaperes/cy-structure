import cypressPlugin from "eslint-plugin-cypress";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
    },
    plugins: {
      cypress: cypressPlugin,
    },
    rules: {
      ...cypressPlugin.configs.recommended.rules,
    },
  },
];
