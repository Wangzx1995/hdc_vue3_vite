import deepmerge from "deepmerge";
import Format from "./src/format";

const format = Format();
let lang = {};
let merged = false;
let i18nHandler = function () {
    // Vue 3 兼容：优先使用外部传入的 i18n handler
    // 如果未设置，则使用本地简单路径查找
    const vuei18n = null;
    if (typeof vuei18n === "function") {
        return vuei18n.apply(this, arguments);
    }
};

export const t = function (path, options) {
    let value = i18nHandler.apply(this, arguments);
    if (value !== null && value !== undefined) return value;

    const array = path.split(".");
    let current = lang;
    for (let i = 0, j = array.length; i < j; i++) {
        const property = array[i];
        value = current[property];
        if (!value) {
            return arguments[0];
        }
        if (i === j - 1) return format(value, options);
        current = value;
    }
    return "";
};

export const use = function (l) {
    lang = deepmerge(lang, l);
};

export const i18n = function (fn) {
    i18nHandler = fn || i18nHandler;
};

export default { use, t, i18n };
