<template>
  <q-page>
    <div class="q-pa-xl">
      <div class="row q-ma-md">
        <div class="col text-center">
          <img
            src="../../public/img/logo.png"
            style="max-width: 150px; max-height: 150px"
          />
        </div>
      </div>
      <q-space />
      <div class="row q-ma-md">
        <div class="col text-center text-h5">ROCK PAPER SCISSOR GAME</div>
      </div>
      <div class="text-center q-ma-sm">
        <q-btn
          color="secondary"
          class="menuBtn text-h6"
          to="/info"
          label="Game Info"
        />
      </div>
      <div class="text-center q-ma-sm">
        <q-btn
          color="secondary"
          class="menuBtn text-h6"
          to="/start"
          label="Start Game"
        />
      </div>
      <div class="text-center q-ma-sm">
        <div>
          <div></div>
          <q-btn
            color="secondary"
            class="menuBtn text-h6"
            to="/dev"
            label="About Developer"
          />
        </div>
      </div>
      <div>
        <div class="text-center q-ma-sm">
          <q-btn color="secondary" to="/" class="menuBtn text-h6" label="Quit Game" />
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
</style>
<script>
export default {
  name: "Menu",
};
</script>
