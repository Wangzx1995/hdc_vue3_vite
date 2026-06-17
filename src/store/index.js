import { createStore } from "vuex";
import getters from "./getters";
import app from "./modules/app";
import user from "./modules/user";
import permission from "./modules/permission";
import tree from "./modules/tree";
import configView from "./modules/configView";
import exportManage from "./modules/exportManage";
import downloadManage from "./modules/downloadManage";

const store = createStore({
    getters,
    modules: {
        app,
        user,
        permission,
        tree,
        configView,
        exportManage,
        downloadManage,
    },
});

export default store;
