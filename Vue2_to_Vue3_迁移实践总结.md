# Vue 2 升级到 Vue 3 + Webpack 迁移到 Vite 实践总结

## 一、项目背景

- **原技术栈**：Vue 2.6.10 + Webpack 3 + Element UI + iview + hui
- **目标技术栈**：Vue 3.4+ + Vite 5 + Element Plus + 自定义适配层
- **项目规模**：373+ 个 `.vue` 文件
- **迁移策略**：逐步迁移，保留 Options API，最小化业务代码改动，优先让项目能跑起来，再按模块逐个修复

---

## 二、Vue 2 到 Vue 3 的主要改动

### 2.1 应用创建方式

Vue 2 通过 `new Vue()` 创建根实例，Vue 3 改为 `createApp()`：

```js
// Vue 2
import Vue from "vue/dist/vue.esm.js";
new Vue({ el: "#app", router, store, template: "<App/>", components: { App } });

// Vue 3
import { createApp } from "vue";
const app = createApp(App);
app.use(router).use(store).use(i18n).mount("#app");
```

### 2.2 全局 API 改造

| Vue 2                      | Vue 3                              |
| -------------------------- | ---------------------------------- |
| `Vue.prototype.$xxx`       | `app.config.globalProperties.$xxx` |
| `Vue.component()`          | `app.component()`                  |
| `Vue.use()`                | `app.use()`                        |
| `Vue.config.productionTip` | 已移除，无需配置                   |
| `Vue.set() / Vue.delete()` | 直接赋值 / `delete`                |
| `Vue.observable()`         | `reactive()`                       |
| `Vue.nextTick()`           | `nextTick()`                       |

项目中全局挂载了 `$moment`、`$echarts`、`$deepCopy`、`$bas` 等，统一改用 `app.config.globalProperties`。在组件内通过 `getCurrentInstance().proxy` 可继续以 `this.$xxx` 形式访问。

### 2.3 路由升级（Vue Router 3 → 4）

- `new Router()` 改为 `createRouter({ history: createWebHashHistory(), routes })`
- 删除 `Vue.use(Router)`
- Vue Router 4 已修复重复导航报错，可移除原来的 `Router.prototype.push` hack
- 动态导入由 webpack 的 `require()` / `require.context()` 改为 Vite 的 `import.meta.glob()`

### 2.4 状态管理升级（Vuex 3 → 4）

- `new Vuex.Store()` 改为 `createStore()`
- 删除 `Vue.use(Vuex)`
- 模块语法基本兼容，7 个 store module（app、user、permission、tree、configView、exportManage、downloadManage）只需调整创建方式

### 2.5 UI 库升级

#### Element UI → Element Plus

- 全量引入：`import ElementPlus from "element-plus"` + `app.use(ElementPlus)`
- 样式：`import "element-plus/dist/index.css"`
- **图标系统大改**：Element UI 使用字体图标 `<i class="el-icon-xxx">`，Element Plus 改为 SVG 图标 `<el-icon><XXX /></el-icon>`，需批量替换

#### iview 移除

iview 无 Vue 3 版本，项目中仅用到 `Icon`、`Poptip`、`Upload` 3 个组件，统一替换为 Element Plus：

| iview 组件          | Element Plus 替代            |
| ------------------- | ---------------------------- |
| `<Icon type="xxx">` | `<el-icon><XXX /></el-icon>` |
| `<Poptip>`          | `<el-popover>`               |
| `<Upload>`          | `<el-upload>`                |

#### hui / @hui-pro 自定义组件适配

`src/components/hui-pro/` 下的 `ellipsis`、`holiday-picker`、`plan`、`tree-select`、`utils` 等组件需要逐个适配。策略是：

1. 先检查 Vue 3 兼容性，大部分 Options API 组件可直接运行
2. 使用了 `Vue.extend`、`Vue.component` 的，替换为 `defineComponent`
3. 自定义指令内部机制按 Vue 3 指令 API 重写

### 2.6 过滤器（Filters）移除

Vue 3 已移除过滤器，原 `src/filters/` 下的过滤器改为：

- 全局方法挂载到 `app.config.globalProperties`
- 或在组件内改为 `computed` / `methods`

### 2.7 自定义指令钩子变化

| Vue 2 钩子         | Vue 3 钩子  |
| ------------------ | ----------- |
| `bind`             | `mounted`   |
| `inserted`         | `mounted`   |
| `update`           | `updated`   |
| `componentUpdated` | `updated`   |
| `unbind`           | `unmounted` |

### 2.8 `$listeners` 合并到 `$attrs`

Vue 3 中 `$listeners` 已移除，所有事件监听器都通过 `$attrs` 传递。封装通用组件时需要重点检查。

### 2.9 第三方依赖兼容

| 依赖             | Vue 2 版本 | Vue 3 处理方案                    |
| ---------------- | ---------- | --------------------------------- |
| `vue-baidu-map`  | 0.21.22    | 替换为 Vue 3 兼容版本或自研兼容层 |
| `v-charts`       | 1.16.12    | 基于 Vue 2，改用 ECharts 直接封装 |
| `v-viewer`       | 1.6.4      | 升级到 Vue 3 版本                 |
| `vue-clipboard2` | 0.3.1      | 可替换为原生 Clipboard API        |
| `vue-scrollto`   | 2.11.1     | 检查 Vue 3 兼容性                 |

---

## 三、Webpack 到 Vite 的主要改动

### 3.1 构建工具替换

- 移除 webpack 3.x 全家桶、babel 6.x 全家桶、`vue-loader`、`vue-template-compiler`
- 移除 `extract-text-webpack-plugin`、`optimize-css-assets-webpack-plugin` 等插件
- 新增 `vite`、`@vitejs/plugin-vue`、`sass`、`less`

### 3.2 HTML 入口变化

Vite 以 `index.html` 为入口，需添加：

```html
<script type="module" src="/src/main.js"></script>
```

### 3.3 环境变量机制变化

Webpack 通过 `config/dev.env.js`、`config/prod.env.js` 注入 `process.env.XXX`，Vite 改为：

- `.env.development`、`.env.production`
- 只有以 `VITE_` 开头的变量才会暴露到客户端
- 代码中通过 `import.meta.env.VITE_XXX` 读取

为了兼容旧代码中大量使用的 `process.env.BASE_API`，在 `vite.config.js` 中通过 `define` 显式注入：

```js
define: {
  "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
  "process.env.BASE_API": JSON.stringify(
    process.env.VITE_BASE_API || "https://oms.hikvisionauto.com:8444/"
  ),
}
```

### 3.4 `require()` 必须全部改为 ES Module `import`

Vite 基于原生 ESM，浏览器侧不再支持 CommonJS 的 `require()`。项目中涉及：

- `js-sha256`：`require("js-sha256")` → `import { sha256 } from "js-sha256"`
- `docx-preview`：`require("docx-preview")` → `import * as docx from "docx-preview"`
- SCSS 样式：`require("@/assets/xxx.scss")` → `import "@/assets/xxx.scss"`
- 图片资源：`require("@/assets/xxx.png")` → `import xxx from "@/assets/xxx.png"`
- 第三方库 `projzh`

最终需确保 `src/**/*.vue` 和 `src/**/*.js` 中无 `require()` 调用（Node 端脚本如 `uploadServer.js` 除外）。

### 3.5 动态路由加载方式变化

Webpack 时代：

```js
const _import = require("./_import_" + process.env.NODE_ENV);
```

Vite 下改为 `import.meta.glob()`：

```js
const modules = import.meta.glob("../views/**/*.vue");
const _import = (path) => modules[`../views/${path}.vue`];
```

### 3.6 组件导入路径必须显式写 `.vue` 扩展名

Webpack 可以省略 `.vue`，Vite 必须显式指定：

```js
// 错误
import VmLogin from "@/components/login";

// 正确
import VmLogin from "@/components/login.vue";
```

这个坑直接导致过登录页白屏。

### 3.7 别名与兼容层配置

`vite.config.js` 中配置了 `@` → `src`、`@hui-pro` → `src/components/hui-pro`，以及多个兼容层别名：

```js
{
  find: "hui/src/utils/dom",
  replacement: resolve(__dirname, "src/utils/hui-dom-compat.js"),
},
{
  find: "vue-baidu-map",
  replacement: resolve(__dirname, "src/utils/vue-baidu-map-compat.js"),
},
{
  find: /^vue\/dist\/vue\.esm\.js$/,
  replacement: resolve(__dirname, "src/utils/vue-module-compat.js"),
}
```

### 3.8 静态资源与预处理器配置

- 静态资源目录由 webpack 的 `static/` 改为 Vite 的 `publicDir: "static"`
- SCSS / Less 预处理器通过 `css.preprocessorOptions` 配置
- Less 需要开启 `javascriptEnabled: true`

---

## 四、迁移过程中遇到的坑和难点

### 4.1 `require is not defined`

**现象**：浏览器控制台报 `ReferenceError: require is not defined`。
**根因**：Vite 不支持浏览器侧 `require()`。
**解决**：统一改为 ES Module `import`，包括 JS 库、SCSS、图片、动态路由等。

### 4.2 组件导入缺失 `.vue` 扩展名导致白屏

**现象**：登录页或其他页面白屏，控制台报模块解析失败。
**根因**：Vite 要求 `.vue` 扩展名必须显式写出。
**解决**：全局检查并补全 `import Xxx from "@/components/xxx.vue"`。

### 4.3 路由循环依赖导致 TDZ 错误

**现象**：ESM 初始化时报 `Cannot access 'constantRouterMap' before initialization`。
**根因**：`constantRouterMap` 定义在 `router/index.js` 中，而该文件又间接依赖 `store`，`store/permission.js` 又反过来导入 `router/index.js`，形成循环依赖。
**解决**：将 `constantRouterMap` 和 `asyncRouterMap` 抽离到独立的 `src/router/constants.js`，该文件仅使用 `import.meta.glob`，不引入任何 store、layout 或其他可能形成循环依赖的模块。

### 4.4 Vue Router 4 路由 name 唯一性校验

**现象**：控制台报 `A route named ... has been added as a child`。
**根因**：Vue Router 4 不允许父子路由 name 相同，而后端返回的菜单存在同名父子项。
**解决**：在 `permission.js` 的 `GenerateRoutes` 中动态生成唯一路由 name（如加 id/path 后缀），原始名称存入 `meta.title`，菜单渲染时优先读取 `meta.title`。

### 4.5 `process.env.BASE_API` 不生效

**现象**：API 请求 baseURL 不对，代理配置未生效。
**根因**：Vite 默认只暴露 `VITE_` 前缀的环境变量，旧代码中的 `process.env.BASE_API` 为 `undefined`。
**解决**：在 `vite.config.js` 的 `define` 中显式注入 `process.env.BASE_API`，映射到 `VITE_BASE_API` 或默认值。

### 4.6 `vue/dist/vue.esm.js` 路径不可用

**现象**：旧代码 `import Vue from "vue/dist/vue.esm.js"` 报错。
**根因**：Vue 3 不再提供该路径的构建产物。
**解决**：改为 `import Vue from "vue/dist/vue.esm-bundler.js"`，或通过 `vite.config.js` 别名映射到自定义兼容层 `src/utils/vue-module-compat.js`。

### 4.7 Element Plus 图标系统迁移工作量大

**现象**：大量图标不显示。
**根因**：Element UI 是字体图标，Element Plus 是 SVG 图标。
**解决**：批量替换 `<i class="el-icon-xxx">` → `<el-icon><XXX /></el-icon>`，并引入 `@element-plus/icons-vue`。

### 4.8 hui-pro 自定义组件适配

**难点**：这些组件源码在 `src/components/hui-pro/`，部分使用了 `Vue.extend`、自定义指令等 Vue 2 特性，需要逐个调试适配。

### 4.9 iview 组件替换

虽然只有 3 个组件，但如果在模板中被大量使用，替换工作量也会增加，需全局搜索 `src/iview.js` 和模板中的 `Icon`、`Poptip`、`Upload`。

### 4.10 全局属性 `this` 访问

Vue 3 中选项式组件的 `this` 行为有变化，部分全局挂载属性需要通过兼容层或 `getCurrentInstance().proxy` 访问。

---

## 五、Webpack 迁移到 Vite 的优点

### 5.1 启动速度极快

Vite 利用原生 ESM，开发服务器启动时间从 webpack 的几十秒缩短到秒级，大型项目感受尤为明显。

### 5.2 热更新（HMR）更快

webpack 热更新需要重新打包相关模块，Vite 只更新变化的模块，几乎即时生效，开发体验大幅提升。

### 5.3 构建配置更简单

`vite.config.js` 相比 webpack 的 `build/webpack.base.conf.js`、`webpack.dev.conf.js`、`webpack.prod.conf.js` 等多文件配置，更加简洁直观。

### 5.4 原生支持 ES Module

Vite 不再需要将源码打包成 bundle 才能运行，浏览器直接请求模块，调试时源码映射更清晰。

### 5.5 按需编译

开发环境下 Vite 按需编译当前页面用到的模块，而不是一次性编译整个项目，首屏加载和后续页面打开都更快。

### 5.6 更好的错误提示

Vite 的错误提示通常更精准，能直接定位到源码位置，而不是打包后的代码。

### 5.7 现代前端生态兼容性更好

Vue 3、Vue Router 4、Vuex 4、Element Plus 等新一代库与 Vite 配合更紧密，官方示例和插件生态更完善。

### 5.8 构建产物更现代

Vite 默认使用 Rollup 进行生产构建，生成的代码更干净，Tree Shaking 效果更好。

---

## 六、迁移实施建议

1. **先切分支**：从 Vue 2 代码切出独立的迁移分支，保留原构建配置作为对比参考。
2. **基础框架先行**：先完成 Vite 配置、`main.js`、路由、状态管理、环境变量，让项目能跑起来。
3. **按模块逐个迁移**：UI 库、公共组件、业务模块分批处理，避免一次性改动过多导致问题难以定位。
4. **建立验证清单**：按优先级验证登录页、首页 Dashboard、核心模块（maintenanceCenter、manageCenter）、公共组件等。
5. **关注常见白屏原因**：组件路径扩展名、样式引入、图标迁移、API 代理配置。
6. **保留兼容层**：对于 `process.env`、旧 UI 组件、第三方库等，优先通过兼容层或别名解决，减少业务代码改动。

---

## 七、总结

本次迁移的核心思路是 **"先跑起来，再逐个修复"**。Vue 2 到 Vue 3 的改动主要集中在全局 API、路由、状态管理、UI 库和移除特性上；Webpack 到 Vite 的改动则更多是构建范式从 CommonJS/bundle 到 ESM/按需编译的转变。最耗时、最容易踩坑的地方往往不是框架本身的语法变化，而是 **大量业务代码中的 `require()` 替换、`.vue` 扩展名补全、路由循环依赖解耦、环境变量兼容、以及 Element Plus 图标和 hui-pro 组件的适配**。通过保留 Options API 和添加兼容层，可以显著降低迁移成本。
