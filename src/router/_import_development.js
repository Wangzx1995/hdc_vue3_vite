const modules = import.meta.glob("../views/**/*.vue");

export default (file) => {
    if (!file) return;
    const path = `../views/${file}.vue`;
    if (modules[path]) {
        return modules[path];
    }
    return modules["../views/layout/noPage.vue"];
};
