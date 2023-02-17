<template>
  <div class="file-upload">
    <el-upload
      ref="upload"
      action="#"
      :auto-upload="false"
      :on-change="fileChangeHandle"
      :on-remove="fileRemoveHandle"
    >
      <template #trigger>
        <el-button type="primary" style="margin-right: 10px"
          >选择文件</el-button
        >
      </template>

      <el-button type="success" @click="uploadHandle"> 上传文件 </el-button>
    </el-upload>
    <el-progress
      :percentage="percentage"
      :status="status"
      v-if="progressFlag"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { uploadPackage } from "@/api/request";
import { notice } from "@/utils/commonUtil";
export default defineComponent({
  emits: ["returnPackageName"],
  setup(_, context) {
    const upload = ref<any>();

    const percentage = ref(0);
    const status = ref("");
    const progressFlag = ref(false);

    let uploadFile: any = undefined;
    let uploadFlag: boolean = true;

    const fileChangeHandle = (val1: any, val2: any) => {
      if (val2.length > 1) {
        upload.value.handleRemove(val2[0]);
      }
      uploadFile = val1;
    };

    const fileRemoveHandle = () => {
      uploadFile = undefined;
      status.value = "";
      percentage.value = 0;
      progressFlag.value = false;
      context.emit("returnPackageName", "");
    };

    const uploadHandle = async () => {
      if (uploadFlag) {
        uploadFlag = false;
      } else {
        notice("warning", "警告", "请不要重复点击");
        return;
      }
      progressFlag.value = true;
      const formData = new FormData();
      formData.append("file", uploadFile.raw);
      const data = await uploadPackage(formData, percentage);
      if (data != null && (data as any).code === 0) {
        context.emit("returnPackageName", data.data);
        status.value = "success";
      } else {
        context.emit("returnPackageName", "");
        status.value = "exception";
      }
    };

    return {
      upload,
      percentage,
      status,
      progressFlag,
      fileChangeHandle,
      fileRemoveHandle,
      uploadHandle,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
