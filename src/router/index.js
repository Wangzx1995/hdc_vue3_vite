import { createRouter, createWebHashHistory } from "vue-router";
import { constantRouterMap, asyncRouterMap } from "./constants";

const router = createRouter({
    history: createWebHashHistory(),
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap,
});

export default router;

export { constantRouterMap, asyncRouterMap };
