import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path, { join } from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { themePreprocessorPlugin, themePreprocessorHmrPlugin } from "@zougt/vite-plugin-theme-preprocessor";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定要缓存的文件夹
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      // 指定symbolId格式
      symbolId: "[name]",
    }),
    // // 创建动态主题切换
    themePreprocessorPlugin({
      less: {
        // 各个主题文件的位置
        multipleScopeVars: [
          {
            scopeName: "theme-violet",
            path: path.resolve("src/theme/violet.less"),
          },
          {
            scopeName: "theme-green",
            path: path.resolve("src/theme/green.less"),
          },
        ],
      },
    }),
    // // 主题热更新，不得已分开插件，因为需要vite插件顺序enforce
    themePreprocessorHmrPlugin(),
  ],
  // 指定软链接
  resolve: {
    alias: {
      "@": join(__dirname, "./src"),
    },
  },
  // css配置
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          // hack: `true; @import (reference) "${resolve("src/assets/less/index.less")}";`,
          // "primary-color": "#1DA57A",
          // "link-color": "#1DA57A",
          // "border-radius-base": "2px",
        },
        additionalData: '@import "./src/assets/css/foundation/mixin/variable.less";',
        javascriptEnabled: true,
      },
    },
  },
  // 请求接口配置
  server: {
    host: "172.29.12.113",
    //同plugins同级
    port: 5173, //本地端口号
    proxy: {
      //配置代理服务器
      "/api": {
        target: "http://localhost:8083", //目标url
        changeOrigin: true, //允许跨域
        rewrite: (path) => path.replace(/^\/api/, ""), //重写路径,替换/api
      },
    },
  },
  // ...其他配置项
  optimizeDeps: {
    include: ["jquery"],
  },
});
