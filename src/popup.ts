import { registerCustomDirective } from "@/directives/index";
import Popup from "@/pages/popup/index.vue";
import { createApp } from "vue";

const app = createApp(Popup);

// Register custom directives
registerCustomDirective(app);

app.mount("#app");
