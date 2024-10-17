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
      "vue/max-attributes-per-line": "off",
      "vue/multi-word-component-names": "off",
      "vue/no-v-html": "off",
      "vue/no-v-text-v-html-on-component": "off"
    }
  }
];
