<template>
  <v-app id="app">
    <page-header />
    <main>
      <v-container fluid>
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </v-container>
    </main>
  </v-app>
</template>

<script>
//import UploadBox from "./components/UploadBox.vue";
import PageHeader from "./components/Header.vue";
export default {
  name: "App",
  components: {
    //UploadBox,
    PageHeader,
  },
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  align-content: center;
  color: #2c3e50;
  margin-top: 100px;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.6s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
