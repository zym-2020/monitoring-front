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
      <el-form-item label="建站时间">
        <el-input v-model="form.buildTime" />
      </el-form-item>
      <el-form-item label="注册时间">
        <el-input v-model="form.enrollTime" />
      </el-form-item>
      <el-form-item label="所属单位">
        <el-input v-model="form.department" />
      </el-form-item>
      <el-form-item label="经度">
        <el-input v-model="form.lon" />
      </el-form-item>
      <el-form-item label="纬度">
        <el-input v-model="form.lat" />
      </el-form-item>
    </el-form>
    <el-button type="primary" plain @click="commit">确定</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  emits: ["addStation"],
  setup(_, context) {
    const form = ref<any>({
      name: "A站",
      buildTime: "2018-02-04",
      enrollTime: "2023-02-04",
      department: "南京水利科学研究院",
      lon: 121.203844,
      lat: 31.77091,
    });

    const commit = () => {
      context.emit("addStation", form.val);
    };

    return {
      form,
      commit
    };
  },
});
</script>

<style lang="scss" scoped>
</style>