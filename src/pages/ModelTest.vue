<template>

  <div>
    <video ref="video" autoplay></video>
    <button @click="capture">Capture</button>
    <img ref="image" />
  </div>
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
      rock: false,
      paper: false,
      scissor: false,
      button: "Play",
      stream: null,
      classNames: ["paper", "rock",  "scissor"],
    };
  },
  mounted() {
    // async function loadModel() {

    //   const Nmodel = await tf.loadLayersModel('http://localhost:3000/model');
    //   // this.model = Nmodel
    //   console.log(Nmodel.summary());
    // }

    // loadModel();
    // this.model = await tf.loadModel("../services/model.json")
    this.startCamera();
  },
  methods: {
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
      this.$refs.image.src = imgData;
      this.stopCamera();
      this.predict(imgData);
    },
    stopCamera() {
      this.stream.getTracks().forEach((track) => track.stop());
      this.$refs.video.srcObject = null;
    },
    async predict(imgData) {
      const Nmodel = await tf.loadLayersModel('http://localhost:3000/model');
      let image = new Image(200, 200);
      image.src = imgData;
      let input = await tf.browser.fromPixels(image);
      input =await input.div(255.0);
      input =await input.expandDims(0);
      const prediction =await Nmodel.predict(input);
      console.log("🚀  prediction:", prediction.dataSync())
      const pIndex = await  tf.argMax(prediction.dataSync());
      console.log("Prediction Result :", this.classNames[pIndex.dataSync()[0]]);
    },
    playSound() {
      setTimeout(() => {
        const audio = new Audio("/path/to/sound.mp3");
        audio.play();
      }, 3000);
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
