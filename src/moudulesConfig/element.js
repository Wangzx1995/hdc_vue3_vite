import ElementPlus from "element-plus";

export default {
    install(app) {
        // Element Plus 默认配置
        // 注意：Element Plus 的配置方式与 Element UI 略有不同
        // 以下通过修改组件 props 默认值来实现
        const defaultProps = {
            "el-table": { border: true },
            "el-dialog": { closeOnClickModal: false },
        };

        // 通过全局属性暴露 ElementPlus 实例，方便后续访问
        app.config.globalProperties.$ELEMENT = { size: "small", zIndex: 3000 };
    },
};
