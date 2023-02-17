<template>
  <div>
    <el-form
      label-position="right"
      label-width="100px"
      :model="form"
      style="max-width: 460px"
    >
      <el-form-item label="站点名">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="监测内容">
        <el-input v-model="form.theme" />
      </el-form-item>
      <el-form-item label="注册时间">
        <el-input v-model="form.enrollTime" />
      </el-form-item>
      <el-form-item label="传输方式">
        <el-select v-model="form.type" placeholder="Select">
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="经度">
        <el-select v-model="form.lon" placeholder="Select">
          <el-option
            v-for="item in lonOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="纬度">
        <el-select v-model="form.lat" placeholder="Select">
          <el-option
            v-for="item in latOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="所属站点">
        <el-select v-model="form.stationId" placeholder="Select">
          <el-option
            v-for="item in stationOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="数据组织结构">
        <el-input v-model="form.structure" />
      </el-form-item>
      <el-form-item label="api地址" v-if="form.type == 'api'">
        <el-input
          v-model="form.address"
          placeholder="api地址及相关的网络请求脚本"
        />
      </el-form-item>
      <el-form-item label="数据库类型" v-if="form.type == 'query'">
        <el-input v-model="form.databaseType" placeholder="数据库类型及地址" />
      </el-form-item>
      <el-form-item label="查询语句" v-if="form.type == 'query'">
        <el-input v-model="form.databasesql" placeholder="数据库查询语句" />
      </el-form-item>
    </el-form>

    <el-button type="primary" plain @click="commit">确定</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  emits: ["addDevice"],
  setup(_, context) {
    const stationOptions = [
      {
        label: "A站点",
        value: "123456",
      },
    ];
    const typeOptions = [
      {
        label: "定时推送",
        value: "push",
      },
      {
        label: "api获取",
        value: "api",
      },

      {
        label: "自行查询获取",
        value: "query",
      },
    ];
    const lonOptions = [
      {
        label: "121.239489",
        value: "121.239489",
      },
      {
        label: "121.155551",
        value: "121.155551",
      },
      {
        label: "121.178548",
        value: "121.178548",
      },
    ];
    const latOptions = [
      {
        label: "31.7434",
        value: "31.7434",
      },
      {
        label: "31.760103",
        value: "31.760103",
      },
      {
        label: "31.757156",
        value: "31.757156",
      },
    ];
    const form = ref({
      name: "A设备",
      theme: "水位",
      enrollTime: "2023-02-04",
      type: "",
      lon: "",
      lat: "",
      stationId: "",
      structure: "",
      address: "",
      databaseType: "",
      databasesql: "",
    });

    const commit = () => {
      context.emit("addDevice", form.value);
    };

    return {
      form,
      stationOptions,
      typeOptions,
      lonOptions,
      latOptions,
      commit,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>