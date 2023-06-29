import { createI18n } from "vue-i18n";
import zh_CN from "./lang/zh_CN";
import en_US from "./lang/en_US";
import jp_JP from "./lang/jp_JP";
//引入的不同语言文件
const messages = {
  zh_CN,
  en_US,
  jp_JP,
};

//这个类型可以自己配置，毕竟每个人做的都不一样
const i18n: any = createI18n({
  legacy: false, // 使用 Composition API 模式，则需要将其设置为false
  globalInjection: true, //全局生效$t
  locale: "zh_CN", // 默认cn翻译
  messages, //ES6解构
});
export default i18n;
