import vueTsEslintConfig from "@vue/eslint-config-typescript";
import pluginVue from "eslint-plugin-vue";

/**
 * @type {import("eslint").Linter.Config}
 */
export default [
  ...pluginVue.configs["flat/recommended"],
  ...vueTsEslintConfig(),
  { ignores: ["dist/", "**/.wxt/"] },
  {
    rules: {
      "eqeqeq": "warn",
      "spaced-comment": ["warn", "always", { "markers": ["/"] }],
      "capitalized-comments": ["warn", "always"],
      "vue/max-attributes-per-line": "off",
      "vue/multi-word-component-names": "off"
    }
  }
];
