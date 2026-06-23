import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
    return {
        plugins: [vue()],
        publicDir: "static",
        resolve: {
            extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
            alias: [
                { find: "@", replacement: resolve(__dirname, "src") },
                {
                    find: "@hui-pro",
                    replacement: resolve(__dirname, "src/components/hui-pro"),
                },
                {
                    find: "hui/src/utils/dom",
                    replacement: resolve(
                        __dirname,
                        "src/utils/hui-dom-compat.js",
                    ),
                },
                {
                    find: "hui/src/utils/util",
                    replacement: resolve(
                        __dirname,
                        "src/utils/hui-util-compat.js",
                    ),
                },
                {
                    find: "web-control",
                    replacement: resolve(
                        __dirname,
                        "src/utils/web-control-compat.js",
                    ),
                },
                {
                    find: "vue-baidu-map",
                    replacement: resolve(
                        __dirname,
                        "src/utils/vue-baidu-map-compat.js",
                    ),
                },
                {
                    find: "vue",
                    replacement: "vue/dist/vue.esm-bundler.js",
                },
                {
                    find: /^vue\/dist\/vue\.esm\.js$/,
                    replacement: resolve(
                        __dirname,
                        "src/utils/vue-module-compat.js",
                    ),
                },
            ],
        },
        server: {
            host: "0.0.0.0",
            port: 19528,
            open: true,
            proxy: {},
        },
        build: {
            outDir: "dist",
            assetsDir: "static",
            sourcemap: false,
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: "",
                },
                less: {
                    javascriptEnabled: true,
                    additionalData: `
                        @screen-xs-min: 480px;
                        @screen-sm-min: 768px;
                        @screen-md-min: 992px;
                        @screen-lg-min: 1200px;
                        @line-height-base: 1.5;
                        @border-width: 1px;
                    `,
                },
            },
        },
        define: {
            // 兼容部分旧代码中可能使用的 process.env.NODE_ENV
            "process.env.NODE_ENV": JSON.stringify(
                process.env.NODE_ENV || "development",
            ),
            // 兼容旧 Webpack 代码中使用的 process.env.BASE_API
            "process.env.BASE_API": JSON.stringify(
                process.env.VITE_BASE_API ||
                    "https://oms.hikvisionauto.com:8444/",
            ),
        },
    };
});
