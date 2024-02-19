import { shallowRef, shallowReactive } from "vue";
import Entity from "../Entities/Entity";
import Player from "../Entities/Player";

export default class EntityManager {
  private entityList = shallowRef<Entity[]>([]);

  public clearEntities() {
    for (const entity of this.entityList.value) this.removeEntity(entity);
  }

  public getEntityList() {
    return this.entityList.value;
  }

  public addEntity(entity: Entity) {
    this.entityList.value.push(shallowReactive(entity));
  }
  public removeEntity(entity: Entity) {
    this.entityList.value = this.entityList.value.filter((e) => e !== entity);
  }
  public getPlayer() {
    for (const entity of this.entityList.value) {
      if (entity instanceof Player) {
        return entity;
      }
    }
  }
}
