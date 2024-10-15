import { type Directive, type DirectiveBinding, type VNodeChild, createVNode, render } from "vue";

/**
 * Directive Name: v-divider
 * Description: Transform a container element by inserting dividers between its child elements
 */
const wrapperTag = "v-divider-wrapper";
const process = (el: HTMLElement, binding: DirectiveBinding<() => VNodeChild>) => {
  const children = Array.from(el.childNodes).filter(node => node.nodeType === Node.ELEMENT_NODE);
  if (children.length > 0) {
    el.innerHTML = "";
    children.forEach((child, index) => {
      // Skip if the child is already wrapped with the custom wrapper tag
      if (children[index].nodeName.toLocaleLowerCase() === wrapperTag) {
        return;
      }
      el.appendChild(child);
      if (index < children.length - 1) {
        const vNode = createVNode(binding.value);
        const rNode = document.createElement(wrapperTag);
        el.appendChild(rNode);
        render(vNode, rNode);
      }
    });
  }
};

const directive: Directive<HTMLElement, () => VNodeChild> = {
  beforeMount: process,
  updated: process
};

export default directive;
