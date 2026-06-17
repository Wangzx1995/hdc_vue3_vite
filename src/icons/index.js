import SvgIcon from "@/components/SvgIcon.vue";

export default {
    install(app) {
        app.component("svg-icon", SvgIcon);
        // 批量导入 svg 文件
        const modules = import.meta.glob("./svg/*.svg", { eager: true });
        Object.values(modules);
    },
};
