<template>
  <div class="hello">
    <!-- File Upload Container -->
    <div background="grey darken-3" class="fileBox">
      <v-file-input
        class="my-4"
        accept="image/png, image/jpeg"
        name="file"
        small-chips
        show-size
        :rules="rules"
        truncate-length="15"
        placeholder="Upload file (only jpeg/png allowed)..."
        @change="fileSelected"
        @click:clear="
          message = '';
          resultText = '';
          translatedText = '';
          returnFile = null;
          uploadError = false;
          submitPressed = false;
        "
        @update:error="errorHandler"
      >
      </v-file-input>
      <!-- Buttons (Select/Translate) -->
      <v-row justify="center">
        <v-dialog v-model="dialog" scrollable max-width="300px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="ma-2"
              color="primary"
              :disabled="!file || uploadError"
              v-bind="attrs"
              v-on="on"
              @click="message = ''"
            >
              Select Language
            </v-btn>
            <v-btn
              @click="submitFile"
              :disabled="!file || dialogm1 == '' || uploadError"
              class="ma-2"
              >Translate</v-btn
            >
          </template>
          <!-- Language Selector -->
          <v-card>
            <v-card-title>Select a Language</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 300px;">
              <v-radio-group v-model="dialogm1" column>
                <v-radio label="Arabic" value="ar"></v-radio>
                <v-radio label="Czech" value="cs"></v-radio>
                <v-radio label="Danish" value="da"></v-radio>
                <v-radio label="Dutch" value="nl"></v-radio>
                <v-radio label="English" value="en"></v-radio>
                <v-radio label="French" value="fr"></v-radio>
                <v-radio label="German" value="de"></v-radio>
                <v-radio label="Greek" value="el"></v-radio>
                <v-radio label="Hindi" value="hi"></v-radio>
                <v-radio label="Italian" value="it"></v-radio>
                <v-radio label="Japanese" value="ja"></v-radio>
                <v-radio label="Korean" value="ko"></v-radio>
                <v-radio label="Persian" value="fa"></v-radio>
                <v-radio label="Polish" value="pl"></v-radio>
                <v-radio label="Portuguese" value="pt"></v-radio>
                <v-radio label="Russian" value="ru"></v-radio>
                <v-radio label="Serbian" value="sr"></v-radio>
                <v-radio label="Spanish" value="es"></v-radio>
                <v-radio label="Swedish" value="sv"></v-radio>
                <v-radio label="Vietnamese" value="vi"></v-radio>
              </v-radio-group>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Close
              </v-btn>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <!-- Output -->
      <div v-show="returnFile" class="outputResult">
        <figure>
          <img class="centered my-4" :src="returnFile" alt="" />
          <hr />
          <h4>Extracted Text:</h4>
          <figcaption>{{ resultText }}</figcaption>
          <h4>Translated Text:</h4>
          <figcaption>{{ translatedText }}</figcaption>
        </figure>
      </div>
    </div>
    <!-- Progress Bar -->
    <div v-if="submitPressed" class="progress-bar">
      <v-col>
        <p>Fetching text ...</p>
        <v-progress-linear
          class="my-4"
          color="blue darken-1"
          indeterminate
          rounded
          height="6"
        ></v-progress-linear>
      </v-col>
    </div>

    <!-- TO-DO:  Implement text outliner
      <div>
      <div id="imgContainer">
        <img src="@/assets/pictest.jpg" />
        <canvas
          width="500"
          height="649"
          ref="myCanvas"
          class="canvas-overlay"
        ></canvas>
      </div>
      <button @click="draw">Draw</button>
    </div> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "UploadBox",
  data() {
    return {
      file: null,
      uploadError: false,
      returnFile: null,
      resultText: "",
      uploadedFiles: [],
      translatedText: "",
      dialogm1: "",
      dialog: false,
      message: "",
      error: false,
      submitPressed: false,
      rules: [
        (value) =>
          !value ||
          value.size < 200000 ||
          "Image size should be greater than 200 KB!",
      ],
    };
  },
  props: {
    msg: String,
  },
  methods: {
    errorHandler(value) {
      if (value) this.uploadError = true;
      console.log(value);
    },
    draw() {
      let c = this.$refs["myCanvas"];
      const canvas = c.getContext("2d");
      canvas.beginPath();
      canvas.rect(118, 113, 401 - 118, 222 - 113);
      canvas.stroke();
      canvas.beginPath();
      canvas.rect(86, 435, 427 - 86, 555 - 435);
      canvas.stroke();
    },
    fileSelected(event) {
      this.file = event;
      this.error = false;
    },
    async submitFile() {
      this.submitPressed = true;
      const fd = new FormData();
      fd.append("file", this.file, this.file.name);
      fd.append("dialog", this.dialogm1);

      try {
        const response = await axios.post(
          "http://192.168.254.130:5000/upload",
          fd
        );
        this.resultText = response.data.results;
        this.translatedText = response.data.translatedResults;
        this.returnFile = response.data.file;
        console.log(response.data.file);
        this.error = false;
      } catch (err) {
        this.message = err.response.data.error;
        this.error = true;
      }
      this.submitPressed = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  width: 100%;
}
.fileBox {
  width: 80%;
  margin: auto;
}

.v-input {
  font-size: 14px;
}

.v-text-field {
  left: 100px;
}
.outputResult {
  margin: 50px;
}
.centered {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
img {
  height: auto;
  width: 400px;
}
figcaption {
  margin-top: 0px;
}
.canvas-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  width: 100%;
  height: 100%;
}

.canvas-wrapper {
  position: relative;
}
.progress-bar {
  height: 500px;
  width: 75%;
  margin: auto;
  display: flex;
  align-items: center;
}
div#imgContainer {
  /* min-width: 200px;
  min-height: 200px; */
  display: inline-block;
  position: relative;
}
@media (max-width: 500px) {
  img {
    height: auto;
    width: 80%;
  }
}
</style>
