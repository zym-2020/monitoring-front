<template>
  <div class="add-station">
    <el-form label-position="right" label-width="70px" :model="form">
      <el-form-item label="站点名">
        <el-input v-model="form.name" />
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
      <el-form-item label="站点描述">
        <el-input
          v-model="form.description"
          :rows="3"
          type="textarea"
          resize="none"
        />
      </el-form-item>
      <el-form-item label="站点照片">
        <avatar-upload :pictureName="''" @upload="uploadHandle" />
      </el-form-item>
    </el-form>
    <div class="btn">
      <el-button type="primary" plain @click="commit">确定</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import AvatarUpload from "@/components/upload/AvatarUpload.vue";
import { uploadPicture, addStation } from "@/api/request";
export default defineComponent({
  components: { AvatarUpload },
  emits: ["addStation"],
  setup(_, context) {
    const form = ref({
      name: "A站",
      department: "南京水利科学研究院",
      lon: 121.203844,
      lat: 31.77091,
      description: "",
      avatar: "",
    });

    const commit = async () => {
      const data = await addStation(form.value);
      if (data != null && (data as any).code === 0) {
        context.emit("addStation", {
          id: data.data,
          name: form.value.name,
          department: form.value.department,
          lon: form.value.lon,
          lat: form.value.lat,
          description: form.value.description,
          avatar: form.value.avatar,
        });
      } else {
        context.emit("addStation", null);
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

    return {
      form,
      commit,
      uploadHandle,
    };
  },
});
</script>

<style lang="scss" scoped>
.btn {
  margin-top: 20px;
  height: 20px;
  .el-button {
    float: right;
  }
}
</style>