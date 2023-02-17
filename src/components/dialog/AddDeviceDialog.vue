<template>
  <div>
    <el-form label-position="right" label-width="70px" :model="form">
      <el-form-item label="设备名">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="经度">
        <el-input v-model="form.lon" />
      </el-form-item>
      <el-form-item label="纬度">
        <el-input v-model="form.lat" />
      </el-form-item>
      <el-form-item label="所属站点">
        <el-select v-model="form.stationId" placeholder="Select">
          <el-option
            v-for="item in stationList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="设备描述">
        <el-input
          v-model="form.description"
          :rows="3"
          type="textarea"
          resize="none"
        />
      </el-form-item>
      <el-form-item label="设备照片">
        <avatar-upload :pictureName="''" @upload="uploadHandle" />
      </el-form-item>
      <el-form-item label="配置文件">
        <upload-package
          class="file-upload"
          @returnPackageName="returnPackageName"
        />
      </el-form-item>
    </el-form>
    <div class="btn">
      <el-button type="primary" plain @click="commit" :disabled="!checkResult"
        >确定</el-button
      >
      <el-button
        type="warning"
        plain
        class="check"
        :disabled="configPackage == ''"
        @click="checkClick"
        >检验配置文件</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import AvatarUpload from "@/components/upload/AvatarUpload.vue";
import UploadPackage from "@/components/upload/UploadPackage.vue";
import { uploadPicture, checkConfig, initDevice } from "@/api/request";
import { notice } from "@/utils/commonUtil";
export default defineComponent({
  emits: ["addDevice"],
  components: { AvatarUpload, UploadPackage },
  props: {
    stationList: {
      type: Array,
    },
  },
  setup(props, context) {
    const checkResult = ref(false);
    const configPackageName = ref("");
    const stationList = computed(() => {
      return props.stationList;
    });
    const form = ref({
      name: "b设备",
      lon: 121.159033,
      lat: 31.769616,
      description: "",
      stationId: "",
      avatar: "",
    });

    const commit = async () => {
      const jsonData = {
        folderName: configPackageName.value,
        name: form.value.name,
        lon: form.value.lon,
        lat: form.value.lat,
        stationId: form.value.stationId,
        description: form.value.description,
        avatar: form.value.avatar,
      };
      const data = await initDevice(jsonData);
      if (data != null && (data as any).code === 0) {
        notice("success", "成功", "设备添加成功");
        context.emit("addDevice", {
          id: data.data,
          name: form.value.name,
          lon: form.value.lon,
          lat: form.value.lat,
          stationId: form.value.stationId,
          description: form.value.description,
          avatar: form.value.avatar,
        });
      } else {
        notice("error", "失败", "设备添加失败");
      }
    };

    const returnPackageName = (val: string) => {
      configPackageName.value = val;
      if (val === "") {
        checkResult.value = false;
      }
    };

    const uploadHandle = async (val: File) => {
      const formData = new FormData();
      formData.append("file", val);
      const data = await uploadPicture(formData);
      if (data != null && (data as any).code === 0) {
        form.value.avatar = data.data;
      }
    };

    const checkClick = async () => {
      const data = await checkConfig({ folderName: configPackageName.value });
      if (data != null && (data as any).code === 0) {
        if (data.data === 0) {
          checkResult.value = true;
          notice("success", "成功", "配置文件初步检验成功");
        } else {
          checkResult.value = false;
          notice("error", "失败", "配置文件检验失败");
        }
      }
    };

    return {
      form,
      commit,
      uploadHandle,
      stationList,
      returnPackageName,
      configPackageName,
      checkClick,
      checkResult,
    };
  },
});
</script>

<style lang="scss" scoped>
.file-upload {
  width: 100%;
  height: 100px;
}
.btn {
  margin-top: 20px;
  height: 20px;
  .el-button {
    float: right;
  }
  .check {
    margin-right: 10px;
  }
}
</style>