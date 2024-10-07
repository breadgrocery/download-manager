import { Directive } from "vue";

/**
 * Directive Name: v-assert-children
 * Description: Hide a container element if it has no child elements
 */
const process = (el: HTMLElement) => {
  const hasChildNodes = Array.from(el.childNodes).some(node => node.nodeType === Node.ELEMENT_NODE);
  el.style.display = hasChildNodes ? "visible" : "none";
};

const directive: Directive = {
  beforeMount: (el: HTMLElement) => process(el),
  updated: (el: HTMLElement) => process(el)
};

export default directive;
