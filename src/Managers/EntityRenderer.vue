<script lang="ts" setup>
import Entity from "../Entities/Entity";

defineProps<{ entity: Entity }>();
</script>

<template>
  <div
    :style="{
      position: 'absolute',
      left: `${entity.x - entity.width / 2}px`,
      top: `${entity.y - entity.height / 2}px`,
      width: `${entity.width}px`,
      height: `${entity.height}px`,
      backgroundImage: `url(${entity.texture})`,
      backgroundSize: 'cover',
      transform: `scaleX(${entity.moveDirection == 'right' ? 1 : -1})`,
    }"
    :id="entity.id"
  ></div>
</template>

<style>
.mask2 {
  mask-image: radial-gradient(
    circle at 200px 200px,
    rgba(0, 0, 0, 1) 50px,
    rgba(255, 255, 255, 0) 50px
  );
}
</style>
