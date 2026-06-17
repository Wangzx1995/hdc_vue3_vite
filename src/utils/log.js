import errLog from "@/store/log";

export default {
    install(app) {
        if (import.meta.env.MODE === "production") {
            app.config.errorHandler = function (err, vm) {
                console.log(err, window.location.href);
                errLog.pushLog({
                    err,
                    url: window.location.href,
                    vm,
                });
            };
        }
    },
};
