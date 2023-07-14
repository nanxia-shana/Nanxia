import { Directive, createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);
import "animate.css";
// 导入初始化css
import "../src/assets/css/reset.css";
// 导入router
import router from "./router";
app.use(router);
// 导入pinia
import pinia from "./store";
app.use(pinia);
// 导入i18n国际化
import i18n from "./locale";
app.use(i18n);
// 导入ant-design-vue
import {
  Button,
  message,
  Layout,
  Menu,
  Breadcrumb,
  Switch,
  Image,
  DatePicker,
  ConfigProvider,
  Radio,
  Tooltip,
  Tag,
  Modal,
  Upload,
} from "ant-design-vue";
import "ant-design-vue/dist/antd.less";
app
  .use(Button)
  .use(Layout)
  .use(Menu)
  .use(Breadcrumb)
  .use(Switch)
  .use(Image)
  .use(DatePicker)
  .use(ConfigProvider)
  .use(Radio)
  .use(Tooltip)
  .use(Tag)
  .use(Modal)
  .use(Upload);
app.config.globalProperties.$message = message;
// 导入svg-icon管理和组件
import "virtual:svg-icons-register";
import svgIcon from "./components/svg-icon/index.vue";
app.component("svg-icon", svgIcon);
// 导入echarts配置和echarts组件
import echarts from "./utils/echarts";
import { LegendComponent } from "echarts/components";
app.provide("$echarts", echarts);
echarts.use([LegendComponent]);
// 导入封装的axios
import ZWRequest from "./api";
app.config.globalProperties.$request = ZWRequest;
// 导入自定义指令（v-loading）
import * as directives from "./directives";
Object.keys(directives).forEach((key) => {
  app.directive(key, (directives as { [key: string]: Directive })[key]);
});
app.mount("#app");
