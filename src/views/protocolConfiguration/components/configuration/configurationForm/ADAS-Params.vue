<template>
    <div class="configuration-form">
        <el-form
            :label-width="`${labelWidth}px`"
            :model="newForm"
            :inline="true"
            ref="form"
        >
            <el-radio-group type="simple" v-model="chanNoActive">
                <el-radio-button
                    v-for="(item, index) in AdasList"
                    :key="index"
                    :label="`通道${item.chanNo}`"
                />
            </el-radio-group>
            <div>
                <div v-for="(chanNoItem, index) in AdasList" :key="index">
                    <div v-show="`通道${chanNoItem.chanNo}` === chanNoActive">
                        <div v-if="newForm[`param903_${chanNoItem.chanNo}`]">
                            <h3>相机参数设置</h3>
                            <el-form-item
                                label="垂直距离"
                                v-if="
                                    chanNoItem.calibration &&
                                    chanNoItem.calibration.verticalDistance
                                "
                            >
                                <template #label
                                    ><span class="label-slot"
                                        >垂直距离
                                        <el-tooltip
                                            content="相机镜头距离地面高度"
                                        >
                                            <i
                                                class="el-icon-question"
                                            ></i> </el-tooltip></span
                                ></template>
                                <el-input-number
                                    :precision="0"
                                    controls-position="right"
                                    v-model="
                                        newForm[`param903_${chanNoItem.chanNo}`]
                                            .verticalDistance
                                    "
                                    :min="
                                        chanNoItem.calibration.verticalDistance
                                            .min
                                    "
                                    :max="
                                        chanNoItem.calibration.verticalDistance
                                            .max
                                    "
                                    data-unit="cm"
                                    @blur="
                                        (e) => {
                                            if (e.target.value === '') {
                                                newForm[
                                                    `param903_${chanNoItem.chanNo}`
                                                ].verticalDistance = Number(
                                                    e.target.ariaValueMin,
                                                );
                                            }
                                        }
                                    "
                                ></el-input-number>
                            </el-form-item>
                            <el-form-item
                                label="车头距离"
                                v-if="
                                    chanNoItem.calibration &&
                                    chanNoItem.calibration.headerDistance
                                "
                            >
                                <template #label
                                    ><span class="label-slot"
                                        >车头距离
                                        <el-tooltip
                                            content="相机镜头距离车头距离"
                                        >
                                            <i
                                                class="el-icon-question"
                                            ></i> </el-tooltip></span
                                ></template>
                                <el-input-number
                                    :precision="0"
                                    controls-position="right"
                                    v-model="
                                        newForm[`param903_${chanNoItem.chanNo}`]
                                            .headerDistance
                                    "
                                    :min="
                                        chanNoItem.calibration.headerDistance
                                            .min
                                    "
                                    :max="
                                        chanNoItem.calibration.headerDistance
                                            .max
                                    "
                                    data-unit="cm"
                                    @blur="
                                        (e) => {
                                            if (e.target.value === '') {
                                                newForm[
                                                    `param903_${chanNoItem.chanNo}`
                                                ].headerDistance = Number(
                                                    e.target.ariaValueMin,
                                                );
                                            }
                                        }
                                    "
                                ></el-input-number>
                            </el-form-item>
                            <el-form-item
                                label="左轮距离"
                                v-if="
                                    chanNoItem.calibration &&
                                    chanNoItem.calibration.leftWheelDistance
                                "
                            >
                                <template #label
                                    ><span class="label-slot"
                                        >左轮距离
                                        <el-tooltip
                                            content="相机镜头距离左前车轮外沿的水平距离"
                                        >
                                            <i
                                                class="el-icon-question"
                                            ></i> </el-tooltip></span
                                ></template>
                                <el-input-number
                                    :precision="0"
                                    controls-position="right"
                                    v-model="
                                        newForm[`param903_${chanNoItem.chanNo}`]
                                            .leftWheelDistance
                                    "
                                    :min="
                                        chanNoItem.calibration.leftWheelDistance
                                            .min
                                    "
                                    :max="
                                        chanNoItem.calibration.leftWheelDistance
                                            .max
                                    "
                                    data-unit="cm"
                                    @blur="
                                        (e) => {
                                            if (e.target.value === '') {
                                                newForm[
                                                    `param903_${chanNoItem.chanNo}`
                                                ].leftWheelDistance = Number(
                                                    e.target.ariaValueMin,
                                                );
                                            }
                                        }
                                    "
                                ></el-input-number>
                            </el-form-item>
                            <el-form-item
                                label="右轮距离"
                                v-if="
                                    chanNoItem.calibration &&
                                    chanNoItem.calibration.rightWheelDistance
                                "
                            >
                                <template #label
                                    ><span class="label-slot"
                                        >右轮距离
                                        <el-tooltip
                                            content="相机镜头距离右前车轮外沿的水平距离"
                                        >
                                            <i
                                                class="el-icon-question"
                                            ></i> </el-tooltip></span
                                ></template>
                                <el-input-number
                                    :precision="0"
                                    controls-position="right"
                                    v-model="
                                        newForm[`param903_${chanNoItem.chanNo}`]
                                            .rightWheelDistance
                                    "
                                    :min="
                                        chanNoItem.calibration
                                            .rightWheelDistance.min
                                    "
                                    :max="
                                        chanNoItem.calibration
                                            .rightWheelDistance.max
                                    "
                                    data-unit="cm"
                                    @blur="
                                        (e) => {
                                            if (e.target.value === '') {
                                                newForm[
                                                    `param903_${chanNoItem.chanNo}`
                                                ].rightWheelDistance = Number(
                                                    e.target.ariaValueMin,
                                                );
                                            }
                                        }
                                    "
                                ></el-input-number>
                            </el-form-item>
                            <el-form-item
                                label="车头占比"
                                v-if="
                                    chanNoItem.calibration &&
                                    chanNoItem.calibration.headerLinePercent
                                "
                            >
                                <template #label
                                    ><span class="label-slot"
                                        >车头占比
                                        <el-tooltip
                                            content="车头部分在相机中的占比"
                                        >
                                            <i
                                                class="el-icon-question"
                                            ></i> </el-tooltip></span
                                ></template>
                                <el-input-number
                                    :precision="0"
                                    controls-position="right"
                                    v-model="
                                        newForm[`param903_${chanNoItem.chanNo}`]
                                            .headerLinePercent
                                    "
                                    :min="
                                        chanNoItem.calibration.headerLinePercent
                                            .min
                                    "
                                    :max="
                                        chanNoItem.calibration.headerLinePercent
                                            .max
                                    "
                                    data-unit="%"
                                    @blur="
                                        (e) => {
                                            if (e.target.value === '') {
                                                newForm[
                                                    `param903_${chanNoItem.chanNo}`
                                                ].headerLinePercent = Number(
                                                    e.target.ariaValueMin,
                                                );
                                            }
                                        }
                                    "
                                ></el-input-number>
                            </el-form-item>
                        </div>
                        <div v-if="newForm[`param2205_1_horizonVanishLine`]">
                            <h3>消隐线设置</h3>
                            <el-form-item label="消隐线">
                                <el-button
                                    @click="
                                        openSurvey({
                                            chanNo: chanNoItem.chanNo,
                                        })
                                    "
                                    >设置
                                </el-button>
                            </el-form-item>
                        </div>
                        <div
                            v-if="
                                newForm[
                                    `param901_${chanNoItem.chanNo}_${firstType}`
                                ]
                            "
                        >
                            <h3>ADAS全局参数</h3>
                            <el-form-item
                                label="ADAS算法使能"
                                v-if="
                                    newForm[
                                        `param901_${chanNoItem.chanNo}_${firstType}`
                                    ].hasOwnProperty('enable')
                                "
                            >
                                <h-switch
                                    v-model="
                                        newForm[
                                            `param901_${chanNoItem.chanNo}_${firstType}`
                                        ].enable
                                    "
                                    :active-value="Number(1)"
                                    :inactive-value="Number(0)"
                                    :before-change="
                                        (value, done) =>
                                            beforeChange(value, done)
                                    "
                                    @change="
                                        (val) => enableChange(val, chanNoItem)
                                    "
                                ></h-switch>
                            </el-form-item>
                            <el-form-item
                                label="ADAS全局音量配置"
                                v-if="
                                    newForm[
                                        `param901_${chanNoItem.chanNo}_${firstType}`
                                    ].enable
                                "
                            >
                                <el-button
                                    @click="openDialog(chanNoItem)"
                                    style="width: 100%"
                                    >ADAS全局音量配置</el-button
                                >
                            </el-form-item>
                            <el-form-item
                                label="联动抓拍的通道"
                                v-if="
                                    chanNoItem.linkChannel &&
                                    chanNoItem.linkChannel.length &&
                                    chanNoItem.maxLinkChannel
                                "
                            >
                                <el-select
                                    v-model="
                                        newForm[
                                            `param901_${chanNoItem.chanNo}_${firstType}`
                                        ].linkChannel
                                    "
                                    :multiple-limit="
                                        chanNoItem.maxLinkChannel || 0
                                    "
                                    multiple
                                    collapse-tags
                                >
                                    <el-option
                                        v-for="item in chanNoItem.linkChannel"
                                        :label="`通道${item}`"
                                        :value="item"
                                        :key="item"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <el-collapse
                            v-if="
                                newForm[
                                    `param901_${chanNoItem.chanNo}_${firstType}`
                                ] &&
                                newForm[
                                    `param901_${chanNoItem.chanNo}_${firstType}`
                                ].enable
                            "
                            v-model="activeCollapse"
                            @change="collapseChange"
                        >
                            <el-collapse-item
                                v-for="(infoItem, key) in chanNoItem.info"
                                :key="key"
                                :title="key.split('-')[1]"
                                :name="key.split('-')[1]"
                                arrowPlacement="right"
                                :class="{
                                    'template-hide': setTemplateHide(
                                        chanNoItem,
                                        infoItem,
                                    ),
                                }"
                            >
                                <div
                                    v-for="(levelItem, index2) in infoItem"
                                    :key="index2"
                                >
                                    <template
                                        v-if="
                                            newForm[
                                                `param901_${chanNoItem.chanNo}_${levelItem.type}`
                                            ]
                                        "
                                    >
                                        <h3>
                                            {{
                                                index2 === 0
                                                    ? "一级报警"
                                                    : "二级报警"
                                            }}
                                            <template
                                                v-if="
                                                    infoItem.length > 1 &&
                                                    levelItem.speed
                                                "
                                            >
                                                <i class="el-icon-warning"></i>
                                                <span class="warning-msg"
                                                    >二级报警的判断速度阈值必须比一级报警的判断速度阈值≥20</span
                                                >
                                            </template>
                                        </h3>
                                        <el-form-item
                                            label="报警使能"
                                            v-if="levelItem.enable"
                                        >
                                            <el-switch
                                                v-model="
                                                    newForm[
                                                        `param901_${chanNoItem.chanNo}_${levelItem.type}`
                                                    ].info[0].enable
                                                "
                                                :active-value="Number(1)"
                                                :inactive-value="Number(0)"
                                            ></el-switch>
                                        </el-form-item>
                                        <el-form-item
                                            label="报警判断速度阈值"
                                            v-if="levelItem.speed"
                                        >
                                            <el-input-number
                                                :precision="0"
                                                controls-position="right"
                                                v-model="
                                                    newForm[
                                                        `param901_${chanNoItem.chanNo}_${levelItem.type}`
                                                    ].info[0].speed
                                                "
                                                :min="levelItem.speed.min"
                                                :max="levelItem.speed.max"
                                                @change="
                                                    (e) =>
                                                        speedBlur(
                                                            chanNoItem,
                                                            key,
                                                        )
                                                "
                                                data-unit="km/h"
                                                @blur="
                                                    (e) => {
                                                        if (
                                                            e.target.value ===
                                                            ''
                                                        ) {
                                                            newForm[
                                                                `param901_${chanNoItem.chanNo}_${levelItem.type}`
                                                            ].info[0].speed =
                                                                Number(
                                                                    e.target
                                                                        .ariaValueMin,
                                                                );
                                                        }
                                                    }
                                                "
                                            ></el-input-number>
                                        </el-form-item>
                                        <el-form-item
                                            label="算法置信度"
                                            v-if="levelItem.confidence"
                                        >
                                            <template #label
                                                ><span class="label-slot"
                                                    >算法置信度
                                                    <el-tooltip
                                                        content="置信度越高，检出越低检准越高"
                                                    >
                                                        <i
                                                            class="el-icon-question"
                                                        ></i> </el-tooltip></span
                                            ></template>
                                            <el-select
                                                v-model="
                                                    newForm[
                                                        `param901_${chanNoItem.chanNo}_${levelItem.type}`
                                                    ].info[0].confidence
                                                "
                                            >
                                                <el-option
                                                    v-for="item in levelItem.confidenceList"
                                                    :label="item.label"
                                                    :value="item.value"
                                                    :key="item.value"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item
                                            label="算法灵敏度"
                                            introduction="灵敏度越高越容易触发报警"
                                            v-if="levelItem.sensitivity"
                                        >
                                            <template #label
                                                ><span class="label-slot"
                                                    >算法灵敏度
                                                    <el-tooltip
                                                        content="灵敏度越高越容易触发报警"
                                                    >
                                                        <i
                                                            class="el-icon-question"
                                                        ></i> </el-tooltip></span
                                            ></template>
                                            <el-select
                                                v-model="
                                                    newForm[
                                                        `param901_${chanNoItem.chanNo}_${levelItem.type}`
                                                    ].info[0].sensitivity
                                                "
                                            >
                                                <el-option
                                                    v-for="item in levelItem.sensitivityList"
                                                    :label="item.label"
                                                    :value="item.value"
                                                    :key="item.value"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item
                                            label="音量使能"
                                            v-if="levelItem.volumeEnable"
                                        >
                                            <el-switch
                                                v-model="
                                                    newForm[
                                                        `param901_${chanNoItem.chanNo}_${levelItem.type}`
                                                    ].info[0].volumeEnable
                                                "
                                                :active-value="Number(1)"
                                                :inactive-value="Number(0)"
                                            ></el-switch>
                                        </el-form-item>
                                        <el-form-item
                                            label="报警音量"
                                            v-if="levelItem.volume"
                                        >
                                            <el-input-number
                                                :precision="0"
                                                controls-position="right"
                                                v-model="
                                                    newForm[
                                                        `param901_${chanNoItem.chanNo}_${levelItem.type}`
                                                    ].info[0].volume
                                                "
                                                :min="levelItem.volume.min"
                                                :max="levelItem.volume.max"
                                                @blur="
                                                    (e) => {
                                                        if (
                                                            e.target.value ===
                                                            ''
                                                        ) {
                                                            newForm[
                                                                `param901_${chanNoItem.chanNo}_${levelItem.type}`
                                                            ].info[0].volume =
                                                                Number(
                                                                    e.target
                                                                        .ariaValueMin,
                                                                );
                                                        }
                                                    }
                                                "
                                            ></el-input-number>
                                        </el-form-item>
                                        <el-form-item
                                            label="抓图张数"
                                            v-if="
                                                levelItem.snapshot &&
                                                levelItem.snapshot.number
                                            "
                                        >
                                            <el-input-number
                                                :precision="0"
                                                controls-position="right"
                                                v-model="
                                                    newForm[
                                                        `param901_${chanNoItem.chanNo}_${levelItem.type}`
                                                    ].info[0].snapshot.number
                                                "
                                                :min="
                                                    levelItem.snapshot.number
                                                        .min
                                                "
                                                :max="
                                                    levelItem.snapshot.number
                                                        .max
                                                "
                                                data-unit="张"
                                                @blur="
                                                    (e) => {
                                                        if (
                                                            e.target.value ===
                                                            ''
                                                        ) {
                                                            newForm[
                                                                `param901_${chanNoItem.chanNo}_${levelItem.type}`
                                                            ].info[0].snapshot.number =
                                                                Number(
                                                                    e.target
                                                                        .ariaValueMin,
                                                                );
                                                        }
                                                    }
                                                "
                                            ></el-input-number>
                                        </el-form-item>
                                        <el-form-item
                                            label="抓图间隔"
                                            v-if="
                                                levelItem.snapshot &&
                                                levelItem.snapshot.interval
                                            "
                                        >
                                            <el-select
                                                v-model="
                                                    newForm[
                                                        `param901_${chanNoItem.chanNo}_${levelItem.type}`
                                                    ].info[0].snapshot.interval
                                                "
                                            >
                                                <el-option
                                                    v-for="item in levelItem
                                                        .snapshot.interval"
                                                    :label="`${item * 100}毫秒`"
                                                    :value="item"
                                                    :key="item"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item
                                            label="报警短视频前半部分时长"
                                            v-if="
                                                levelItem.clip &&
                                                levelItem.clip.perRecord
                                            "
                                        >
                                            <el-input-number
                                                :precision="0"
                                                controls-position="right"
                                                v-model="
                                                    newForm[
                                                        `param901_${chanNoItem.chanNo}_${levelItem.type}`
                                                    ].info[0].clip.perRecord
                                                "
                                                :min="
                                                    levelItem.clip.perRecord.min
                                                "
                                                :max="
                                                    levelItem.clip.perRecord.max
                                                "
                                                data-unit="s"
                                                @blur="
                                                    (e) => {
                                                        if (
                                                            e.target.value ===
                                                            ''
                                                        ) {
                                                            newForm[
                                                                `param901_${chanNoItem.chanNo}_${levelItem.type}`
                                                            ].info[0].clip.perRecord =
                                                                Number(
                                                                    e.target
                                                                        .ariaValueMin,
                                                                );
                                                        }
                                                    }
                                                "
                                            ></el-input-number>
                                        </el-form-item>
                                        <el-form-item
                                            label="报警短视频后半部分时长"
                                            v-if="
                                                levelItem.clip &&
                                                levelItem.clip.afterRecord
                                            "
                                        >
                                            <el-input-number
                                                :precision="0"
                                                controls-position="right"
                                                v-model="
                                                    newForm[
                                                        `param901_${chanNoItem.chanNo}_${levelItem.type}`
                                                    ].info[0].clip.afterRecord
                                                "
                                                :min="
                                                    levelItem.clip.afterRecord
                                                        .min
                                                "
                                                :max="
                                                    levelItem.clip.afterRecord
                                                        .max
                                                "
                                                data-unit="s"
                                                @blur="
                                                    (e) => {
                                                        if (
                                                            e.target.value ===
                                                            ''
                                                        ) {
                                                            newForm[
                                                                `param901_${chanNoItem.chanNo}_${levelItem.type}`
                                                            ].info[0].clip.afterRecord =
                                                                Number(
                                                                    e.target
                                                                        .ariaValueMin,
                                                                );
                                                        }
                                                    }
                                                "
                                            ></el-input-number>
                                        </el-form-item>
                                        <el-form-item
                                            label="报警图片上传使能"
                                            v-if="
                                                levelItem.snapshot &&
                                                levelItem.snapshot.upload
                                            "
                                        >
                                            <el-switch
                                                v-model="
                                                    newForm[
                                                        `param901_${chanNoItem.chanNo}_${levelItem.type}`
                                                    ].info[0].snapshot.upload
                                                "
                                                :active-value="Number(1)"
                                                :inactive-value="Number(0)"
                                                @change="
                                                    (val) =>
                                                        uploadChange(
                                                            val,
                                                            'snapshot',
                                                            chanNoItem.chanNo,
                                                            levelItem.type,
                                                        )
                                                "
                                            ></el-switch>
                                        </el-form-item>
                                        <el-form-item
                                            label="报警视频上传使能"
                                            v-if="
                                                levelItem.clip &&
                                                levelItem.clip.upload
                                            "
                                        >
                                            <el-switch
                                                v-model="
                                                    newForm[
                                                        `param901_${chanNoItem.chanNo}_${levelItem.type}`
                                                    ].info[0].clip.upload
                                                "
                                                :active-value="Number(1)"
                                                :inactive-value="Number(0)"
                                                @change="
                                                    (val) =>
                                                        uploadChange(
                                                            val,
                                                            'clip',
                                                            chanNoItem.chanNo,
                                                            levelItem.type,
                                                        )
                                                "
                                            ></el-switch>
                                        </el-form-item>
                                        <el-form-item
                                            label="报警抑制时间"
                                            v-if="levelItem.inhibitionTime"
                                        >
                                            <el-input-number
                                                :precision="0"
                                                controls-position="right"
                                                v-model="
                                                    newForm[
                                                        `param901_${chanNoItem.chanNo}_${levelItem.type}`
                                                    ].info[0].inhibitionTime
                                                "
                                                :min="
                                                    levelItem.inhibitionTime
                                                        .rangeMin
                                                "
                                                :max="
                                                    levelItem.inhibitionTime
                                                        .rangeMax
                                                "
                                                data-unit="s"
                                                @blur="
                                                    (e) => {
                                                        if (
                                                            e.target.value ===
                                                            ''
                                                        ) {
                                                            newForm[
                                                                `param901_${chanNoItem.chanNo}_${levelItem.type}`
                                                            ].info[0].inhibitionTime =
                                                                Number(
                                                                    e.target
                                                                        .ariaValueMin,
                                                                );
                                                        }
                                                    }
                                                "
                                            ></el-input-number>
                                        </el-form-item>
                                        <el-form-item
                                            label="事件上传平台使能"
                                            v-if="levelItem.uploadEventPlatform"
                                        >
                                            <el-select
                                                v-model="
                                                    newForm[
                                                        `param901_${chanNoItem.chanNo}_${levelItem.type}`
                                                    ].info[0]
                                                        .uploadEventPlatform
                                                "
                                                multiple
                                                collapse-tags
                                            >
                                                <el-option
                                                    v-for="item in levelItem[
                                                        'uploadEventPlatform'
                                                    ]"
                                                    :label="
                                                        Number(item) - 1 ===
                                                        Number(
                                                            capability.network
                                                                .isHikPlatform,
                                                        )
                                                            ? '海康云平台'
                                                            : '第' +
                                                              item +
                                                              '中心'
                                                    "
                                                    :value="item"
                                                    :key="item"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item
                                            label="限高"
                                            v-if="levelItem.heightLimit"
                                        >
                                            <el-input-number
                                                :precision="0"
                                                controls-position="right"
                                                v-model="
                                                    newForm[
                                                        `param901_${chanNoItem.chanNo}_${levelItem.type}`
                                                    ].info[0].heightLimit
                                                "
                                                :min="levelItem.heightLimit.min"
                                                :max="levelItem.heightLimit.max"
                                                data-unit="mm"
                                                @blur="
                                                    (e) => {
                                                        if (
                                                            e.target.value ===
                                                            ''
                                                        ) {
                                                            newForm[
                                                                `param901_${chanNoItem.chanNo}_${levelItem.type}`
                                                            ].info[0].heightLimit =
                                                                Number(
                                                                    e.target
                                                                        .ariaValueMin,
                                                                );
                                                        }
                                                    }
                                                "
                                            ></el-input-number>
                                        </el-form-item>
                                        <el-form-item
                                            label="限重"
                                            v-if="levelItem.weightLimit"
                                        >
                                            <el-input-number
                                                :precision="0"
                                                controls-position="right"
                                                v-model="
                                                    newForm[
                                                        `param901_${chanNoItem.chanNo}_${levelItem.type}`
                                                    ].info[0].weightLimit
                                                "
                                                :min="levelItem.weightLimit.min"
                                                :max="levelItem.weightLimit.max"
                                                data-unit="kg"
                                                @blur="
                                                    (e) => {
                                                        if (
                                                            e.target.value ===
                                                            ''
                                                        ) {
                                                            newForm[
                                                                `param901_${chanNoItem.chanNo}_${levelItem.type}`
                                                            ].info[0].weightLimit =
                                                                Number(
                                                                    e.target
                                                                        .ariaValueMin,
                                                                );
                                                        }
                                                    }
                                                "
                                            ></el-input-number>
                                        </el-form-item>
                                        <el-form-item
                                            label="方向盘角度"
                                            v-if="levelItem.wheelAngle"
                                        >
                                            <el-input-number
                                                :precision="0"
                                                controls-position="right"
                                                v-model="
                                                    newForm[
                                                        `param901_${chanNoItem.chanNo}_${levelItem.type}`
                                                    ].info[0].wheelAngle
                                                "
                                                :min="
                                                    levelItem.wheelAngle
                                                        .rangeMin
                                                "
                                                :max="
                                                    levelItem.wheelAngle
                                                        .rangeMax
                                                "
                                                data-unit="°"
                                                @blur="
                                                    (e) => {
                                                        if (
                                                            e.target.value ===
                                                            ''
                                                        ) {
                                                            newForm[
                                                                `param901_${chanNoItem.chanNo}_${levelItem.type}`
                                                            ].info[0].wheelAngle =
                                                                Number(
                                                                    e.target
                                                                        .ariaValueMin,
                                                                );
                                                        }
                                                    }
                                                "
                                            ></el-input-number>
                                        </el-form-item>
                                        <el-form-item
                                            label="本车超过本车道线的距离"
                                            v-if="levelItem.distanceBeyongLane"
                                        >
                                            <el-input-number
                                                :precision="0"
                                                controls-position="right"
                                                v-model="
                                                    newForm[
                                                        `param901_${chanNoItem.chanNo}_${levelItem.type}`
                                                    ].info[0].distanceBeyongLane
                                                "
                                                :min="
                                                    levelItem.distanceBeyongLane
                                                        .rangeMin / 1000
                                                "
                                                :max="
                                                    levelItem.distanceBeyongLane
                                                        .rangeMax / 1000
                                                "
                                                data-unit="m"
                                                @blur="
                                                    (e) => {
                                                        if (
                                                            e.target.value ===
                                                            ''
                                                        ) {
                                                            newForm[
                                                                `param901_${chanNoItem.chanNo}_${levelItem.type}`
                                                            ].info[0].distanceBeyongLane =
                                                                Number(
                                                                    e.target
                                                                        .ariaValueMin,
                                                                );
                                                        }
                                                    }
                                                "
                                            ></el-input-number>
                                        </el-form-item>
                                        <el-form-item
                                            label="距离相邻车的距离"
                                            v-if="levelItem.nearCarDistance"
                                        >
                                            <el-input-number
                                                :precision="0"
                                                controls-position="right"
                                                v-model="
                                                    newForm[
                                                        `param901_${chanNoItem.chanNo}_${levelItem.type}`
                                                    ].info[0].nearCarDistance
                                                "
                                                :min="
                                                    levelItem.nearCarDistance
                                                        .rangeMin / 1000
                                                "
                                                :max="
                                                    levelItem.nearCarDistance
                                                        .rangeMax / 1000
                                                "
                                                data-unit="m"
                                                @blur="
                                                    (e) => {
                                                        if (
                                                            e.target.value ===
                                                            ''
                                                        ) {
                                                            newForm[
                                                                `param901_${chanNoItem.chanNo}_${levelItem.type}`
                                                            ].info[0].nearCarDistance =
                                                                Number(
                                                                    e.target
                                                                        .ariaValueMin,
                                                                );
                                                        }
                                                    }
                                                "
                                            ></el-input-number>
                                        </el-form-item>
                                        <el-form-item
                                            label="刹车抑制"
                                            v-if="levelItem.brakeSuppression"
                                        >
                                            <el-switch
                                                v-model="
                                                    newForm[
                                                        `param901_${chanNoItem.chanNo}_${levelItem.type}`
                                                    ].info[0].brakeSuppression
                                                "
                                                :active-value="Number(1)"
                                                :inactive-value="Number(0)"
                                            ></el-switch>
                                        </el-form-item>
                                        <el-form-item
                                            label="刹车抑制时间"
                                            v-if="
                                                levelItem.brakeSuppressionTime
                                            "
                                        >
                                            <el-input-number
                                                :precision="0"
                                                controls-position="right"
                                                v-model="
                                                    newForm[
                                                        `param901_${chanNoItem.chanNo}_${levelItem.type}`
                                                    ].info[0]
                                                        .brakeSuppressionTime
                                                "
                                                :min="
                                                    levelItem
                                                        .brakeSuppressionTime
                                                        .rangeMin
                                                "
                                                :max="
                                                    levelItem
                                                        .brakeSuppressionTime
                                                        .rangeMax
                                                "
                                                data-unit="s"
                                                @blur="
                                                    (e) => {
                                                        if (
                                                            e.target.value ===
                                                            ''
                                                        ) {
                                                            newForm[
                                                                `param901_${chanNoItem.chanNo}_${levelItem.type}`
                                                            ].info[0].brakeSuppressionTime =
                                                                Number(
                                                                    e.target
                                                                        .ariaValueMin,
                                                                );
                                                        }
                                                    }
                                                "
                                            ></el-input-number>
                                        </el-form-item>
                                        <el-form-item
                                            label="碰撞报警前方物体距离"
                                            v-if="levelItem.collisionDistance"
                                        >
                                            <el-input-number
                                                :precision="0"
                                                controls-position="right"
                                                v-model="
                                                    newForm[
                                                        `param901_${chanNoItem.chanNo}_${levelItem.type}`
                                                    ].info[0].collisionDistance
                                                "
                                                :min="
                                                    levelItem.collisionDistance
                                                        .rangeMin / 1000
                                                "
                                                :max="
                                                    levelItem.collisionDistance
                                                        .rangeMax / 1000
                                                "
                                                data-unit="m"
                                                @blur="
                                                    (e) => {
                                                        if (
                                                            e.target.value ===
                                                            ''
                                                        ) {
                                                            newForm[
                                                                `param901_${chanNoItem.chanNo}_${levelItem.type}`
                                                            ].info[0].collisionDistance =
                                                                Number(
                                                                    e.target
                                                                        .ariaValueMin,
                                                                );
                                                        }
                                                    }
                                                "
                                            ></el-input-number>
                                        </el-form-item>
                                        <el-form-item
                                            label="碰撞报警加速度"
                                            v-if="
                                                levelItem.collisionAccelerationi
                                            "
                                        >
                                            <el-input-number
                                                :precision="0"
                                                controls-position="right"
                                                v-model="
                                                    newForm[
                                                        `param901_${chanNoItem.chanNo}_${levelItem.type}`
                                                    ].info[0]
                                                        .collisionAccelerationi
                                                "
                                                :min="
                                                    levelItem
                                                        .collisionAccelerationi
                                                        .rangeMin
                                                "
                                                :max="
                                                    levelItem
                                                        .collisionAccelerationi
                                                        .rangeMax
                                                "
                                                data-unit="m/s²"
                                                @blur="
                                                    (e) => {
                                                        if (
                                                            e.target.value ===
                                                            ''
                                                        ) {
                                                            newForm[
                                                                `param901_${chanNoItem.chanNo}_${levelItem.type}`
                                                            ].info[0].collisionAccelerationi =
                                                                Number(
                                                                    e.target
                                                                        .ariaValueMin,
                                                                );
                                                        }
                                                    }
                                                "
                                            ></el-input-number>
                                        </el-form-item>
                                        <el-form-item
                                            label="联动抓拍的通道"
                                            v-if="
                                                levelItem.snapshot &&
                                                levelItem.snapshot
                                                    .linkChannel &&
                                                levelItem.snapshot.linkChannel
                                                    .length
                                            "
                                        >
                                            <el-select
                                                v-model="
                                                    newForm[
                                                        `param901_${chanNoItem.chanNo}_${levelItem.type}`
                                                    ].info[0].snapshot
                                                        .linkChannel
                                                "
                                                :multiple-limit="
                                                    levelItem.snapshot
                                                        .maxLinkChannel || 0
                                                "
                                                multiple
                                                collapse-tags
                                            >
                                                <el-option
                                                    v-for="item in levelItem
                                                        .snapshot.linkChannel"
                                                    :label="`通道${item}`"
                                                    :value="item"
                                                    :key="item"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </template>
                                </div>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                </div>
            </div>
        </el-form>
        <el-dialog
            title="ADAS全局音量调整"
            v-model="dialogVisible"
            @close="close"
            :append-to-body="true"
        >
            <div class="p-a-md">
                <p class="m-b-sm">
                    点击确定后ADAS所有报警项音量将调整为单项报警音量值（超出单项报警阈值范围将按阈值范围设定）,下发至终端成功后生效。
                </p>
                <el-slider
                    v-model="globalVolume"
                    :min="0"
                    :max="100"
                    :step="1"
                    show-input
                ></el-slider>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="send">确 定</el-button>
                    <el-button @click="close">取 消</el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog
            title="消隐线"
            v-model="openSurveyBol"
            :before-close="handleClose"
            append-to-body
        >
            <div class="divHeight" v-if="openSurveyBol && !isPlugin">
                <ADASNoPlugin
                    v-if="openSurveyBol"
                    ref="ADASNoPlugin"
                    :playUrl="playUrl"
                    @cancelSurveyBol="cancelSurveyBol"
                    @saveSurveyBol="saveSurveyBol"
                    :isTemplate="isTemplate"
                    :isAdas="isAdas"
                    :horizonVanishLine="AdasList[0].horizonVanishLine"
                    :verticalVanishLine="AdasList[0].verticalVanishLine"
                ></ADASNoPlugin>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import mixins from "@/mixins/mixins";
import ADASNoPlugin from "@/components/webControlService/configuration/adas.vue";
export default {
    name: "ADAS-Params",
    mixins: [mixins],
    components: { ADASNoPlugin },
    props: {},
    data() {
        return {
            componentsName: "platformParams",
            setForm: {},
            chanNoActive: "",
            AdasList: [],
            dialogVisible: false,
            globalVolume: 0,
            volumeItem: {},
            activeCollapse: [],
            typeObj: {},
            firstType: null,
            openSurveyBol: false,
            isPlugin: false,
            playUrl: "",
            isAdas: false,
        };
    },
    activated() {
        this.$nextTick(() => {
            this.labelWidthResize();
        });
    },
    mounted() {
        this.initConfig();
    },
    computed: {
        setTemplateHide() {
            return function (chanNoItem, infoItem) {
                if (this.isTemplate || this.$route.query.isTemplate) {
                    let bol = false;
                    infoItem.forEach((infoItem) => {
                        if (
                            this.newForm[
                                `param901_${chanNoItem.chanNo}_${infoItem.type}`
                            ]
                        ) {
                            bol = true;
                        }
                    });
                    return !bol;
                } else {
                    return false;
                }
            };
        },
    },
    watch: {
        chanNoActive(val) {
            this.activeCollapse = [];
            let obj = this.AdasList.find(
                (item) => item.chanNo == Number(val.split("通道")[1]),
            );
            for (let key of Object.keys(obj.info)) {
                if (!this.activeCollapse.length) {
                    this.activeCollapse.push(key.split("-")[1]);
                }
            }
        },
        openSurveyBol: {
            handler(newVal) {
                if (!newVal) {
                    this.SurveyBol();
                }
            },
        },
        newForm: {
            handler(val) {
                if (val) {
                    this.AdasList.forEach((chanNoItem) => {
                        let _type = Object.entries(chanNoItem.info)[0][0].split(
                            "-",
                        )[0];
                        if (val[`param903_${chanNoItem.chanNo}`]) {
                            if (
                                !this.setForm.hasOwnProperty(
                                    `通道${chanNoItem.chanNo}>相机参数设置&param903_${chanNoItem.chanNo}`,
                                )
                            ) {
                                this.setForm[
                                    `通道${chanNoItem.chanNo}>相机参数设置&param903_${chanNoItem.chanNo}`
                                ] = {};
                            }
                            this.setForm[
                                `通道${chanNoItem.chanNo}>相机参数设置&param903_${chanNoItem.chanNo}`
                            ].verticalDistance =
                                val[`param903_${chanNoItem.chanNo}`]
                                    .verticalDistance !=
                                this.oldForm[`param903_${chanNoItem.chanNo}`]
                                    .verticalDistance
                                    ? `param903_${
                                          chanNoItem.chanNo
                                      }.verticalDistance&垂直距离number&${
                                          val[`param903_${chanNoItem.chanNo}`]
                                              .verticalDistance
                                      }`
                                    : null;
                            this.setForm[
                                `通道${chanNoItem.chanNo}>相机参数设置&param903_${chanNoItem.chanNo}`
                            ].headerDistance =
                                val[`param903_${chanNoItem.chanNo}`]
                                    .headerDistance !=
                                this.oldForm[`param903_${chanNoItem.chanNo}`]
                                    .headerDistance
                                    ? `param903_${
                                          chanNoItem.chanNo
                                      }.headerDistance&车头距离number&${
                                          val[`param903_${chanNoItem.chanNo}`]
                                              .headerDistance
                                      }`
                                    : null;
                            this.setForm[
                                `通道${chanNoItem.chanNo}>相机参数设置&param903_${chanNoItem.chanNo}`
                            ].leftWheelDistance =
                                val[`param903_${chanNoItem.chanNo}`]
                                    .leftWheelDistance !=
                                this.oldForm[`param903_${chanNoItem.chanNo}`]
                                    .leftWheelDistance
                                    ? `param903_${
                                          chanNoItem.chanNo
                                      }.leftWheelDistance&左轮距离number&${
                                          val[`param903_${chanNoItem.chanNo}`]
                                              .leftWheelDistance
                                      }`
                                    : null;
                            this.setForm[
                                `通道${chanNoItem.chanNo}>相机参数设置&param903_${chanNoItem.chanNo}`
                            ].rightWheelDistance =
                                val[`param903_${chanNoItem.chanNo}`]
                                    .rightWheelDistance !=
                                this.oldForm[`param903_${chanNoItem.chanNo}`]
                                    .rightWheelDistance
                                    ? `param903_${
                                          chanNoItem.chanNo
                                      }.rightWheelDistance&右轮距离number&${
                                          val[`param903_${chanNoItem.chanNo}`]
                                              .rightWheelDistance
                                      }`
                                    : null;
                            this.setForm[
                                `通道${chanNoItem.chanNo}>相机参数设置&param903_${chanNoItem.chanNo}`
                            ].headerLinePercent =
                                val[`param903_${chanNoItem.chanNo}`]
                                    .headerLinePercent !=
                                this.oldForm[`param903_${chanNoItem.chanNo}`]
                                    .headerLinePercent
                                    ? `param903_${
                                          chanNoItem.chanNo
                                      }.headerLinePercent&车头占比number&${
                                          val[`param903_${chanNoItem.chanNo}`]
                                              .headerLinePercent
                                      }`
                                    : null;
                        }
                        if (val[`param901_${chanNoItem.chanNo}_${_type}`]) {
                            if (
                                !this.setForm.hasOwnProperty(
                                    `通道${chanNoItem.chanNo}>ADAS全局参数&param901_${chanNoItem.chanNo}_${_type}`,
                                )
                            ) {
                                this.setForm[
                                    `通道${chanNoItem.chanNo}>ADAS全局参数&param901_${chanNoItem.chanNo}_${_type}`
                                ] = {};
                            }
                            this.setForm[
                                `通道${chanNoItem.chanNo}>ADAS全局参数&param901_${chanNoItem.chanNo}_${_type}`
                            ].enable =
                                val[`param901_${chanNoItem.chanNo}_${_type}`]
                                    .enable !=
                                this.oldForm[
                                    `param901_${chanNoItem.chanNo}_${_type}`
                                ].enable
                                    ? `param901_${
                                          chanNoItem.chanNo
                                      }_${_type}.enable&ADAS算法使能switch&${
                                          val[
                                              `param901_${chanNoItem.chanNo}_${_type}`
                                          ].enable
                                      }`
                                    : null;
                            this.setForm[
                                `通道${chanNoItem.chanNo}>ADAS全局参数&param901_${chanNoItem.chanNo}_${_type}`
                            ].linkChannel = this.isEqual(
                                val[`param901_${chanNoItem.chanNo}_${_type}`]
                                    .linkChannel,
                                this.oldForm[
                                    `param901_${chanNoItem.chanNo}_${_type}`
                                ].linkChannel,
                            )
                                ? `param901_${
                                      chanNoItem.chanNo
                                  }_${_type}.linkChannel&联动抓拍的通道array&
                                  &${this.getLinkChannel(
                                      val[
                                          `param901_${chanNoItem.chanNo}_${_type}`
                                      ].linkChannel,
                                  )}&${
                                      val[
                                          `param901_${chanNoItem.chanNo}_${_type}`
                                      ].linkChannel
                                  }`
                                : null;
                        }
                        for (let typeName of Object.keys(chanNoItem.info)) {
                            chanNoItem.info[typeName].forEach((typeItem) => {
                                if (
                                    val[
                                        `param901_${chanNoItem.chanNo}_${typeItem.type}`
                                    ]
                                ) {
                                    let paramStr = `param901_${chanNoItem.chanNo}_${typeItem.type}`;
                                    let objName = `通道${
                                        chanNoItem.chanNo
                                    }>${this.getLabelByType(
                                        typeItem.type,
                                    )}&${paramStr}`;
                                    if (!this.setForm.hasOwnProperty(objName)) {
                                        this.setForm[objName] = {
                                            info: [{ snapshot: {}, clip: {} }],
                                        };
                                    }
                                    this.setForm[objName].info[0].enable =
                                        val[paramStr].info[0].enable !=
                                            this.oldForm[paramStr].info[0]
                                                .enable ||
                                        (this.isTemplate &&
                                            val[
                                                paramStr
                                            ].info[0].hasOwnProperty("enable"))
                                            ? `${paramStr}.info.0.enable&报警使能switch&${val[paramStr].info[0].enable}`
                                            : null;
                                    this.setForm[objName].info[0].speed =
                                        val[paramStr].info[0].speed !=
                                            this.oldForm[paramStr].info[0]
                                                .speed ||
                                        (this.isTemplate &&
                                            val[
                                                paramStr
                                            ].info[0].hasOwnProperty("speed"))
                                            ? `${paramStr}.info.0.speed&报警判断速度阈值number&${val[paramStr].info[0].speed}`
                                            : null;
                                    this.setForm[objName].info[0].confidence =
                                        val[paramStr].info[0].confidence !=
                                            this.oldForm[paramStr].info[0]
                                                .confidence ||
                                        (this.isTemplate &&
                                            val[
                                                paramStr
                                            ].info[0].hasOwnProperty(
                                                "confidence",
                                            ))
                                            ? `${paramStr}.info.0.confidence&算法置信度&${this.getLabelSelf(
                                                  typeItem.confidenceList,
                                                  val[paramStr].info[0]
                                                      .confidence,
                                              )}&${
                                                  val[paramStr].info[0]
                                                      .confidence
                                              }`
                                            : null;
                                    this.setForm[objName].info[0].sensitivity =
                                        val[paramStr].info[0].sensitivity !=
                                            this.oldForm[paramStr].info[0]
                                                .sensitivity ||
                                        (this.isTemplate &&
                                            val[
                                                paramStr
                                            ].info[0].hasOwnProperty(
                                                "sensitivity",
                                            ))
                                            ? `${paramStr}.info.0.sensitivity&算法灵敏度&${this.getLabelSelf(
                                                  typeItem.sensitivityList,
                                                  val[paramStr].info[0]
                                                      .sensitivity,
                                              )}&${
                                                  val[paramStr].info[0]
                                                      .sensitivity
                                              }`
                                            : null;
                                    this.setForm[objName].info[0].volumeEnable =
                                        val[paramStr].info[0].volumeEnable !=
                                            this.oldForm[paramStr].info[0]
                                                .volumeEnable ||
                                        (this.isTemplate &&
                                            val[
                                                paramStr
                                            ].info[0].hasOwnProperty(
                                                "volumeEnable",
                                            ))
                                            ? `${paramStr}.info.0.volumeEnable&音量使能switch&${val[paramStr].info[0].volumeEnable}`
                                            : null;
                                    this.setForm[objName].info[0].volume =
                                        val[paramStr].info[0].volume !=
                                            this.oldForm[paramStr].info[0]
                                                .volume ||
                                        (this.isTemplate &&
                                            val[
                                                paramStr
                                            ].info[0].hasOwnProperty("volume"))
                                            ? `${paramStr}.info.0.volume&报警音量number&${val[paramStr].info[0].volume}`
                                            : null;
                                    this.setForm[
                                        objName
                                    ].info[0].snapshot.number =
                                        val[paramStr].info[0].snapshot.number !=
                                            this.oldForm[paramStr].info[0]
                                                .snapshot.number ||
                                        (this.isTemplate &&
                                            val[
                                                paramStr
                                            ].info[0].snapshot.hasOwnProperty(
                                                "number",
                                            ))
                                            ? `${paramStr}.info.0.snapshot.number&抓图张数number&${val[paramStr].info[0].snapshot.number}`
                                            : null;
                                    this.setForm[
                                        objName
                                    ].info[0].snapshot.interval =
                                        val[paramStr].info[0].snapshot
                                            .interval !=
                                            this.oldForm[paramStr].info[0]
                                                .snapshot.interval ||
                                        (this.isTemplate &&
                                            val[
                                                paramStr
                                            ].info[0].snapshot.hasOwnProperty(
                                                "interval",
                                            ))
                                            ? `${paramStr}.info.0.snapshot.interval&抓图间隔number&${
                                                  Number(
                                                      val[paramStr].info[0]
                                                          .snapshot.interval,
                                                  ) * 100
                                              }毫秒&${
                                                  val[paramStr].info[0].snapshot
                                                      .interval
                                              }`
                                            : null;
                                    this.setForm[
                                        objName
                                    ].info[0].clip.perRecord =
                                        val[paramStr].info[0].clip.perRecord !=
                                            this.oldForm[paramStr].info[0].clip
                                                .perRecord ||
                                        (this.isTemplate &&
                                            val[
                                                paramStr
                                            ].info[0].clip.hasOwnProperty(
                                                "perRecord",
                                            ))
                                            ? `${paramStr}.info.0.clip.perRecord&报警短视频前半部分时长number&${val[paramStr].info[0].clip.perRecord}`
                                            : null;
                                    this.setForm[
                                        objName
                                    ].info[0].clip.afterRecord =
                                        val[paramStr].info[0].clip
                                            .afterRecord !=
                                            this.oldForm[paramStr].info[0].clip
                                                .afterRecord ||
                                        (this.isTemplate &&
                                            val[
                                                paramStr
                                            ].info[0].clip.hasOwnProperty(
                                                "afterRecord",
                                            ))
                                            ? `${paramStr}.info.0.clip.afterRecord&报警短视频后半部分时长number&${val[paramStr].info[0].clip.afterRecord}`
                                            : null;
                                    this.setForm[
                                        objName
                                    ].info[0].snapshot.upload =
                                        val[paramStr].info[0].snapshot.upload !=
                                            this.oldForm[paramStr].info[0]
                                                .snapshot.upload ||
                                        (this.isTemplate &&
                                            val[
                                                paramStr
                                            ].info[0].hasOwnProperty(
                                                "snapshot.upload",
                                            ))
                                            ? `${paramStr}.info.0.snapshot.upload&报警图片上传使能switch&${val[paramStr].info[0].snapshot.upload}`
                                            : null;
                                    this.setForm[objName].info[0].clip.upload =
                                        val[paramStr].info[0].clip.upload !=
                                            this.oldForm[paramStr].info[0].clip
                                                .upload ||
                                        (this.isTemplate &&
                                            val[
                                                paramStr
                                            ].info[0].hasOwnProperty(
                                                "clip.upload",
                                            ))
                                            ? `${paramStr}.info.0.clip.upload&报警视频上传使能switch&${val[paramStr].info[0].clip.upload}`
                                            : null;
                                    this.setForm[
                                        objName
                                    ].info[0].inhibitionTime =
                                        val[paramStr].info[0].inhibitionTime !=
                                            this.oldForm[paramStr].info[0]
                                                .inhibitionTime ||
                                        (this.isTemplate &&
                                            val[
                                                paramStr
                                            ].info[0].hasOwnProperty(
                                                "inhibitionTime",
                                            ))
                                            ? `${paramStr}.info.0.inhibitionTime&报警抑制时间number&${val[paramStr].info[0].inhibitionTime}`
                                            : null;
                                    this.setForm[
                                        objName
                                    ].info[0].uploadEventPlatform =
                                        this.isEqual(
                                            val[paramStr].info[0]
                                                .uploadEventPlatform,
                                            this.oldForm[paramStr].info[0]
                                                .uploadEventPlatform,
                                        ) ||
                                        (this.isTemplate &&
                                            val[
                                                paramStr
                                            ].info[0].hasOwnProperty(
                                                "uploadEventPlatform",
                                            ))
                                            ? `${paramStr}.info.0.uploadEventPlatform&事件上传平台使能array&${this.getUploadEventPlatform(
                                                  val[paramStr].info[0]
                                                      .uploadEventPlatform,
                                              )}&${
                                                  val[paramStr].info[0]
                                                      .uploadEventPlatform
                                              }`
                                            : null;
                                    this.setForm[objName].info[0].heightLimit =
                                        val[paramStr].info[0].heightLimit !=
                                            this.oldForm[paramStr].info[0]
                                                .heightLimit ||
                                        (this.isTemplate &&
                                            val[
                                                paramStr
                                            ].info[0].hasOwnProperty(
                                                "heightLimit",
                                            ))
                                            ? `${paramStr}.info.0.heightLimit&限高number&${val[paramStr].info[0].heightLimit}`
                                            : null;
                                    this.setForm[objName].info[0].weightLimit =
                                        val[paramStr].info[0].weightLimit !=
                                            this.oldForm[paramStr].info[0]
                                                .weightLimit ||
                                        (this.isTemplate &&
                                            val[
                                                paramStr
                                            ].info[0].hasOwnProperty(
                                                "weightLimit",
                                            ))
                                            ? `${paramStr}.info.0.weightLimit&限重number&${val[paramStr].info[0].weightLimit}`
                                            : null;
                                    this.setForm[objName].info[0].wheelAngle =
                                        val[paramStr].info[0].wheelAngle !=
                                            this.oldForm[paramStr].info[0]
                                                .wheelAngle ||
                                        (this.isTemplate &&
                                            val[
                                                paramStr
                                            ].info[0].hasOwnProperty(
                                                "wheelAngle",
                                            ))
                                            ? `${paramStr}.info.0.wheelAngle&方向盘角度number&${val[paramStr].info[0].wheelAngle}`
                                            : null;
                                    this.setForm[
                                        objName
                                    ].info[0].distanceBeyongLane =
                                        val[paramStr].info[0]
                                            .distanceBeyongLane !=
                                            this.oldForm[paramStr].info[0]
                                                .distanceBeyongLane ||
                                        (this.isTemplate &&
                                            val[
                                                paramStr
                                            ].info[0].hasOwnProperty(
                                                "distanceBeyongLane",
                                            ))
                                            ? `${paramStr}.info.0.distanceBeyongLane&本车超过本车道线的距离number&${val[paramStr].info[0].distanceBeyongLane}`
                                            : null;
                                    this.setForm[
                                        objName
                                    ].info[0].nearCarDistance =
                                        val[paramStr].info[0].nearCarDistance !=
                                            this.oldForm[paramStr].info[0]
                                                .nearCarDistance ||
                                        (this.isTemplate &&
                                            val[
                                                paramStr
                                            ].info[0].hasOwnProperty(
                                                "nearCarDistance",
                                            ))
                                            ? `${paramStr}.info.0.nearCarDistance&距离相邻车的距离number&${val[paramStr].info[0].nearCarDistance}`
                                            : null;
                                    this.setForm[
                                        objName
                                    ].info[0].brakeSuppression =
                                        val[paramStr].info[0]
                                            .brakeSuppression !=
                                            this.oldForm[paramStr].info[0]
                                                .brakeSuppression ||
                                        (this.isTemplate &&
                                            val[
                                                paramStr
                                            ].info[0].hasOwnProperty(
                                                "brakeSuppression",
                                            ))
                                            ? `${paramStr}.info.0.brakeSuppression&刹车抑制switch&${val[paramStr].info[0].brakeSuppression}`
                                            : null;
                                    this.setForm[
                                        objName
                                    ].info[0].brakeSuppressionTime =
                                        val[paramStr].info[0]
                                            .brakeSuppressionTime !=
                                            this.oldForm[paramStr].info[0]
                                                .brakeSuppressionTime ||
                                        (this.isTemplate &&
                                            val[
                                                paramStr
                                            ].info[0].hasOwnProperty(
                                                "brakeSuppressionTime",
                                            ))
                                            ? `${paramStr}.info.0.brakeSuppressionTime&刹车抑制时间number&${val[paramStr].info[0].brakeSuppressionTime}`
                                            : null;
                                    this.setForm[
                                        objName
                                    ].info[0].collisionDistance =
                                        val[paramStr].info[0]
                                            .collisionDistance !=
                                            this.oldForm[paramStr].info[0]
                                                .collisionDistance ||
                                        (this.isTemplate &&
                                            val[
                                                paramStr
                                            ].info[0].hasOwnProperty(
                                                "collisionDistance",
                                            ))
                                            ? `${paramStr}.info.0.collisionDistance&碰撞报警前方物体距离number&${val[paramStr].info[0].collisionDistance}`
                                            : null;
                                    this.setForm[
                                        objName
                                    ].info[0].collisionAccelerationi =
                                        val[paramStr].info[0]
                                            .collisionAccelerationi !=
                                            this.oldForm[paramStr].info[0]
                                                .collisionAccelerationi ||
                                        (this.isTemplate &&
                                            val[
                                                paramStr
                                            ].info[0].hasOwnProperty(
                                                "collisionAccelerationi",
                                            ))
                                            ? `${paramStr}.info.0.collisionAccelerationi&碰撞报警加速度number&${val[paramStr].info[0].collisionAccelerationi}`
                                            : null;
                                    this.setForm[
                                        objName
                                    ].info[0].snapshot.linkChannel =
                                        this.isEqual(
                                            val[paramStr].info[0].snapshot
                                                .linkChannel,
                                            this.oldForm[paramStr].info[0]
                                                .snapshot.linkChannel,
                                        ) ||
                                        (this.isTemplate &&
                                            val[
                                                paramStr
                                            ].info[0].snapshot.hasOwnProperty(
                                                "linkChannel",
                                            ))
                                            ? `${paramStr}.info.0.snapshot.linkChannel&联动抓拍的通道array&${this.getLinkChannel(
                                                  val[paramStr].info[0].snapshot
                                                      .linkChannel,
                                              )}&${
                                                  val[paramStr].info[0].snapshot
                                                      .linkChannel
                                              }`
                                            : null;
                                }
                            });
                        }
                    });
                    //消隐线设置
                    if (
                        val.param2205_1_horizonVanishLine &&
                        val.param2205_1_verticalVanishLine
                    ) {
                        if (
                            !this.setForm.hasOwnProperty(
                                "通道1>消隐线设置&param2205_1_horizonVanishLine",
                            )
                        ) {
                            this.setForm[
                                "通道1>消隐线设置&param2205_1_horizonVanishLine"
                            ] = {};
                        }
                        this.setForm[
                            "通道1>消隐线设置&param2205_1_horizonVanishLine"
                        ].horizonVanishLine =
                            val["param2205_1_horizonVanishLine"]
                                .horizonVanishLine !=
                                this.oldForm["param2205_1_horizonVanishLine"]
                                    .horizonVanishLine ||
                            val["param2205_1_verticalVanishLine"]
                                .verticalVanishLine !=
                                this.oldForm["param2205_1_verticalVanishLine"]
                                    .verticalVanishLine ||
                            (this.isTemplate &&
                                val[
                                    "param2205_1_horizonVanishLine"
                                ].hasOwnProperty("horizonVanishLine"))
                                ? `param2205_1_horizonVanishLine.horizonVanishLine&消隐线&新区域&[${val["param2205_1_horizonVanishLine"].horizonVanishLine},${val["param2205_1_verticalVanishLine"].verticalVanishLine}]`
                                : null;
                    }
                    this.$emit("setFormChange", {
                        ADAS: this.setForm,
                    });
                }
            },
            deep: true,
            immediate: true,
        },
    },
    methods: {
        initConfig() {
            this.$emit("setFormLoading", true);
            let initConfigList = [];
            this.AdasList = [];
            this.chanNoActive = `通道${this.capability.intelliDrive_ADAS[0].chanNo}`;
            if (this.capability.network.platformInfo) {
                this.capability.network.platformInfo.forEach((item, index) => {
                    if (item.platformType === 1) {
                        if (item.platformDetail) {
                            this.isAdas = true;
                        }
                    }
                });
            }
            this.capability.intelliDrive_ADAS.forEach((chanNoItem) => {
                initConfigList.push(
                    this.getEHomeConfig(
                        901,
                        {
                            type: "",
                            chanNo: chanNoItem.chanNo,
                        },
                        "ADAS",
                    ),
                );
                let obj = {
                    ...chanNoItem,
                    info: {},
                };
                chanNoItem.info.forEach((infoItem) => {
                    /* --------------------算法灵敏度 start-------------------------*/
                    infoItem.sensitivityList = [];
                    if (infoItem.sensitivity) {
                        if (
                            infoItem.sensitivity.min === 1 &&
                            infoItem.sensitivity.max === 3
                        ) {
                            infoItem.sensitivityList = [
                                {
                                    value: 1,
                                    label: "低",
                                },
                                {
                                    value: 2,
                                    label: "中",
                                },
                                {
                                    value: 3,
                                    label: "高",
                                },
                            ];
                        } else {
                            let sensitivityRange =
                                infoItem.sensitivity.max -
                                infoItem.sensitivity.min;
                            let sensitivityLow =
                                infoItem.sensitivity.min +
                                parseInt(sensitivityRange / 6);
                            let sensitivityMiddle =
                                infoItem.sensitivity.min +
                                parseInt(sensitivityRange / 2);
                            let sensitivityHigh =
                                infoItem.sensitivity.min +
                                parseInt((sensitivityRange * 5) / 6);
                            infoItem.sensitivityRange = sensitivityRange;
                            infoItem.sensitivityList = [
                                {
                                    value: sensitivityLow,
                                    label: "低",
                                },
                                {
                                    value: sensitivityMiddle,
                                    label: "中",
                                },
                                {
                                    value: sensitivityHigh,
                                    label: "高",
                                },
                            ];
                        }
                    }
                    /* --------------------算法灵敏度 end-------------------------*/
                    /* --------------------算法置信度 start-------------------------*/
                    infoItem.confidenceList = [];
                    if (infoItem.confidence) {
                        let confidenceRange =
                            infoItem.confidence.max - infoItem.confidence.min;
                        let confidenceLow =
                            infoItem.confidence.min +
                            parseInt(confidenceRange / 6);
                        let confidenceMiddle =
                            infoItem.confidence.min +
                            parseInt(confidenceRange / 2);
                        let confidenceHigh =
                            infoItem.confidence.min +
                            parseInt((confidenceRange * 5) / 6);
                        infoItem.confidenceRange = confidenceRange;
                        infoItem.confidenceList = [
                            {
                                value: confidenceLow,
                                label: "低",
                            },
                            {
                                value: confidenceMiddle,
                                label: "中",
                            },
                            {
                                value: confidenceHigh,
                                label: "高",
                            },
                        ];
                    }
                    /* --------------------算法置信度 end-------------------------*/
                    for (let key of Object.keys(
                        this.enumerationJSON["intelliDrive_ADAS_type"],
                    )) {
                        if (
                            this.enumerationJSON["intelliDrive_ADAS_type"][
                                key
                            ].indexOf(infoItem.type) > -1
                        ) {
                            if (!obj.info.hasOwnProperty(key)) {
                                obj.info[key] = [];
                            }
                            obj.info[key].push(infoItem);
                            if (!this.activeCollapse.length) {
                                this.activeCollapse.push(key.split("-")[1]);
                            }
                        }
                    }
                    initConfigList.push(
                        this.getEHomeConfig(
                            901,
                            {
                                type: infoItem.type,
                                chanNo: chanNoItem.chanNo,
                            },
                            "ADAS",
                        ),
                    );
                });
                if (
                    this.capability.picture &&
                    this.capability.picture.length &&
                    this.capability.picture[0] &&
                    this.capability.picture[0].verticalVanishLine
                ) {
                    obj.verticalVanishLine =
                        this.capability.picture[0].verticalVanishLine;
                    obj.horizonVanishLine =
                        this.capability.picture[0].horizonVanishLine;
                    initConfigList.push(
                        this.getEHomeConfig(2205, {
                            chanNo: 1,
                            type: "verticalVanishLine",
                        }),
                    );
                    initConfigList.push(
                        this.getEHomeConfig(2205, {
                            chanNo: 1,
                            type: "horizonVanishLine",
                        }),
                    );
                }
                if (obj.calibration) {
                    initConfigList.push(
                        this.getEHomeConfig(903, {
                            type: "",
                            chanNo: chanNoItem.chanNo,
                        }),
                    );
                }
                this.AdasList.push(obj);
            });
            Promise.all(initConfigList).then((result) => {
                this.$emit("setFormLoading", false);
                this.$emit("loadingSuccess");
                this.typeObj = {};
                this.AdasList.forEach((item) => {
                    this.typeObj[item.chanNo] = Object.entries(
                        item.info,
                    ).reduce((prev, cur) => {
                        let arr = [];
                        cur[1].forEach((k) => {
                            arr.push(k.type);
                        });
                        return prev.concat(arr);
                    }, []);
                });
                let chanNo = this.chanNoActive.split("通道")[1];
                this.firstType = this.typeObj[chanNo].find(
                    (type) => this.newForm[`param901_${chanNo}_${type}`],
                );
                for (let key of Object.keys(
                    this.enumerationJSON["intelliDrive_ADAS_type"],
                )) {
                    if (
                        this.enumerationJSON["intelliDrive_ADAS_type"][
                            key
                        ].indexOf(this.firstType) > -1 &&
                        !this.activeCollapse.length
                    ) {
                        this.activeCollapse.push(key.split("-")[1]);
                    }
                }
            });
        },
        getLabelByType(type) {
            let label = "";
            for (let key of Object.keys(
                this.enumerationJSON["intelliDrive_ADAS_type"],
            )) {
                let index =
                    this.enumerationJSON["intelliDrive_ADAS_type"][key].indexOf(
                        type,
                    );
                if (index === 0) {
                    label = key + ">一级报警";
                } else if (index === 1) {
                    label = key + ">二级报警";
                }
            }
            return label.split("-")[1];
        },
        beforeChange(value, done) {
            if (value === 1) {
                this.$confirm(
                    "算法使能关闭后算法将不再运行，本次修改的报警项配置不再保留。",
                    "确定要关闭ADAS算法使能吗？",
                    {
                        confirmButtonText: this.$t("common.ok"),
                        cancelButtonText: this.$t("common.cancel"),
                        type: "warning",
                    },
                )
                    .then(() => {
                        let chanNo = this.chanNoActive.split("通道")[1];
                        this.AdasList.forEach((chanNoItem) => {
                            if (Number(chanNoItem.chanNo) === Number(chanNo)) {
                                for (let typeName of Object.keys(
                                    chanNoItem.info,
                                )) {
                                    chanNoItem.info[typeName].forEach(
                                        (typeItem) => {
                                            if (
                                                this.newForm[
                                                    `param901_${chanNo}_${typeItem.type}`
                                                ] &&
                                                this.oldForm[
                                                    `param901_${chanNo}_${typeItem.type}`
                                                ]
                                            ) {
                                                this.newForm[
                                                    `param901_${chanNo}_${typeItem.type}`
                                                ] = JSON.parse(
                                                    JSON.stringify(
                                                        this.oldForm[
                                                            `param901_${chanNo}_${typeItem.type}`
                                                        ],
                                                    ),
                                                );
                                            }
                                        },
                                    );
                                }
                            }
                        });
                        done();
                    })
                    .catch(() => {});
            } else {
                done();
            }
        },
        openDialog(chanNoItem) {
            this.volumeItem = chanNoItem;
            this.dialogVisible = true;
        },
        close() {
            this.dialogVisible = false;
            setTimeout(() => {
                this.volumeItem = {};
                this.globalVolume = 0;
            }, 300);
        },
        send() {
            for (let key of Object.keys(this.volumeItem.info)) {
                this.volumeItem.info[key].map((item) => {
                    this.newForm[
                        `param901_${this.volumeItem.chanNo}_${item.type}`
                    ].info[0].volume = this.globalVolume;
                });
            }
            this.close();
        },
        getLabelSelf(arr, val) {
            if (!arr.length) {
                return "";
            }
            let obj = arr.find((e) => e.value === val);
            if (obj) {
                return obj.label;
            }
        },
        collapseChange(val) {
            if (val.length) {
                setTimeout(() => {
                    this.labelWidthResize();
                }, 300);
            }
        },
        speedBlur(chanNoItem, key) {
            if (chanNoItem.info[key].length > 1 && !this.isTemplate) {
                if (
                    this.newForm[
                        `param901_${chanNoItem.chanNo}_${chanNoItem.info[key][1].type}`
                    ].info[0].speed -
                        this.newForm[
                            `param901_${chanNoItem.chanNo}_${chanNoItem.info[key][0].type}`
                        ].info[0].speed <
                    20
                ) {
                    this.$message.error(
                        `${
                            key.split("-")[1]
                        }一级报警与二级报警报警判断速度阈值小于20！`,
                    );
                }
            }
        },
        enableChange(val, chanNoItem) {
            for (let typeItem of Object.keys(chanNoItem.info)) {
                chanNoItem.info[typeItem].forEach((levelItem) => {
                    if (
                        this.newForm[
                            `param901_${chanNoItem.chanNo}_${levelItem.type}`
                        ]
                    ) {
                        this.newForm[
                            `param901_${chanNoItem.chanNo}_${levelItem.type}`
                        ].enable = val;
                        this.$emit(
                            "formDataChange",
                            `param901_${chanNoItem.chanNo}_${levelItem.type}`,
                            {
                                ...this.newForm[
                                    `param901_${chanNoItem.chanNo}_${levelItem.type}`
                                ],
                            },
                        );
                    }
                });
            }
        },
        uploadChange(val, attr, chanNo, type) {
            this.newForm[`param901_${chanNo}_${type}`].info[0][attr].save = val;
            this.$emit("formDataChange", `param901_${chanNo}_${type}`, {
                ...this.newForm[`param901_${chanNo}_${type}`],
            });
        },
        openHiddenLine() {},
        handleClose(done) {
            if (!this.isPlugin) this.$refs.ADASNoPlugin.cancel(true);
            else {
                done();
            }
        },
        SurveyBol() {
            this.openSurveyBol = false;
        },
        cancelSurveyBol() {
            this.openSurveyBol = false;
        },
        openSurvey(chanNoItem) {
            if (
                !this.isTemplate &&
                (this.deviceInfo.deviceStatus == 0 ||
                    (this.deviceInfo.deviceStatus == 2 &&
                        this.deviceInfo.dormantStatus == 1))
            ) {
                this.$message.warning(
                    `设备处于${
                        this.deviceInfo.deviceStatus == 0 ? "离线" : "深休眠"
                    }状态，无法进行标定操作！`,
                );
                return;
            }
            this.surveyObj = chanNoItem;
            let areaArr = [
                [
                    {
                        x: this.newForm[`param2205_1_horizonVanishLine`]
                            .horizonVanishLine,
                        y: this.newForm[`param2205_1_verticalVanishLine`]
                            .verticalVanishLine,
                    },
                ],
            ];
            this.dialogClick = true;
            this.openSurveyBol = true;
            let areaContent = [];

            areaArr.forEach((item, index) => {
                item.forEach((item_) => {
                    areaContent.push({
                        x: parseInt(item_.x),
                        y: parseInt(item_.y),
                    });
                });
            });
            let params = {
                deviceId: this.$route.query.deviceId || null,
                channelNo: this.chanNoActive.split("通道")[1],
                protocolType: this.isPlugin ? 0 : 3,
            };
            this.$api.previewPlay(params).then((res) => {
                if (res.success) {
                    this.playUrl = res.data;
                } else {
                }
                this.$nextTick(() => {
                    this.$refs.ADASNoPlugin.openHatPlugin(
                        this.playUrl,
                        areaContent,
                        !this.isTemplate,
                        "private",
                    );
                });
            });
        },
        saveSurveyBol(adasInfo) {
            this.newForm[`param2205_1_horizonVanishLine`].horizonVanishLine =
                adasInfo[0];
            this.newForm[`param2205_1_verticalVanishLine`].verticalVanishLine =
                adasInfo[1];
            this.$message.success("设置成功，点击下发至终端生效");
            this.openSurveyBol = false;
        },
    },
};
</script>
<style lang="less" scoped>
@import "./configurationForm.less";
.divHeight {
    height: 500px;
    width: 800;
}
</style>
