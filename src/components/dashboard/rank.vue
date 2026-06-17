<template>
    <div class="rank p-r-md">
        <div layout class="item">
            <p class="_700">{{ rankDatas.title }}</p>
            <span
                v-if="
                    Number(rankDatas.rankData.avg) != null &&
                    Number(rankDatas.rankData.avg) >= 0
                "
            >
                <span v-show="rankDatas.titleType == 1">
                    <!-- 平均 -->
                    {{ $t("dashboard.average") }}：
                    {{ Number(rankDatas.rankData.avg).toFixed(2) }}
                    <!-- 天 -->
                    {{ $t("dashboard.day") }}
                </span>
                <span v-show="rankDatas.titleType == 2">
                    <!-- 平均 -->
                    {{ $t("dashboard.average") }}：
                    {{ Number(rankDatas.rankData.avg).toFixed(2) }}
                    <!-- 次 -->
                    {{ $t("dashboard.order") }}
                </span>
                <span v-show="rankDatas.titleType == 3">
                    <!-- 平均 -->
                    {{ $t("dashboard.average") }}：
                    {{ Number(rankDatas.rankData.avg).toFixed(2) }}
                    <!-- 小时 -->
                    {{ $t("dashboard.hour") }}
                </span>
                <span v-show="rankDatas.titleType == 4">
                    <!-- 平均 -->
                    {{ $t("dashboard.average") }}：
                    {{ Number(rankDatas.rankData.avg * 100).toFixed(2) }}%</span
                >
            </span>
        </div>
        <div class="tableList">
            <el-table
                stripe
                :show-header="false"
                :data="rankDatas.rankData.list"
                style="width: 100%"
                height="328"
            >
                <el-table-column>
                    <template #default="{ $index }">
                        <span
                            :class="{ active: $index < 3 }"
                            class="circleTitle"
                            >{{ $index + 1 }}</span
                        >
                    </template>
                </el-table-column>
                <el-table-column
                    prop="plateNum"
                    label=""
                    width=""
                ></el-table-column>
                <el-table-column>
                    <template #default="{ row }">
                        <span v-show="row.deviceCode">{{
                            row.deviceCode
                        }}</span>
                        <!-- <span v-show="row.deviceCodes">{{row.deviceCodes}}</span> -->
                    </template>
                </el-table-column>
                <el-table-column>
                    <template #default="{ row }">
                        <span v-show="row.offlineDays == 0 || row.offlineDays">
                            {{ row.offlineDays }}
                            <!-- 天 -->
                            {{ $t("dashboard.day") }}
                        </span>
                        <span v-show="row.faultNum == 0 || row.faultNum">
                            {{ row.faultNum }}
                            <!-- 次 -->
                            {{ $t("dashboard.order") }}
                        </span>
                        <span
                            v-show="
                                row.onlineTimeHour == 0 || row.onlineTimeHour
                            "
                        >
                            {{ row.onlineTimeHour }}
                            <!-- 小时 -->
                            {{ $t("dashboard.hour") }}
                        </span>
                        <span
                            v-show="
                                row.trackCompletenessRate == 0 ||
                                row.trackCompletenessRate
                            "
                            >{{
                                Number(row.trackCompletenessRate * 100).toFixed(
                                    2,
                                )
                            }}%</span
                        >
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    name: "Rank",
    props: {
        rankDatas: {
            type: Object,
            default: "",
        },
    },
    data() {
        return {};
    },
};
</script>

<style lang="less" scoped>
.rank {
    height: 400px;
    overflow: auto;
    .item {
        display: flex;
        justify-content: space-between;
        & > span {
            & > span {
                padding: 2px 8px;
                width: 24px;
                height: 24px;
                background: rgb(221, 221, 221);
                border-radius: 10px;
                line-height: 24px;
                text-align: center;
                &.active {
                    background: rgb(49, 70, 89);
                    color: #ffffff;
                }
            }
        }
        ._700 {
            font-size: 18px;
            font-weight: 600;
        }
    }
    .tableList {
        margin-top: 32px;
        .circleTitle {
            display: inline-block;
            width: 24px;
            height: 24px;
            background: rgb(221, 221, 221);
            border-radius: 100%;
            line-height: 24px;
            text-align: center;
        }
        .active {
            background: rgb(49, 70, 89);
            color: #ffffff;
        }
    }
}
</style>
