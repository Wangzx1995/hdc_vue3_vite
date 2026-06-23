const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname, 'src/views/layout/headbar.vue');
let content = fs.readFileSync(file, 'utf-8');

// 1. 在 .el-menu--horizontal.headbar-menu 内的 .el-menu--popup 样式中追加背景色（可能不生效，但保留）
const oldPopupStyle = `.el-menu--popup {
        padding: 0px !important;
        margin-top: 0px !important;
        width: 100%;
    }`;
const newPopupStyle = `.el-menu--popup {
        padding: 0px !important;
        margin-top: 0px !important;
        width: 100%;
        background-color: #fff !important;
    }`;

if (!content.includes(oldPopupStyle)) {
    console.log('oldPopupStyle not found, may already updated');
} else {
    content = content.replace(oldPopupStyle, newPopupStyle);
}

// 2. 在 .el-menu--horizontal { 块之后追加全局覆盖
const insertAnchor = `.el-menu--horizontal {
    .menu-box {`;
const newGlobalStyle = `.headbar-submenu .el-menu--popup {
    background-color: #fff !important;
    padding: 0px !important;
    box-shadow: none !important;
}
.el-menu--horizontal {
    .menu-box {`;

if (content.includes('.headbar-submenu .el-menu--popup')) {
    console.log('Global style already exists');
} else if (!content.includes(insertAnchor)) {
    console.error('Cannot find insert anchor');
    process.exit(1);
} else {
    content = content.replace(insertAnchor, newGlobalStyle);
}

fs.writeFileSync(file, content, 'utf-8');
console.log('Fixed headbar popup style.');
