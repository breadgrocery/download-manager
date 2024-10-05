import vAssertChildren from "@/directives/v-assert-children";
import vDivider from "@/directives/v-divider";
import { App } from "vue";

declare module "vue" {
  export interface ComponentCustomProperties {
    vAssertChildren: typeof vAssertChildren;
    vDivider: typeof vDivider;
  }
}

export const registerCustomDirective = (app: App<Element>) => {
  app.directive("assert-children", vAssertChildren);
  app.directive("divider", vDivider);
};
