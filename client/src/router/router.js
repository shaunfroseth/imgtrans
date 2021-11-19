import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../components/HomePage";
import UploadBox from "../components/UploadBox";

Vue.use(VueRouter);

const routes = [
  {
    name: "Home",
    path: "/",
    component: HomePage,
  },
  {
    name: "Upload",
    path: "/upload",
    component: UploadBox,
  },
];

const router = new VueRouter({
  mode: "history",
  //base: "192.168.0.13:8080",
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;
