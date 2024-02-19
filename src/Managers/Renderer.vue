<script lang="ts" setup>
import { computed } from "vue";
import EntityManager from "./EntityManager";
import EntityRenderer from "./EntityRenderer.vue";

const props = defineProps<{ entityManager: EntityManager }>();

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
</template>
<style scoped>
.mapWrapper {
  height: 100%;
  position: absolute;
  top: 30%;
}
</style>
