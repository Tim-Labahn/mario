<script lang="ts" setup>
import { computed, ref } from "vue";
import EntityManager from "./EntityManager";
import EntityRenderer from "./EntityRenderer.vue";
import LevelManager from "./LevelManager";

const props = defineProps<{
  entityManager: EntityManager;
  levelManager: LevelManager;
}>();

const screenOffset = computed(
  () =>
    props.entityManager.getPlayerList().reduce((a, b) => a + b.x, 0) /
    props.entityManager.getPlayerList().length
);
let currentX = ref(screenOffset.value);
function tick() {
  currentX.value = currentX.value * 0.93 + screenOffset.value * 0.07;
  if (!currentX.value) {
    currentX.value = screenOffset.value;
  }
}
defineExpose({ tick });
</script>

<template>
  <div id="Debug" style="color: white; text-shadow: 1px 1px 2px black">
    Entities: {{ entityManager.getEntityList().length }} <br />
    Player: X:
    {{ entityManager.getPlayerList().find((e) => e)?.x }}
    Y:
    {{ entityManager.getPlayerList().find((e) => e)?.y }}
    <br />
  </div>
  <div class="mapWrapper">
    <div
      style="position: absolute; zoom: 160%"
      :style="{
        left: `calc(33vw - ${currentX}px)`,
        height: `${
          Math.max(...entityManager.getEntityList().map((e) => e.y)) + 100
        }px`,
        width: `${
          Math.max(...entityManager.getEntityList().map((e) => e.x)) + 100
        }px`,
        maskImage: entityManager
          .getPlayerList()
          .map(
            (e) => `radial-gradient(
          circle at ${e.x}px ${e.y}px,
          rgba(0, 0, 0, 1) 0px,
          rgba(255, 255, 255, 0) 120px
        )`
          )
          .join(', '),
      }"
    >
      <EntityRenderer
        v-for="entity in entityManager.getEntityList()"
        :entity="entity"
      ></EntityRenderer>
    </div>
  </div>
  <div
    id="AmmoDisplay"
    style="position: fixed; bottom: 10px; right: 10px; color: white"
  >
    Ammo Left:
    {{ entityManager.getPlayerList().map((e) => e.getAmmunition()) }}
  </div>
  <dialog :open="levelManager.loseScreen.value">
    YOU DIED
    <button
      @click="levelManager.loadLevel(), (levelManager.loseScreen.value = false)"
    >
      Restart
    </button>
  </dialog>
  <div
    v-if="levelManager.win"
    style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: black;
      z-index: 9999;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-size: 24px;
    "
  >
    Loading...
  </div>
</template>
<style scoped>
.mapWrapper {
  height: 100%;
  position: absolute;
  top: 30%;
}
</style>
