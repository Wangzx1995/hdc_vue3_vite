/**
 * 自动加载Api，不再单独写入了
 */
export default {
    install(app) {
        const modules = import.meta.glob("./*.js", { eager: true });
        let allApiList = {};
        Object.entries(modules).forEach(([path, module]) => {
            if (path !== "./index.js" && module.default) {
                allApiList = Object.assign(allApiList, module.default);
            }
        });
        app.config.globalProperties.$api = allApiList;
    },
};
