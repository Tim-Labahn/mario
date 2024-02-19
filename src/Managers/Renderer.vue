<script lang="ts" setup>
import EntityManager from "./EntityManager";
import EntityRenderer from "./EntityRenderer.vue";

defineProps<{ entityManager: EntityManager }>();
console.log("this exists");
</script>

<template>
  <EntityRenderer
    v-for="entity in entityManager.getEntityList()"
    :entity="entity"
  ></EntityRenderer>
</template>
