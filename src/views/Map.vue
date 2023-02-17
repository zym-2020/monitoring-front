<template>
  <div class="main">
    <div class="btn">
      <el-button type="primary" plain @click="addStaionClick"
        >添加站点</el-button
      >
      <el-button type="primary" plain @click="addDeviceClick"
        >添加设备</el-button
      >
      <el-button type="primary" plain @click="exportClick"
        >导出成文档</el-button
      >
    </div>
    <div class="container" ref="container"></div>

    <el-dialog v-model="stationDialogVisible" :width="500">
      <add-station-dialog @addStation="addStation" />
    </el-dialog>
    <el-dialog v-model="deviceDialogVisible" width="30%">
      <add-device-dialog @addDevice="addDevice" />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue"; 
import AddStationDialog from "@/components/dialog/AddStationDialog.vue";
import AddDeviceDialog from "@/components/dialog/AddDeviceDialog.vue";
import mapBoxGl from "mapbox-gl";

export default defineComponent({
  components: {
    AddStationDialog,
    AddDeviceDialog,
  },
  setup() {
    let map: mapBoxGl.Map;
    const container = ref<HTMLElement>();

    const stationDialogVisible = ref(false);
    const deviceDialogVisible = ref(false);
    let stationInfo: any;

    const initMap = () => {
      map = new mapBoxGl.Map({
        container: container.value as HTMLElement,
        accessToken:
          "pk.eyJ1Ijoiam9obm55dCIsImEiOiJja2xxNXplNjYwNnhzMm5uYTJtdHVlbTByIn0.f1GfZbFLWjiEayI6hb_Qvg",
        style: "mapbox://styles/johnnyt/cl9mkdnso000q15rlcoxiaab0",
        center: [121.18, 31.723],
        zoom: 8,
      });
    };

    const exportClick = () => {
      window.location.href = "http://172.21.213.244:8008/station/file";
    };

    const addStaionClick = () => {
      stationDialogVisible.value = true;
    };

    const addStation = (val: any) => {
      stationInfo = val;
      stationDialogVisible.value = false;
      const uuid = Math.ceil(Math.random() * 1000).toString();
      map.addSource(uuid, {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "Point",
                coordinates: [121.203844, 31.77091],
              },
            },
          ],
        },
      });
      map.addLayer({
        id: uuid,
        source: uuid,
        type: "circle",
        paint: {
          "circle-color": "white",
          "circle-radius": 10,
        },
      });
    };

    const addDeviceClick = () => {
      deviceDialogVisible.value = true;
    };

    const addDevice = (val: any) => {
      console.log(val.lon);
      deviceDialogVisible.value = false;
      const uuid = Math.ceil(Math.random() * 1000).toString();
      map.addSource(uuid, {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "Point",
                coordinates: [val.lon, val.lat],
              },
            },
          ],
        },
      });
      map.addLayer({
        id: uuid,
        source: uuid,
        type: "circle",
        paint: {
          "circle-color": "red",
          "circle-radius": 5,
        },
      });
    };

    onMounted(() => {
      initMap();
    });

    return {
      container,
      stationDialogVisible,
      addStaionClick,
      addStation,
      deviceDialogVisible,
      addDeviceClick,
      addDevice,
      exportClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.main {
  height: 100%;
  .btn {
    height: 60px;
    line-height: 60px;
    background: white;
    border-radius: 6px;
    margin-bottom: 20px;
    padding-left: 40px;
  }
  .container {
    height: calc(100% - 80px);
  }
}
</style>