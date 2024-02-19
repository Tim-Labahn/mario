<script setup lang="ts">
import Renderer from "./Managers/Renderer.vue";
import GamePhysics from "./Managers/GamePhysics";
import EntityManager from "./Managers/EntityManager";
import LevelManager from "./Managers/LevelManager";

const entityManager = new EntityManager();
const levelManager = new LevelManager(entityManager);
const gamePhysics = new GamePhysics(entityManager);

levelManager.loadLevel();

setInterval(() => {
  gamePhysics.tick();
}, 10);
</script>

<template><Renderer :entityManager="entityManager"></Renderer></template>

<style scoped></style>
