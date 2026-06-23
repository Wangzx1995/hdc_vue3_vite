const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname, 'src/views/layout/headbar.vue');
let content = fs.readFileSync(file, 'utf-8');

// 移除 .second-name 内部没有指令的 <template> 包装
const original = `                                        <div
                                            v-for="secondMenu in firstMenu.children"
                                            :key="secondMenu.id"
                                            class="second-name"
                                        >
                                            <template>
                                                <p>
                                                    {{
                                                        getMenuTitle(secondMenu)
                                                    }}
                                                </p>
                                                <div
                                                    v-for="thirdMenu in secondMenu.children"
                                                    :key="thirdMenu.id"
                                                >
                                                    <span
                                                        v-if="!thirdMenu.hidden"
                                                        @click="
                                                            goRouter(index + '')
                                                        "
                                                    >
                                                        <p
                                                            v-if="
                                                                thirdMenu.menuType ==
                                                                1
                                                            "
                                                        >
                                                            {{
                                                                getMenuTitle(
                                                                    thirdMenu,
                                                                )
                                                            }}
                                                        </p>
                                                        <router-link
                                                            v-else
                                                            :class="{
                                                                avtive:
                                                                    $route.path ===
                                                                    thirdMenu.path,
                                                            }"
                                                            :to="thirdMenu.path"
                                                            >{{
                                                                getMenuTitle(
                                                                    thirdMenu,
                                                                )
                                                            }}
                                                        </router-link>
                                                    </span>
                                                </div>
                                            </template>
                                        </div>`;

const replacement = `                                        <div
                                            v-for="secondMenu in firstMenu.children"
                                            :key="secondMenu.id"
                                            class="second-name"
                                        >
                                            <p>
                                                {{
                                                    getMenuTitle(secondMenu)
                                                }}
                                            </p>
                                            <div
                                                v-for="thirdMenu in secondMenu.children"
                                                :key="thirdMenu.id"
                                            >
                                                <span
                                                    v-if="!thirdMenu.hidden"
                                                    @click="
                                                        goRouter(index + '')
                                                    "
                                                >
                                                    <p
                                                        v-if="
                                                            thirdMenu.menuType ==
                                                            1
                                                        "
                                                    >
                                                        {{
                                                            getMenuTitle(
                                                                thirdMenu,
                                                            )
                                                        }}
                                                    </p>
                                                    <router-link
                                                        v-else
                                                        :class="{
                                                            avtive:
                                                                $route.path ===
                                                                thirdMenu.path,
                                                        }"
                                                        :to="thirdMenu.path"
                                                        >{{
                                                            getMenuTitle(
                                                                thirdMenu,
                                                            )
                                                        }}
                                                    </router-link>
                                                </span>
                                            </div>
                                        </div>`;

if (!content.includes(original)) {
    console.log('Original block not found, checking if already fixed...');
    if (content.includes(replacement)) {
        console.log('Already fixed.');
        process.exit(0);
    }
    console.error('Cannot find target block.');
    process.exit(1);
}

content = content.replace(original, replacement);
fs.writeFileSync(file, content, 'utf-8');
console.log('Fixed headbar.vue template wrapper.');
