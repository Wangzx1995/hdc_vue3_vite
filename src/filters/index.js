/**
 * 全局Filter
 * Vue 3 已移除 filter，改为全局方法挂载
 */
import * as Filters from "@/filters/filters";

export default {
    install(app) {
        // 将过滤器方法挂载到全局属性，模板中通过 $filter.xxx() 调用
        app.config.globalProperties.$filter = Filters;
    },
};
