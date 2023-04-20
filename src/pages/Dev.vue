<template>
  <q-page>
    <div class="q-px-xl q-py-sm">
      <div class="row q-mt-md">
        <div class="col text-center text-h4"></div>
      </div>
      <q-card class="my-card">
        <q-card-section class="bg-secondary text-white q-my-md">
          <div class="text-center text-h5">DEVELOP BY</div>
        </q-card-section>
        <q-card-section class="bg-white text-dark q-mx-xl">
          <div class="row q-ma-sm">
            <div class="col text-center">
              <img
                src="../../public/img/9456.jpg"
                style="max-width: 150px; max-height: 150px"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-2"></div>
            <div class="col-8 text-center">
              <q-card>
                <q-card-section class="bg-white text-dark q-mx-xl q-mt-md">
                  <div class="row">
                    <div class="col text-center">
                      <div class="row text-bold text-subtitle1">
                        <div class="col-4 text-left">NAME-SURNAME:</div>
                        <div class="col text-left">BUKORE KALONG</div>
                      </div>
                      <div class="row text-bold text-subtitle1">
                        <div class="col-4 text-left">STUDENT-ID:</div>
                        <div class="col text-left">6330603010</div>
                      </div>
                      <div class="row text-bold text-subtitle1">
                        <div class="col-4 text-left">MAJOR:</div>
                        <div class="col text-left">DIGITAL ENGINEERING</div>
                      </div>
                      <div class="row text-bold text-subtitle1">
                        <div class="col-4 text-left">UNIVERSITY:</div>
                        <div class="col text-left">PRINCE OF SONGKLA UNIVERSITY</div>
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-2"></div>
          </div>
        </q-card-section>

        <q-card-actions align="around">
          <q-btn
            color="secondary"
            to="/menu"
            class="menuBtn text-h6"
            label="Back"
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
};
</script>
