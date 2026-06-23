const fs = require("fs");
const path = require("path");

const srcDir = path.resolve(__dirname, "src");

function walk(dir) {
    const files = [];
    for (const entry of fs.readdirSync(dir)) {
        const fullPath = path.join(dir, entry);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            files.push(...walk(fullPath));
        } else if (stat.isFile() && entry.endsWith(".vue")) {
            files.push(fullPath);
        }
    }
    return files;
}

function findMatchingCloseTag(content, tagName, startIdx) {
    const openRegex = new RegExp(`<${tagName}(?![a-zA-Z0-9-])`, "g");
    const closeRegex = new RegExp(`</${tagName}\\s*>`, "g");
    let depth = 1;
    let i = startIdx;
    openRegex.lastIndex = i;
    closeRegex.lastIndex = i;

    while (true) {
        const openMatch = openRegex.exec(content);
        const closeMatch = closeRegex.exec(content);

        if (!closeMatch) return -1;
        if (openMatch && openMatch.index < closeMatch.index) {
            depth++;
            i = openMatch.index + 1;
            closeRegex.lastIndex = i;
            openRegex.lastIndex = i;
        } else {
            depth--;
            if (depth === 0) return closeMatch.index;
            i = closeMatch.index + 1;
            openRegex.lastIndex = i;
        }
    }
}

function isInsideComment(content, index) {
    const before = content.substring(0, index);
    const lastCommentStart = before.lastIndexOf("<!--");
    if (lastCommentStart === -1) return false;
    const lastCommentEnd = before.lastIndexOf("-->", lastCommentStart);
    return lastCommentEnd < lastCommentStart;
}

function processFile(filePath) {
    let content = fs.readFileSync(filePath, "utf8");
    const original = content;

    // 1. <template slot="X"> -> <template #X>
    content = content.replace(
        /<template\s+slot="([a-zA-Z][a-zA-Z0-9_-]*)"\s*>/g,
        "<template #$1>",
    );

    // 2. <template slot="X" #default="Y"> -> <template #X="Y"> (both attribute orders)
    content = content.replace(
        /<template\s+slot="([a-zA-Z][a-zA-Z0-9_-]*)"\s+#default="([^"]+)"\s*>/g,
        '<template #$1="$2">',
    );
    content = content.replace(
        /<template\s+#default="([^"]+)"\s+slot="([a-zA-Z][a-zA-Z0-9_-]*)"\s*>/g,
        '<template #$2="$1">',
    );

    // 3. Element tags with slot="X" (not template, not dynamic slot bindings)
    const slotTagRegex =
        /<([a-zA-Z][a-zA-Z0-9-]*)\s+([^>]*\s)?slot="([a-zA-Z][a-zA-Z0-9_-]*)"(\s[^>]*)?>/g;
    const matches = [];
    let match;
    while ((match = slotTagRegex.exec(content)) !== null) {
        const tagName = match[1];
        const slotName = match[3];
        const startIdx = match.index;

        if (tagName === "template") continue;
        if (isInsideComment(content, startIdx)) continue;

        const openEndIdx = content.indexOf(">", startIdx) + 1;
        const closeStartIdx = findMatchingCloseTag(
            content,
            tagName,
            openEndIdx,
        );
        if (closeStartIdx === -1) {
            console.warn(
                `Could not find closing tag for <${tagName}> in ${filePath}:${startIdx}`,
            );
            continue;
        }
        const closeEndIdx = content.indexOf(">", closeStartIdx) + 1;
        matches.push({ startIdx, closeEndIdx, slotName, tagName });
    }

    // Process from end to keep indices valid
    for (let i = matches.length - 1; i >= 0; i--) {
        const m = matches[i];
        const before = content.substring(0, m.startIdx);
        const element = content.substring(m.startIdx, m.closeEndIdx);
        const after = content.substring(m.closeEndIdx);

        const openingEnd = element.indexOf(">") + 1;
        const openingTag = element.substring(0, openingEnd);
        const inner = element.substring(openingEnd);

        // Remove slot attribute from opening tag
        const newOpeningTag = openingTag.replace(
            /\s+slot="[a-zA-Z][a-zA-Z0-9_-]*"/,
            "",
        );
        const wrapped = `<template #${m.slotName}>${newOpeningTag}${inner}</template>`;

        content = before + wrapped + after;
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content, "utf8");
        console.log("Updated:", filePath);
    }
}

const files = walk(srcDir);
for (const file of files) {
    processFile(file);
}
console.log("Done. Processed", files.length, "files.");
