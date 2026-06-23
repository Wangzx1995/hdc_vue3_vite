import i18n from "@/i18n/i18n.js";
const t = i18n.global.t;

export default {
    uploadMethodList: [
        {
            // label: "立即上传",
            label: t("devLog.uploadNow"),
            value: 0,
        },
        {
            // label: "持续上传",
            label: t("devLog.continuouslyUpload"),
            value: 1,
        },
        {
            // label: "实时上传",
            label: t("devLog.realTimeUpload"),
            value: 2,
        },
    ],
    uploadTypeList: [
        {
            // label: "按类型",
            label: t("devLog.byType"),
            value: 0,
        },
        // {
        //     label: "按地址",
        //     value: 1,
        // },
    ],
    logTypeList: [
        {
            // label: "操作日志",
            label: t("devLog.logTypeLabel1"),
            value: 1,
        },
        {
            // label: "GPS记录日志",
            label: t("devLog.logTypeLabel2"),
            value: 2,
        },
        {
            // label: "设备打印调试日志",
            label: t("devLog.logTypeLabel3"),
            value: 3,
        },
        {
            // label: "IPC打印日志",
            label: t("devLog.logTypeLabel4"),
            value: 4,
        },
        {
            // label: "smart硬盘信息",
            label: t("devLog.logTypeLabel5"),
            value: 5,
        },
    ],
};
