<script setup lang="ts">
import Renderer from "./Managers/Renderer.vue";
import EntityManager from "./Managers/EntityManager";
import LevelManager from "./Managers/LevelManager";
import GamePhysics from "./Managers/GamePhysics";
import { ref } from "vue";

const entityManager = new EntityManager();

const levelManager = new LevelManager(entityManager);
const gamePhysics = new GamePhysics(entityManager, levelManager);
const rendererRef = ref<InstanceType<typeof Renderer> | null>(null);
levelManager.loadLevel();

setInterval(() => {
  gamePhysics.tick();
  rendererRef.value?.tick();
}, 1000 / 60);
</script>

<template>
  <Renderer
    ref="rendererRef"
    :entityManager="entityManager"
    :levelManager="levelManager"
  ></Renderer>
</template>

<style scoped></style>
