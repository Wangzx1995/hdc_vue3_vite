# Vue 2 升级 Vue 3 + Webpack 迁移 Vite 面试问答

> 适用于前端面试场景，以面试官提问 + 候选人回答的形式整理，覆盖技术选型、迁移过程、问题排查、性能对比等核心要点。

---

## 一、项目背景与选型

### Q1：你们当时为什么要做 Vue 2 到 Vue 3 的升级？

**A：** 主要有几个原因：

1. **Vue 2 官方停止维护**：Vue 2 在 2023 年底停止支持，后续不会再有安全补丁和新特性。
2. **Element UI 停止维护**：我们项目重度依赖 Element UI，但它的 Vue 3 版本 Element Plus 才是未来主流。
3. **开发体验瓶颈**：老项目基于 Webpack 3，启动和热更新越来越慢，项目有 373+ 个 `.vue` 文件，开发效率受影响。
4. **生态和招聘**：Vue 3 + Vite 已经是主流技术栈，团队也需要跟上社区节奏。

我们的策略是**逐步迁移、保留 Options API、最小化业务代码改动**，而不是一次性重写。

---

### Q2：为什么不继续用 Webpack，而选择 Vite？

**A：** 几个核心考虑：

- **启动速度**：Vite 基于原生 ESM，冷启动从 Webpack 的几十秒降到几秒。
- **热更新体验**：Webpack HMR 需要重新打包相关模块，Vite 只更新变化的模块，几乎是即时的。
- **配置简单**：原来 Webpack 3 有 `webpack.base.conf.js`、`webpack.dev.conf.js`、`webpack.prod.conf.js` 多个文件，Vite 一个 `vite.config.js` 就能搞定。
- **Vue 3 生态更适配**：Vue Router 4、Vuex 4、Element Plus 与 Vite 配合更自然。
- **源码调试更友好**：浏览器直接加载 ESM，Source Map 更干净。

---

## 二、Vue 2 到 Vue 3 的核心变化

### Q3：Vue 2 和 Vue 3 创建应用的方式有什么区别？

**A：**

```js
// Vue 2
import Vue from "vue/dist/vue.esm.js";
new Vue({ el: "#app", router, store, template: "<App/>", components: { App } });

// Vue 3
import { createApp } from "vue";
const app = createApp(App);
app.use(router).use(store).use(i18n).mount("#app");
```

Vue 3 的 `createApp` 解决了 Vue 2 中多个根实例共享全局配置的问题，每个应用实例都是独立的。

---

### Q4：Vue 3 里全局属性怎么挂载？`Vue.prototype` 还能用吗？

**A：** 不能用了。Vue 3 改为：

```js
app.config.globalProperties.$moment = moment;
app.config.globalProperties.$echarts = echarts;
```

在组件里，Options API 还是可以通过 `this.$moment` 访问。如果是 Composition API，可以通过 `getCurrentInstance().proxy.$moment` 访问。

---

### Q5：Vue Router 3 到 4 有哪些关键变化？

**A：**

- 创建方式：`new Router()` → `createRouter()`
- 路由模式：`mode: "hash"` → `history: createWebHashHistory()`
- 删除 `Vue.use(Router)`
- Vue Router 4 修复了重复导航报错，原来覆盖 `Router.prototype.push` 的 hack 可以移除
- **动态导入必须用 `import.meta.glob()`**，不能用 Webpack 的 `require()`
- **路由 name 唯一性校验更严格**，父子路由不能同名

---

### Q6：Vuex 迁移到 Vue 3 变化大吗？

**A：** 不大。主要是创建方式变化：

```js
// Vue 2
new Vuex.Store({ ... });

// Vue 3
createStore({ ... });
```

模块的 state、mutations、actions、getters 写法基本保持一致，我们项目 7 个 store module 只改了入口创建方式。

---

### Q7：Vue 3 移除了过滤器（Filters），你们是怎么处理的？

**A：** 我们把原来的 filters 改造成两种形式：

1. **全局方法**：挂载到 `app.config.globalProperties`，模板里通过 `this.$formatDate()` 或 `$formatDate()` 使用。
2. **组件内方法**：原来在模板里用过滤器的场景，改为 `computed` 或 `methods`。

---

### Q8：自定义指令在 Vue 3 里有什么变化？

**A：** 钩子函数名变了：

| Vue 2              | Vue 3       |
| ------------------ | ----------- |
| `bind`             | `mounted`   |
| `inserted`         | `mounted`   |
| `update`           | `updated`   |
| `componentUpdated` | `updated`   |
| `unbind`           | `unmounted` |

需要把 `src/directives/index.js` 里的指令按新钩子重写。

---

### Q9：`$listeners` 在 Vue 3 里还能用吗？

**A：** 不能用了。Vue 3 中 `$listeners` 合并到了 `$attrs` 里。封装通用组件时，如果原来通过 `$listeners` 透传事件，需要改成 `$attrs`。

---

### Q10：Element UI 升级到 Element Plus，最麻烦的是什么？

**A：** 最麻烦的是**图标系统**。

Element UI 是字体图标：

```html
<i class="el-icon-edit"></i>
```

Element Plus 是 SVG 图标：

```html
<el-icon><Edit /></el-icon>
```

需要全局批量替换，并引入 `@element-plus/icons-vue`。另外一些组件的 API 也有调整，比如 `el-dialog` 的 `visible` 改成了 `model-value`，需要逐个检查。

---

## 三、Webpack 到 Vite 的迁移

### Q11：Webpack 到 Vite，HTML 入口有什么变化？

**A：** Vite 以 `index.html` 作为入口，需要在 `index.html` 里直接引入：

```html
<script type="module" src="/src/main.js"></script>
```

不再通过 Webpack 的 `HtmlWebpackPlugin` 自动注入。

---

### Q12：Vite 的环境变量和 Webpack 有什么不同？

**A：**

- Webpack 通过 `config/dev.env.js`、`config/prod.env.js` 注入 `process.env.XXX`
- Vite 使用 `.env.development`、`.env.production`
- **只有以 `VITE_` 开头的变量才会暴露到客户端**
- 代码里通过 `import.meta.env.VITE_XXX` 读取

为了兼容旧代码里大量使用的 `process.env.BASE_API`，我们在 `vite.config.js` 的 `define` 中显式注入：

```js
define: {
  "process.env.BASE_API": JSON.stringify(
    process.env.VITE_BASE_API || "https://oms.hikvisionauto.com:8444/"
  ),
}
```

---

### Q13：迁移到 Vite 后，`require()` 报错了，怎么解决？

**A：** Vite 基于原生 ESM，浏览器侧不支持 `require()`。我们做了全量替换：

- `require("js-sha256")` → `import { sha256 } from "js-sha256"`
- `require("docx-preview")` → `import * as docx from "docx-preview"`
- `require("@/assets/xxx.scss")` → `import "@/assets/xxx.scss"`
- `require("@/assets/xxx.png")` → `import xxx from "@/assets/xxx.png"`
- 动态路由的 `require()` / `require.context()` → `import.meta.glob()`

最终验证 `src/**/*.vue` 和 `src/**/*.js` 里没有 `require()` 调用。

---

### Q14：`import.meta.glob()` 是怎么替换动态路由的？

**A：** 原来 Webpack 时代：

```js
const _import = require("./_import_" + process.env.NODE_ENV);
```

Vite 下改成：

```js
const modules = import.meta.glob("../views/**/*.vue");
const _import = (path) => modules[`../views/${path}.vue`];
```

`import.meta.glob` 会返回一个映射表，key 是相对路径，value 是返回组件的异步函数。

---

### Q15：迁移过程中有遇到过白屏问题吗？怎么排查的？

**A：** 遇到过登录页白屏。排查过程：

1. 看浏览器控制台，发现模块解析失败
2. 定位到 `import VmLogin from "@/components/login"`
3. **Vite 要求组件导入必须显式写 `.vue` 扩展名**
4. 改成 `import VmLogin from "@/components/login.vue"` 后解决

验证时不能只看控制台无报错，必须真实访问页面确认渲染正常。

---

### Q16：有没有遇到过循环依赖或者初始化报错？

**A：** 遇到过 `Cannot access 'constantRouterMap' before initialization` 的 TDZ 错误。

原因是 `constantRouterMap` 定义在 `router/index.js` 里，而 `router/index.js` 又间接依赖了 `store`，`store/permission.js` 又反过来导入 `router/index.js`，形成循环依赖。

解决方案是把 `constantRouterMap` 和 `asyncRouterMap` 抽离到独立的 `src/router/constants.js`，这个文件只使用 `import.meta.glob`，不引入任何 store、layout 或其他可能形成循环依赖的模块。

---

### Q17：Vue Router 4 报 "A route named ... has been added as a child" 是什么原因？

**A：** 这是 Vue Router 4 的 name 唯一性校验。不允许父子路由 name 相同，但我们的后端菜单返回了同名的父子菜单项。

解决方法是在 `permission.js` 的 `GenerateRoutes` 里动态生成唯一 name，比如把原始 name 加 `id` 或 `path` 后缀，原始名称存到 `meta.title` 里，菜单渲染时优先读取 `meta.title`。

---

### Q18：`process.env.BASE_API` 在 Vite 里为什么不生效？

**A：** Vite 默认只暴露 `VITE_` 前缀的环境变量到客户端，非 `VITE_` 前缀的变量在浏览器里是 `undefined`。

我们的旧代码大量使用了 `process.env.BASE_API`，所以通过 `vite.config.js` 的 `define` 配置做了兼容注入，把 `VITE_BASE_API` 映射到 `process.env.BASE_API`，业务代码不需要改动。

---

### Q19：`vue/dist/vue.esm.js` 在 Vue 3 里为什么不能用了？

**A：** Vue 3 不再提供这个路径的构建产物。原来的代码：

```js
import Vue from "vue/dist/vue.esm.js";
```

会报错。我们做了两种处理：

1. 改成 `import Vue from "vue/dist/vue.esm-bundler.js"`
2. 在 `vite.config.js` 里配置别名，把 `vue/dist/vue.esm.js` 映射到自定义兼容层 `src/utils/vue-module-compat.js`

---

## 四、难点与坑

### Q20：这次迁移最花时间的地方是什么？

**A：** 最花时间的不是 Vue 3 语法本身，而是：

1. **全量 `require()` 改 `import`**：涉及 JS 库、样式、图片、动态路由等很多场景
2. **`.vue` 扩展名补全**：大量组件导入路径要改
3. **Element Plus 图标迁移**：全量替换字体图标为 SVG 图标
4. **hui-pro 自定义组件适配**：部分组件用了 Vue 2 特性，需要逐个调试
5. **路由循环依赖和 name 冲突**：解耦和生成唯一 name
6. **第三方库兼容**：`vue-baidu-map`、`v-charts` 等没有 Vue 3 版本或 API 变化大

---

### Q21：iview 是怎么处理的？

**A：** iview 没有 Vue 3 版本，我们项目中只用了 `Icon`、`Poptip`、`Upload` 三个组件，全部替换为 Element Plus：

- `Icon` → `el-icon` + `@element-plus/icons-vue`
- `Poptip` → `el-popover`
- `Upload` → `el-upload`

全局搜索 `src/iview.js` 和模板中的使用位置，批量替换。

---

### Q22：v-charts 是怎么处理的？

**A：** `v-charts` 是基于 Vue 2 封装的 ECharts 组件库，没有 Vue 3 版本。我们直接改用 ECharts 原生 API 封装图表组件，虽然工作量增加了，但灵活性和可维护性更好。

---

### Q23：迁移过程中怎么保证不会一次性改崩？

**A：** 我们的策略是：

1. **切独立分支**：保留原有 Vue 2 + Webpack 代码，随时可对比回滚
2. **先让项目跑起来**：完成 Vite 配置、入口、路由、状态管理、环境变量后再逐步修复
3. **按模块拆分**：UI 库、公共组件、业务模块逐个处理，每改完一个模块就验证
4. **建立验证清单**：按优先级验证登录页、Dashboard、核心模块、公共组件
5. **保留兼容层**：通过 `define`、别名、适配文件减少业务代码改动

---

## 五、性能与体验对比

### Q24：Vite 相比 Webpack，实际体验上有什么不同？

**A：**

| 维度       | Webpack 3                     | Vite 5                    |
| ---------- | ----------------------------- | ------------------------- |
| 冷启动     | 几十秒                        | 几秒                      |
| HMR        | 较慢，需重新打包模块          | 几乎即时                  |
| 配置复杂度 | 多文件，复杂                  | 单文件，简洁              |
| 源码调试   | 打包后代码，Source Map 需配置 | 原生 ESM，更直接          |
| 按需编译   | 全量打包                      | 按需编译当前页面          |
| 生产构建   | 自身打包                      | Rollup，Tree Shaking 更好 |

---

### Q25：Vite 的 HMR 为什么比 Webpack 快？

**A：**

- Webpack 的 HMR 需要重新构建变更模块及其依赖的模块，然后推送更新
- Vite 利用浏览器原生 ESM，模块之间通过 `import` 直接关联，服务端只需要推送变更的模块，浏览器会重新请求这个模块及其直接依赖
- 对于大型项目，Vite 的 HMR 更新时间与项目规模基本无关，始终保持在较低水平

---

### Q26：Vite 生产构建用的是什么？和 Webpack 有什么区别？

**A：** Vite 生产构建底层用的是 Rollup。相比 Webpack：

- Rollup 更适合打包库和应用，生成的代码更干净
- Tree Shaking 更彻底
- 输出格式更现代，默认支持 ESM
- 配置更简洁

---

## 六、设计决策与扩展

### Q27：为什么保留 Options API，而不是全面改用 Composition API？

**A：** 主要是为了**控制迁移成本**。项目有 373+ 个 `.vue` 文件，如果全部改成 Composition API，工作量和风险都会指数级增加。Vue 3 完全兼容 Options API，所以我们的策略是：

- 迁移阶段保留 Options API，让业务代码改动最小
- 后续新功能或重构老模块时，再逐步引入 Composition API

---

### Q28：如果让你重新做一次迁移，你会怎么做？

**A：**

1. **更早做全量扫描**：用脚本先扫描所有 `require()`、省略 `.vue` 的导入、`Vue.prototype`、Element UI 图标等，形成问题清单
2. **自动化替换 + 人工复核**：对于规则明确的替换，用脚本批量处理，减少重复劳动
3. **更早引入测试**：如果项目有 E2E 测试，迁移前先补齐核心流程用例
4. **第三方库提前评估**：对于 `v-charts`、`vue-baidu-map` 等，提前确定替换方案
5. **分阶段上线**：可以先让一部分页面或模块在 Vue 3 + Vite 下跑起来，而不是全量一次性切换

---

## 七、总结

### Q29：用一句话总结这次迁移？

**A：** 这次迁移的核心是**"通过兼容层和渐进式改造，把基于 Vue 2 + Webpack 3 的老项目平滑升级到 Vue 3 + Vite，同时解决 ESM 化、环境变量、路由动态加载、UI 库替换等关键兼容问题"**。

---

### Q30：面试官如果只听一个亮点，你会讲什么？

**A：** 我会讲**路由循环依赖的解耦和 Vue Router 4 的 name 唯一性处理**。

因为这个问题表面上是路由报错，实际上涉及 ESM 模块初始化顺序、store 与 router 的依赖关系、后端菜单数据结构设计，以及 Vue Router 4 更严格的校验。通过抽离 `constants.js` 和动态生成唯一 name，既解决了报错，又保证了菜单渲染和路由跳转的兼容性，体现了对框架机制和项目架构的理解。
