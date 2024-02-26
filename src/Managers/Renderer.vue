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
  currentX.value = currentX.value * 0.98 + screenOffset.value * 0.02;
  if (!currentX.value) {
    currentX.value = screenOffset.value;
  }
}
defineExpose({ tick });
</script>

<template>
  Entities: {{ entityManager.getEntityList().length }}
  <div class="mapWrapper">
    <div
      style="position: absolute"
      :style="{ left: `calc(50vw - ${currentX}px)` }"
    >
      <EntityRenderer
        v-for="entity in entityManager.getEntityList()"
        :entity="entity"
      ></EntityRenderer>
    </div>
  </div>
  <dialog :open="levelManager.loseScreen.value">
    YOU DIED
    <button
      @click="levelManager.loadLevel(), (levelManager.loseScreen.value = false)"
    >
      Restart
    </button>
  </dialog>
  <dialog :open="levelManager.win">
    YOU WON
    <button
      @click="
        () => {
          levelManager.win = false;
          levelManager.nextLevel();
          levelManager.loadLevel();
        }
      "
    >
      Next Level
    </button>
  </dialog>
</template>
<style scoped>
.mapWrapper {
  height: 100%;
  position: absolute;
  top: 30%;
}
</style>
