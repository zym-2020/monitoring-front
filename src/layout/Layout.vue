<template>
  <div class="layout">
    <side class="side-component" />
    <div class="body">
      <header-tool class="header-component" />
      <div class="main-body">
        <div class="content">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderTool from "./components/HeaderTool.vue";
import Side from "./components/SideNav.vue";
export default defineComponent({
  components: { HeaderTool, Side },
  setup() {},
});
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
  display: flex;
  .side-component {
    height: 100%;
  }
  .body {
    width: calc(100% - 250px);
    height: 100%;
    .header-component {
      height: 50px;
    }
    .main-body {
      height: calc(100% - 50px);

      background: #f6f8f9;
      .content {
        padding: 20px;
        height: calc(100% - 40px);
      }
    }
  }
}
</style>

