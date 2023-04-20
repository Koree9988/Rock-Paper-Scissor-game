<template>
  <q-page>
    <div class="q-px-xl q-py-sm">
      <div class="row q-ma-sm">
        <div class="col text-center">
          <img
            src="../../public/img/logo.png"
            style="max-width: 150px; max-height: 150px"
          />
        </div>
      </div>
      <q-space />
      <div class="row q-mt-md">
        <div class="col text-center text-h4">ROCK PAPER SCISSOR GAME</div>
      </div>
      <q-card class="my-card">
        <q-card-section class="bg-secondary text-white q-my-md">
          <div class="text-center text-h5">GAME INFORMATION</div>
        </q-card-section>
        <q-card-section class="bg-white text-dark    q-mx-xl">
          <div class="row text-h6">
            Rock-Paper-Scissors is a classic two-player game in which each
            player simultaneously chooses one of three hand gestures: rock,
            paper, or scissors. The game has the following rules:
          </div>

          <div class="row text-h6 q-mx-xl">
            1. Rock beats scissors: A rock gesture beats scissors because a rock
            can break scissors.
          </div>

          <div class="row text-h6 q-mx-xl">
            2. Scissors beat paper: Scissors beat paper because scissors can cut
            paper.
          </div>
          <div class="row text-h6 q-mx-xl">
            3. Paper beats rock: Paper beats rock because paper can wrap rock.
          </div>
          <div class="row text-h6">
            If both players choose the same gesture, the game is a tie.
          </div>
        </q-card-section>

        <q-card-actions align="around">
          <q-btn
            color="secondary"
            to="/menu"
            class="menuBtn text-h6"
            label="Back"
          />
          <q-btn
            color="secondary"
            to="/start"
            class="menuBtn text-h6"
            label="Play game"
          />
        </q-card-actions>
      </q-card>
    </div>
    >
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
  name: "GameInfo",
  mounted() {
    const audio = new Audio("/sound/rule.mp3");
    audio.play();
  },
};
</script>
