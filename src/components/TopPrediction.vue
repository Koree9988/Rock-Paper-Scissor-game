<!-- <template>
  <div>
    <input type="file" @change="predict">
    <img :src="image">
    <div v-if="prediction">
      {{ prediction }}
    </div>
  </div>
</template>

<script>
import * as tf from '@tensorflow/tfjs';
import modelJson from './model.json';

export default {
  data() {
    return {
      model: null,
      image: null,
      prediction: null
    }
  },
  async mounted() {
    this.model = await tf.loadLayersModel(modelJson);
  },
  methods: {
    async predict(event) {
      const file = event.target.files[0];
      const image = await this.prepareImage(file);
      const prediction = await this.model.predict(image).data();
      this.prediction = prediction;
    },
    async prepareImage(file) {
      const img = new Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onload = () => {
          img.onload = () => {
            canvas.width = this.model.inputShape[1];
            canvas.height = this.model.inputShape[2];
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            const tensor = tf.browser.fromPixels(canvas);
            const normalized = tensor.div(255.0).expandDims();
            resolve(normalized);
          };
          img.src = reader.result;
        };
        reader.readAsDataURL(file);
      });
    }
  }
}
</script> -->


<template>
  <q-page class="flex flex-center">
    <div class="q-pa-xl">
      <q-space />
      <div class="row">
        <div class="col text-center text-h5">ROCK PAPER SCISSOR GAME</div>
      </div>
      <!-- <div class="row">
        <div class="col text-center">
          <img v-if="button == 'Back'" :src="imageSrc" class="sign" />
        </div>
      </div> -->
      <div class="row">
          <video ref="video" autoplay></video>
          <button @click="capture">Capture</button>
          <img ref="image" />
      </div>
      <div class="row text-center q-ma-sm">
        <div class="col text-center">
          <q-btn
            color="secondary"
            class="menuBtn text-h6"
            @click="startGame"
            :label="button"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>
<style>
.menuBtn {
  max-width: 400px;
  min-width: 350px;
  height: 50px;
}
.btnStart {
  height: 60px;
}
.sign {
  max-width: 450px;
  max-height: 450px;
}
</style>
<script>
import * as tf from "@tensorflow/tfjs";

export default {
  data() {
    return {
      imageData: null,
      rock: false,
      paper: false,
      scissor: false,
      button: "Play",
      stream: null,
      classNames: ["paper", "rock", "scissor"],
      soundName: {
        play: "/sound/clickplay.mp3",
        comrock: "/sound/Com-rock.mp3",
        compaper: "/sound/Com-paper.mp3",
        comscissors: "/sound/Com-scissors.mp3",
        count: "/sound/count.mp3",
        lose: "/sound/lose.mp3",
        win: "/sound/win.mp3",
        same: "/sound/same.mp3",
        rule: "/sound/rule.mp3",
        yrock: "/sound/You-rock.mp3",
        ypaper: "/sound/You-paper.mp3",
        yscissors: "/sound/You-scissors.mp3",
      },
    };
  },
  mounted() {
    // async function loadModel() {

    //   const Nmodel = await tf.loadLayersModel('http://localhost:3000/model');
    //   // this.model = Nmodel
    //   console.log(Nmodel.summary());
    // }
    const audio = new Audio("/sound/clickplay.mp3");
    audio.play();
    // loadModel();
    // this.model = await tf.loadModel("../services/model.json")
  },
  methods: {
    async startGame() {
      // await this.playSound(this.soundName.count);
      await setTimeout(this.playSound(this.soundName.count), 3100);
      await setTimeout(this.startCamera(), 1000);
      await setTimeout(this.capture(), 1000);
      await setTimeout(this.stopCamera(), 1000);

      // await this.startCamera();
      // await this.capture();
      // await this.stopCamera();
    },
    async startCamera() {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      this.$refs.video.srcObject = this.stream;
    },
    capture() {
      const canvas = document.createElement("canvas");
      const video = this.$refs.video;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0);
      const imgData = canvas.toDataURL();
      this.imageData = imgData;
      this.$refs.image.src = imgData;

      this.stopCamera();
      this.predict(imgData);
    },
    stopCamera() {
      // this.stream.getTracks().forEach((track) => track.stop());
      this.$refs.video.srcObject = null;
    },
    async predict(imgData) {
      const Nmodel = await tf.loadLayersModel("http://localhost:3000/model");
      let image = new Image(200, 200);
      image.src = imgData;
      let input = await tf.browser.fromPixels(image);
      input = await input.div(255.0);
      input = await input.expandDims(0);
      const prediction = await Nmodel.predict(input);
      console.log("🚀  prediction:", prediction.dataSync());
      const pIndex = await tf.argMax(prediction.dataSync());
      console.log("Prediction Result :", this.classNames[pIndex.dataSync()[0]]);
    },
    playSound(sound) {
      const audio = new Audio(sound);
      audio.play();
    },
    randomChoice() {
      if (this.button == "Play") {
        const randomSign = Math.floor(Math.random() * 6);
        console.log("🚀  randomSign:", randomSign);

        if (randomSign == 0 || randomSign == 3) {
          this.rock = false;
          this.paper = false;
          this.scissor = false;
          this.button = "Back";
          this.imageSrc = "/img/rock.png";
        } else if (randomSign == 1 || randomSign == 4) {
          this.rock = false;
          this.paper = true;
          this.scissor = false;
          this.button = "Back";
          this.imageSrc = "/img/paper.png";
        } else if (randomSign == 2 || randomSign == 5) {
          this.rock = false;
          this.paper = false;
          this.scissor = true;
          this.button = "Back";
          this.imageSrc = "/img/scissor.png";
        }
      } else {
        this.rock = false;
        this.paper = false;
        this.scissor = false;
        this.button = "Play";
      }
    },
  },
};
</script>

