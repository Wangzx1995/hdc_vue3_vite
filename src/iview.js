/**
 * iview 组件 Vue 3 适配
 * 原 iview 的 Icon、Poptip、Upload 已替换为 Element Plus 对应组件
 * 在 Vue 3 下，Element Plus 的组件会自动注册，无需在此额外处理
 * 后续需在模板中将 <Icon> 替换为 <el-icon>，<Poptip> 替换为 <el-popover>
 */
export default {
    install(app) {
        // iview 组件在 Vue 3 下不再可用
        // 请在模板中使用 Element Plus 的等效组件替代
    },
};
