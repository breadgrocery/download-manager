/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier/skip-formatting"
  ],
  rules: {
    "capitalized-comments": ["error", "always"],
    "eqeqeq": "warn",
    "spaced-comment": ["error", "always", { "markers": ["/"] }],
    "vue/multi-word-component-names": "off",
    "vue/no-v-html": "off",
    "vue/no-v-text-v-html-on-component": "off"
  }
};
