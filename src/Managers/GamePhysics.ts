import Bullet from "../Entities/Bullet";
import Enemy from "../Entities/Enemy";
import Entity from "../Entities/Entity";
import Player from "../Entities/Player";
import EntityManager from "./EntityManager";
import LevelManager from "./LevelManager";

export default class GamePhysics {
  private entityManager: EntityManager;
  private levelManager: LevelManager;
  private gravity = 2.5; //this is so all objects have same gravity, as it should be.

  public constructor(entityManager: EntityManager, levelManager: LevelManager) {
    this.entityManager = entityManager;
    this.levelManager = levelManager;
  }

  public getGravity() {
    return this.gravity;
  }

  public tick() {
    for (const entity of this.entityManager.getEntityList()) entity.tick(this);
    this.levelManager.tick(this);
  }

  public collidesInDirection(
    entity: Entity | Player,
    direction: "up" | "down" | "left" | "right",
    offset: number
  ) {
    for (const otherEntity of this.entityManager
      .getEntityList()
      .filter((a) => a.hasMovementCollision == true)) {
      if (entity === otherEntity) continue;
      if (direction === "up") {
        if (
          this.isInBoundingBox(
            otherEntity,
            entity.x - entity.height / 2,
            entity.y - entity.height / 2 - offset
          )
        )
          return true;
        if (
          this.isInBoundingBox(
            otherEntity,
            entity.x + entity.height / 2 - 10, //TODO: this might cause problems in future with faling into blocks. but its the easiest way rn to let player fall into holes. it maked the hitbox smaller
            entity.y - entity.height / 2 - offset
          )
        )
          return true;
      }
      if (direction === "down") {
        if (
          this.isInBoundingBox(
            otherEntity,
            entity.x - entity.height / 2 + 10, //TODO: this might cause problems in future with faling into blocks. but its the easiest way rn to let player fall into holes. it maked the hitbox smaller
            entity.y + entity.height / 2 + offset
          )
        )
          return true;
        if (
          this.isInBoundingBox(
            otherEntity,
            entity.x + entity.height / 2,
            entity.y + entity.height / 2 + offset
          )
        )
          return true;
      }
      if (direction === "left") {
        if (
          this.isInBoundingBox(
            otherEntity,
            entity.x - entity.width / 2 - offset,
            entity.y - entity.height / 2
          )
        )
          return true;
        if (
          this.isInBoundingBox(
            otherEntity,
            entity.x - entity.width / 2 - offset,
            entity.y + entity.height / 2
          )
        )
          return true;
      }
      if (direction === "right") {
        if (
          this.isInBoundingBox(
            otherEntity,
            entity.x + entity.width / 2 + offset,
            entity.y - entity.height / 2
          )
        )
          return true;
        if (
          this.isInBoundingBox(
            otherEntity,
            entity.x + entity.width / 2 + offset,
            entity.y + entity.height / 2
          )
        )
          return true;
      }
    }
    return false;
  }

  public getCollidingEntities(
    entity: Entity | Player | Bullet | Enemy,
    offset: number = 3
  ) {
    return this.entityManager
      .getEntityList()
      .filter((e) => e !== entity && this.isColliding(entity, e, offset));
  }

  private isColliding(
    entity1: Entity | Player | Bullet | Enemy,
    entity2: Entity | Player | Bullet | Enemy,
    offset: number
  ) {
    const conditionX =
      entity1.x - entity1.width / 2 - offset < entity2.x + entity2.width / 2;
    const conditionX2 =
      entity1.x + entity1.width / 2 + offset > entity2.x - entity2.width / 2;
    const conditionY =
      entity1.y - entity1.height / 2 - offset < entity2.y + entity2.height / 2;
    const conditionY2 =
      entity1.y + entity1.height / 2 + offset > entity2.y - entity2.height / 2;

    return conditionX && conditionX2 && conditionY && conditionY2;
  }

  private isInBoundingBox(entity: Entity, x: number, y: number) {
    const conditionX =
      x >= entity.x - entity.width / 2 && x <= entity.x + entity.width / 2;
    const conditionY =
      y >= entity.y - entity.height / 2 && y <= entity.y + entity.height / 2;

    return conditionX && conditionY;
  }

  public isCollidingInDirection(
    entity: Entity,
    otherEntity: Entity,
    direction: "up" | "down" | "left" | "right",
    offset: number = 3
  ): boolean {
    switch (direction) {
      case "up":
        return (
          this.isInBoundingBox(
            otherEntity,
            entity.x - entity.width / 2,
            entity.y - entity.height / 2 - offset
          ) ||
          this.isInBoundingBox(
            otherEntity,
            entity.x + entity.width / 2,
            entity.y - entity.height / 2 - offset
          ) ||
          this.isInBoundingBox(
            otherEntity,
            entity.x,
            entity.y - entity.height / 2 - offset
          )
        );
      case "down":
        return (
          this.isInBoundingBox(
            otherEntity,
            entity.x - entity.width / 2,
            entity.y + entity.height / 2 + offset
          ) ||
          this.isInBoundingBox(
            otherEntity,
            entity.x + entity.width / 2,
            entity.y + entity.height / 2 + offset
          ) ||
          this.isInBoundingBox(
            otherEntity,
            entity.x,
            entity.y + entity.height / 2 + offset
          )
        );
      case "left":
        return (
          this.isInBoundingBox(
            otherEntity,
            entity.x - entity.width / 2 - offset,
            entity.y - entity.height / 2
          ) ||
          this.isInBoundingBox(
            otherEntity,
            entity.x - entity.width / 2 - offset,
            entity.y + entity.height / 2
          ) ||
          this.isInBoundingBox(
            otherEntity,
            entity.x - entity.width / 2 - offset,
            entity.y
          )
        );
      case "right":
        return (
          this.isInBoundingBox(
            otherEntity,
            entity.x + entity.width / 2 + offset,
            entity.y - entity.height / 2
          ) ||
          this.isInBoundingBox(
            otherEntity,
            entity.x + entity.width / 2 + offset,
            entity.y + entity.height / 2
          ) ||
          this.isInBoundingBox(
            otherEntity,
            entity.x + entity.width / 2 + offset,
            entity.y
          )
        );
      default:
        return false;
    }
  }
}
