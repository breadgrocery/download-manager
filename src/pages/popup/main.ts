import { registerCustomDirective } from "@/directives/index";
import { createApp } from "vue";
import Popup from "./App.vue";

const app = createApp(Popup);

// Register custom directives
registerCustomDirective(app);

app.mount("#app");
