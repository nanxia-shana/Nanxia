import { createApp, Directive } from "vue";
import Loading from "./loading.vue";

export const loading: Directive = {
  mounted(el, binding) {
    const app = createApp(Loading);
    const instance = app.mount(document.createElement("div"));
    el.instance = instance;
    if (binding.value) {
      appendEl(el);
    }
  },
  updated(el, binding) {
    if (binding.value !== binding.oldValue) {
      binding.value ? appendEl(el) : removeEl(el);
    }
  },
};

const appendEl = (el: { appendChild: (arg0: any) => void; instance: { $el: any } }) => {
  el.appendChild(el.instance.$el);
};

const removeEl = (el: { removeChild: (arg0: any) => void; instance: { $el: any } }) => {
  el.removeChild(el.instance.$el);
};
