<template>
  <q-page >
    <div class="q-mx-xl q-my-md">
      <div class="row q-my-xl">
        <div class="col-2 text-left">
          <q-btn
          color="secondary"
          class="menu text-h6"
          to="/menu"
          label="Back to Menu"
        />
        </div>
        <div class="col-8 text-center text-h3 text-bold">ROCK PAPER SCISSOR GAME</div>
        <div class="col-2 text-center">
          <q-btn
            color="secondary"
            class="menu text-h6"
            @click="startGame"
            :label="button"
          />
        </div>
      </div>
      <div class="row">
        <div class="col text-center text-h4 text-bold">{{ result }}</div>
      </div>
      <div class="row" v-if="capStatus" >
        <video class="col text-center sign" ref="video" autoplay></video>
      </div>
      <div class="row q-mx-auto">
        <img v-if="button == 'Back'" :src="imageSrc" class="col text-center sign"/>
        <img class="col text-center sign" ref="image"  />
      </div>
      <div class="row">
        <div class="col text-center text-h5">{{ comPred }}</div>
        <div class="col text-center text-h5">{{ manPred }}</div>
      </div>
      <!-- <div class="row text-center q-mป-sm">
        <div class="col text-center">
          <q-btn
            color="secondary"
            class="menuBtn text-h6"
            @click="startGame"
            :label="button"
          />
        </div>
      </div> -->
    </div>
  </q-page>
</template>
<style>
.menu {
  height: 50px;
  width:100%;
}
.btnStart {
  height: 60px;
}
.sign {
  width: 300px;
  height: 300px;
}
</style>
<script>
import * as tf from "@tensorflow/tfjs";

export default {
  data() {
    return {
      result:"",
      capStatus:true,
      imageData: null,
      rock: false,
      paper: false,
      scissor: false,
      imageSrc:'',
      button: "Play",
      stream: null,
      manPred:'',
      comPred:'',
      classNames: ["paper", "rock", "scissors"],
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
    const audio = new Audio("/sound/clickplay.mp3");
    audio.play();
  },
  methods: {
    async startGame() {
      if(this.button=='Play'){
        this.$refs.image.src = null;
        await this.playSound(this.soundName.count);
        await new Promise(resolve => setTimeout(resolve, 3000))
        await this.startCamera();
        await new Promise(resolve => setTimeout(resolve, 1500))
        await this.capture()
        await new Promise(resolve => setTimeout(resolve, 200))
        await this.stopCamera()
        await new Promise(resolve => setTimeout(resolve, 200))
        this.capStatus = false
        await new Promise(resolve => setTimeout(resolve, 200))
        await this.checkResult()
        // this.capStatus = false
      }else{
        this.randomChoice()
        this.capStatus = true
        this.result=""
      }
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
      this.stream.getTracks().forEach((track) => track.stop());
      this.$refs.video.srcObject = null;
    },
    async predict(imgData) {
      const Nmodel = await tf.loadLayersModel("/model/model.json");
      let image = new Image(200, 200);
      image.src = imgData;
      let input = await tf.browser.fromPixels(image);
      input = await input.div(255.0);
      input = await input.expandDims(0);
      this.randomChoice();
      const prediction = await Nmodel.predict(input);
      console.log("🚀  prediction:", prediction.dataSync());
      const pIndex = await tf.argMax(prediction.dataSync());
      console.log("Prediction Result :", this.classNames[pIndex.dataSync()[0]]);
      this.manPred = this.classNames[pIndex.dataSync()[0]]
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
          this.rock = true;
          this.paper = false;
          this.scissor = false;
          this.button = "Back";
          this.imageSrc = "/img/rock.png";
          this.comPred = 'rock'
        } else if (randomSign == 1 || randomSign == 4) {
          this.rock = false;
          this.paper = true;
          this.scissor = false;
          this.button = "Back";
          this.imageSrc = "/img/paper.png";
          this.comPred = 'paper'
        } else if (randomSign == 2 || randomSign == 5) {
          this.rock = false;
          this.paper = false;
          this.scissor = true;
          this.button = "Back";
          this.imageSrc = "/img/scissor.png";
          this.comPred = 'scissors'
        }
      } else {
        this.rock = false;
        this.paper = false;
        this.scissor = false;
        this.comPred = ''
        this.button = "Play";
      }
      console.log("🚀  randomSign:", this.comPred);
    },
    async checkResult(){
      if(this.manPred == this.comPred){
        this.result="Draw"
        await this.playSound(`/sound/Com-${this.comPred}.mp3`);
        await new Promise(resolve => setTimeout(resolve, 1500))
        await this.playSound(`/sound/You-${this.manPred}.mp3`);
        await new Promise(resolve => setTimeout(resolve, 1500))
        await this.playSound(this.soundName.same);

      }else if((this.manPred=='rock' && this.comPred=='scissors')|| (this.manPred=='scissors' && this.comPred=='paper' )||(this.manPred=='paper' && this.comPred=='rock' )){
        this.result="You are the winner!!"
        await this.playSound(`/sound/Com-${this.comPred}.mp3`);
        await new Promise(resolve => setTimeout(resolve, 1500))
        await this.playSound(`/sound/You-${this.manPred}.mp3`);
        await new Promise(resolve => setTimeout(resolve, 1500))
        await this.playSound(this.soundName.win);

      }else{
        this.result="You lose!!"
        await this.playSound(`/sound/Com-${this.comPred}.mp3`);
        await new Promise(resolve => setTimeout(resolve, 1500))
        await this.playSound(`/sound/You-${this.manPred}.mp3`);
        await new Promise(resolve => setTimeout(resolve, 1500))
        await this.playSound(this.soundName.lose);
      }
    }
  },
};
</script>

