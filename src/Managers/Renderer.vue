<script lang="ts" setup>
import EntityManager from "./EntityManager";
import EntityRenderer from "./EntityRenderer.vue";

defineProps<{ entityManager: EntityManager }>();
</script>

<template>
  <EntityRenderer
    v-for="entity in entityManager.getEntityList()"
    :entity="entity"
  ></EntityRenderer>
</template>
