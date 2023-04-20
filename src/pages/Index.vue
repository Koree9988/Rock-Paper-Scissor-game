<template>
  <q-page class="flex flex-center">
    <div class="q-pa-xl">
      <div class="row">
        <div class="col text-center">
          <img
            src="../../public/img/logo.png"
            style="max-width: 350px; max-height: 350px;"
          />
        </div>
      </div>
      <q-space />
      <div class="row">
        <div class="col text-center text-h3">ROCK PAPER SCISSOR GAME</div>
      </div>
      <div class="row q-mt-sm">
        <div class="col">
          <q-btn color="secondary" class="btnStart full-width text-h5" to="/menu" label="Start Game" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<style>
.btnStart{
  height: 60px;
}
</style>

<script>

</script>
