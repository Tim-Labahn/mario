import { shallowRef, shallowReactive } from "vue";
import Entity from "../Entities/Entity";
import Player from "../Entities/Player";

export default class EntityManager {
  private entityList = shallowRef<Entity[]>([]);
  public playerList = <Player[]>[];
  public clearEntities() {
    for (const entity of this.entityList.value) this.removeEntity(entity);
  }

  public getEntityList() {
    return this.entityList.value;
  }

  public addEntity(entity: Entity) {
    this.entityList.value = [...this.entityList.value, shallowReactive(entity)];
  }
  public removeEntity(entity: Entity) {
    this.entityList.value = this.entityList.value.filter((e) => e !== entity);
  }
  public getPlayerList() {
    return this.getEntityList().filter((a) => a instanceof Player);
  }
}
