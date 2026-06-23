// process.env polyfill for Vite
if (typeof window !== "undefined" && !window.process) {
    window.process = { env: {} };
}
if (typeof import.meta !== "undefined" && import.meta.env) {
    Object.assign(window.process.env, import.meta.env);
}

import { createApp } from "vue";
import mitt from "mitt";
import App from "./app.vue";
import VueCompat, { setCompatApp } from "@/utils/vue-compat";
import ElementPlus from "element-plus";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
// 恢复 Element UI 风格：分页上一页/下一页使用图标而非文字
zhCn.el.pagination.prev = "";
zhCn.el.pagination.next = "";
import "element-plus/dist/index.css";
import "./assets/index.scss";

import router from "./router";
import store from "./store";
import filters from "./filters";
import i18n from "./i18n/i18n.js";

import "@/utils/storage";
import * as echarts from "echarts";
import "normalize.css/normalize.css";
import "./assets/less/app.less";
import commonComponents from "./components/common/index.js";
import directives from "./directives/index.js";
import icons from "./icons/index.js";
import api from "./api";
import "./moudulesConfig/downLoadWatcher";

import log from "@/utils/log"; // error log
import "@/utils/permission"; // 权限
import "./theme/iconfont/iconfont.css";
import "./theme/element-ui-icons.css";
import "./theme/index.css";
import "./assets/less/vue3-compat.less";
import sub from "./store/sub";
window.sub = sub;
import "@/components/webControlService/webControlClass";

/* 处理时间库 */
import moment from "moment";
import "@/utils/message";

const app = createApp(App);
setCompatApp(app);
window.Vue = VueCompat;

app.use(ElementPlus, { locale: zhCn });
import "./moudulesConfig/element";

// 注册 Element Plus 图标组件的 el-icon-* 别名，兼容旧代码中 el-button/icon 的字符串图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
Object.entries(ElementPlusIconsVue).forEach(([key, component]) => {
    const alias =
        "el-icon-" + key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    app.component(alias, component);
});

window.__vue_errors__ = [];
window.__vue_warns__ = [];
app.config.errorHandler = (err, vm, info) => {
    window.__vue_errors__.push({
        message: err.message,
        stack: err.stack,
        info,
    });
    console.error("[Vue error]", err, info, vm);
};
app.config.warnHandler = (msg, vm, trace) => {
    window.__vue_warns__.push({ msg, trace });
    console.warn("[Vue warn]", msg, trace);
};

app.config.globalProperties.$moment = moment;
app.config.globalProperties.$deepCopy = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};
window.deepCopy = app.config.globalProperties.$deepCopy;
window.checkKeys = (Obj) => {
    let res;
    if (
        Obj !== null &&
        typeof Obj === "object" &&
        Object.keys(Obj).length > 0
    ) {
        res = true;
    } else {
        res = false;
    }
    return res;
};

app.config.globalProperties.$echarts = echarts;

// 全局事件总线（替换 Vue 2 $on/$off/$emit）
const emitter = mitt();
app.config.globalProperties.$bas = emitter;

app.use(router);
app.use(store);
app.use(i18n);
app.use(filters);
app.use(commonComponents);
app.use(directives);
app.use(icons);
app.use(api);
app.use(log);

app.mount("#app");
