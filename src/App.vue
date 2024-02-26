<script setup lang="ts">
import Renderer from "./Managers/Renderer.vue";
import EntityManager from "./Managers/EntityManager";
import LevelManager from "./Managers/LevelManager";
import GamePhysics from "./Managers/GamePhysics";

const entityManager = new EntityManager();

const levelManager = new LevelManager(entityManager);
const gamePhysics = new GamePhysics(entityManager, levelManager);

levelManager.loadLevel();

setInterval(() => {
  gamePhysics.tick();
}, 10);
</script>

<template>
  <Renderer
    :entityManager="entityManager"
    :levelManager="levelManager"
  ></Renderer>
</template>

<style scoped></style>
