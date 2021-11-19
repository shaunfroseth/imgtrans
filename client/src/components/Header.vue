<template>
  <v-app-bar dense fixed dark color="grey darken-3">
    <v-app-bar-title>
      <v-btn plain left class="title pl-0" @click="redirectHome"
        >ImgTrans</v-btn
      >
    </v-app-bar-title>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    redirectHome() {
      this.$router.push({ path: "/" });
    },
  },
};
</script>
<style>
.v-toolbar__content {
  margin-bottom: 110px;
}
</style>
