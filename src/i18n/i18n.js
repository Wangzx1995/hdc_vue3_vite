import { createI18n } from "vue-i18n";
import messages from "./langs";

const DEFAULT_LANG = "zh-CN";

const i18n = createI18n({
    legacy: false,
    locale: DEFAULT_LANG,
    fallbackLocale: "zh-CN",
    messages,
    silentTranslationWarn: true,
});

export const setLanguage = (lang) => {
    if (lang === undefined) {
        lang = window.localStorage.getItem("omsLanguage");
        if (lang === null) {
            lang = navigator.language;
            if (lang.indexOf("en") > -1) {
                lang = "en-US";
            }
            if (messages[lang] === undefined) {
                lang = DEFAULT_LANG;
            }
        }
    }
    window.localStorage.setItem("omsLanguage", lang);
    i18n.global.locale.value = lang;
};
setLanguage();

export default i18n;
