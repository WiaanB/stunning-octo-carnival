import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}, extends: ["eslint:recommended", "plugin:react/recommended", "plugin:prettier/recommended"]},
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
