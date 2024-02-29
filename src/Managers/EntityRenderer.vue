<script lang="ts" setup>
import Entity from "../Entities/Entity";
import Player from "../Entities/Player";

const props = defineProps<{ entity: Entity }>();

function isPlayer() {
  return props.entity instanceof Player;
}
</script>

<template>
  <div
    v-if="isPlayer()"
    style="
      width: 110vw;
      height: 150vh;
      background-color: rgba(101, 255, 12, 0.411);
      position: absolute;
      inset: 0;
      z-index: 1;
      clip-path: polygon(
        0% 0%,
        0% 100%,
        45% 100%,
        45% 45%,
        65% 45%,
        65% 65%,
        45% 65%,
        45% 100%,
        100% 100%,
        100% 0%
      );
    "
    :style="{
      left: `${entity.x}px`,
      top: `${entity.y - entity.height}px`,
      transform: `translate(-50%, -50%) scaleX(${
        entity.moveDirection == 'right' ? 1 : -1
      })`,
    }"
    id="visionCone"
  ></div>
  <div
    :style="{
      position: 'absolute',
      left: `${entity.x - entity.width / 2}px`,
      top: `${entity.y - entity.height / 2}px`,
      width: `${entity.width}px`,
      height: `${entity.height}px`,
      backgroundImage: `url(${entity.texture})`,
      backgroundSize: 'cover',
      transform: `scaleX(${entity.moveDirection == 'right' ? -1 : 1})`,
    }"
    :id="entity.id"
  ></div>
</template>
