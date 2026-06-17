const modules = import.meta.glob("./lib/**/*.js", { eager: true });
Object.entries(modules).forEach(([path, module]) => {
    if (module.default) {
        let { name, control } = module.default;
        if (name) {
            window[name] = control;
        }
    }
});
