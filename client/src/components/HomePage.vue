<template>
  <div class="welcome">
    <h1>WELCOME TO</h1>
    <h2>IMAGETRANS</h2>
    <h3 class="mb-16">A tool to analyze text from images for translation</h3>
    <v-btn fab x-large @click="redirectToUpload">
      <v-icon>mdi-arrow-right-bold</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    redirectToUpload() {
      this.$router.push({ path: "/upload" });
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 2.75rem;
  line-height: 2.75rem;
  letter-spacing: 0.0073529412em !important;
  word-spacing: 0.2em;
  font-weight: 300;
}

h2 {
  font-size: 3.75rem;
  line-height: 3.75rem;
  letter-spacing: -0.053333333em !important;
  word-spacing: 0.2em;
  font-weight: 900;
}

.welcome {
  position: absolute;
  left: 50%;
  top: 40%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  font-family: "Roboto";
}

@media (max-width: 500px) {
  h1 {
    font-size: 2rem !important;
    line-height: 2rem;
  }
}
</style>
