import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Layout from "@/layout/Layout.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "",
        name: "Home",
        component: Home,
        meta: {
          title: "首页",
        },
      },
    ],
  },
  {
    path: "/map",
    component: Layout,
    children: [
      {
        path: "",
        name: "Map",
        component: () => import("@/views/Map.vue"),
        meta: {
          title: "地图",
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
