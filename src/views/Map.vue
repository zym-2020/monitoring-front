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
    <el-dialog v-model="deviceDialogVisible" :width="500">
      <add-device-dialog :stationList="stationList" @addDevice="addDevice" />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import AddStationDialog from "@/components/dialog/AddStationDialog.vue";
import AddDeviceDialog from "@/components/dialog/AddDeviceDialog.vue";
import mapBoxGl from "mapbox-gl";
import { notice } from "@/utils/commonUtil";
import { getAllStation } from "@/api/request";

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

    const stationList = ref<Station[]>([]);

    const drawStationOrDevice = (param: Station | Device) => {
      console.log(param);
      let paint: { "circle-color": string; "circle-radius": number };
      if ("stationId" in param) {
        paint = {
          "circle-color": "red",
          "circle-radius": 5,
        };
      } else {
        paint = {
          "circle-color": "white",
          "circle-radius": 10,
        };
      }
      map.addSource(param.id, {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "Point",
                coordinates: [param.lon, param.lat],
              },
            },
          ],
        },
      });
      map.addLayer({
        id: param.id,
        source: param.id,
        type: "circle",
        paint: paint,
      });
    };

    const initMap = () => {
      map = new mapBoxGl.Map({
        container: container.value as HTMLElement,
        accessToken:
          "pk.eyJ1Ijoiam9obm55dCIsImEiOiJja2xxNXplNjYwNnhzMm5uYTJtdHVlbTByIn0.f1GfZbFLWjiEayI6hb_Qvg",
        style: "mapbox://styles/johnnyt/cl9mkdnso000q15rlcoxiaab0",
        center: [121.18, 31.723],
        zoom: 8,
      });
      map.on("load", async () => {
        await initData();
      });
    };

    const initData = async () => {
      const stations = await getAllStation();
      if (stations != null && (stations as any).code === 0) {
        stationList.value = stations.data;
        stationList.value.forEach((item) => {
          drawStationOrDevice(item);
        });
      }
    };

    const exportClick = () => {
      window.location.href = "http://172.21.213.244:8008/station/file";
    };

    const addStaionClick = () => {
      stationDialogVisible.value = true;
    };

    const addStation = (val: Station | null) => {
      if (val == null) {
        notice("error", "错误", "添加站点失败");
      } else {
        drawStationOrDevice(val);
        stationList.value.push(val);
        stationDialogVisible.value = false;
      }
    };

    const addDeviceClick = () => {
      deviceDialogVisible.value = true;
    };

    const addDevice = (val: Device) => {
      deviceDialogVisible.value = false;
      drawStationOrDevice(val);
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
      stationList,
    };
  },
});

type Station = {
  id: string;
  name: string;
  department: string;
  lon: number;
  lat: number;
  description: string;
  avatar: string;
};
type Device = {
  id: string;
  name: string;
  stationId: string;
  lon: number;
  lat: number;
  description: string;
  avatar: string;
};
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