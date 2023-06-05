import { Directive, createApp } from "vue";
// import './style.css'
import "../src/assets/reset.css";
import App from "./App.vue";
import router from "./router";
import pinia from "./stores";

import echarts from "./utils/echarts";
import { LegendComponent } from "echarts/components";
echarts.use([LegendComponent]);
const app = createApp(App);
import * as directives from "./directives";
Object.keys(directives).forEach((key) => {
  app.directive(key, (directives as { [key: string]: Directive })[key]);
});

app.provide("$echarts", echarts);
app.use(router).use(pinia);
app.mount("#app");
