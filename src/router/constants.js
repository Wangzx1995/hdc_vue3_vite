const modules = import.meta.glob("../views/**/*.vue");

const _import = (file) => {
    if (!file) return;
    const path = `../views/${file}.vue`;
    if (modules[path]) {
        return modules[path];
    }
    return modules["../views/layout/noPage.vue"];
};

export const constantRouterMap = [
    {
        path: "/deepseek",
        component: _import("deepseek/deepseek"),
        hidden: true,
    },
    { path: "/login", component: _import("login/login"), hidden: true },
    {
        path: "/adminLogin",
        component: _import("login/technicalSupportEngineerLogin"),
        hidden: true,
    },
    {
        path: "/forgetPassword",
        component: _import("login/forgetPassword"),
        hidden: true,
    },
    {
        path: "/modifyPwd",
        component: _import("sysManage/password"),
        hidden: true,
    },
    {
        path: "/signOnPage",
        component: _import("sysManage/signOnPage"),
        hidden: true,
    },
    { path: "/404", component: _import("404"), hidden: true },
    {
        path: "/privacyPolicy",
        component: _import("agreement/privacyPolicy"),
        hidden: true,
    },
    {
        path: "/serviceAgreement",
        component: _import("agreement/serviceAgreement"),
        hidden: true,
    },
    {
        path: "/personalInfo",
        component: _import("agreement/personalInfo"),
        hidden: true,
    },
    {
        path: "/",
        component: _import("layout/layout"),
        redirect: "/dashboard",
        icon: "ivu-icon ivu-icon-ios-home",
        name: "首页",
        noDropdown: true,
        hidden: false,
        children: [
            {
                path: "/dashboard",
                component: _import("dashboard/dashboard"),
                hidden: true,
            },
        ],
    },
];

export const asyncRouterMap = [
    { path: "/:pathMatch(.*)*", redirect: "/404", hidden: true },
];
