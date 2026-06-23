/**
 * Vue 2 到 Vue 3 兼容层
 * 为旧代码中使用的 Vue 全局 API 提供兼容支持
 */
import { nextTick, defineComponent } from "vue";

let _app = null;

export function setCompatApp(app) {
    _app = app;
    // 为 Vue 2 遗留代码提供 $set / $delete 兼容（Vue 3 中 proxy 已无需它们）
    app.config.globalProperties.$set = function (target, key, value) {
        target[key] = value;
        return value;
    };
    app.config.globalProperties.$delete = function (target, key) {
        delete target[key];
    };
}

const VueCompat = {
    set(target, key, value) {
        target[key] = value;
        return value;
    },
    delete(target, key) {
        delete target[key];
    },
    nextTick,
    directive(name, definition) {
        if (_app) {
            _app.directive(name, definition);
        }
    },
    component(name, definition) {
        if (_app) {
            _app.component(name, definition);
        }
    },
    use(plugin, ...options) {
        if (_app) {
            _app.use(plugin, ...options);
        }
    },
    extend(options) {
        return defineComponent(options);
    },
    get prototype() {
        return _app?.config?.globalProperties || {};
    },
    get config() {
        return _app?.config || {};
    },
};

export default VueCompat;
