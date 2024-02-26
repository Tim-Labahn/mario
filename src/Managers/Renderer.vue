<script lang="ts" setup>
import { computed } from "vue";
import EntityManager from "./EntityManager";
import EntityRenderer from "./EntityRenderer.vue";
import LevelManager from "./LevelManager";

const props = defineProps<{
  entityManager: EntityManager;
  levelManager: LevelManager;
}>();

const screenOffset = computed(
  () => `calc(50vw - ${props.entityManager.getPlayer()?.x}px)`
);
</script>

<template>
  <div class="mapWrapper">
    <div style="position: absolute" :style="{ left: screenOffset }">
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
