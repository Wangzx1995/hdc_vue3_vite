export default {
    install(app) {
        const modules = import.meta.glob("./*/index.js", { eager: true });
        Object.entries(modules).forEach(([path, module]) => {
            const component = module.default;
            if (component && component.name) {
                app.component(component.name, component);
            }
        });
    },
};
