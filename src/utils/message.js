import {
    ElMessage,
    ElMessageBox,
    ElNotification,
    ElLoading,
} from "element-plus";

export default {
    install(app) {
        app.config.globalProperties.$message = function (msg) {
            let msgType = msg.type || "";
            switch (msgType) {
                case "success":
                    return ElMessage.success({
                        message: msg.message ? msg.message : msg,
                        duration: 500,
                    });
                case "warning":
                    return ElMessage.warning({
                        message: msg.message ? msg.message : msg,
                        duration: 1000,
                    });
                case "error":
                    return ElMessage.error({
                        message: msg.message ? msg.message : msg,
                        duration: 2000,
                    });
                default:
                    return ElMessage.info({
                        message: msg.message ? msg.message : msg,
                        duration: 1000,
                    });
            }
        };
        app.config.globalProperties.$message.success = function (
            msg,
            duration = 500,
        ) {
            return ElMessage.success({
                message: msg,
                duration: duration,
            });
        };
        app.config.globalProperties.$message.warning = function (
            msg,
            duration = 1000,
        ) {
            return ElMessage.warning({
                message: msg,
                duration: duration,
            });
        };
        app.config.globalProperties.$message.error = function (
            msg,
            duration = 2000,
        ) {
            return ElMessage.error({
                message: msg,
                duration: duration,
            });
        };
        app.config.globalProperties.$message.info = function (
            msg,
            duration = 1000,
        ) {
            return ElMessage.info({
                message: msg,
                duration: duration,
            });
        };

        app.config.globalProperties.$confirm = ElMessageBox.confirm;
        app.config.globalProperties.$prompt = ElMessageBox.prompt;
        app.config.globalProperties.$alert = ElMessageBox.alert;
        app.config.globalProperties.$notify = ElNotification;
        app.config.globalProperties.$loading = ElLoading.service;
    },
};
