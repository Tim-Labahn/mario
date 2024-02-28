import Entity from "../Entities/Entity";
import EntityManager from "./EntityManager";
import LevelManager from "./LevelManager";

export default class GamePhysics {
  private entityManager: EntityManager;
  private levelManager: LevelManager;
  private gravity=2 //this is so all objects have same gravity, as it should be.

  public constructor(entityManager: EntityManager, levelManager: LevelManager,gravity:number) {
    this.entityManager = entityManager;
    this.levelManager = levelManager;
    this.gravity=gravity;
  }

  public getGravity(){
  return this.gravity
  }

  public tick() {
    for (const entity of this.entityManager.getEntityList()) entity.tick(this);
    this.levelManager.tick(this);
  }

  public collidesInDirection(
    entity: Entity,
    direction: "up" | "down" | "left" | "right",
    offset: number
  ) {
    for (const otherEntity of this.entityManager
      .getEntityList()
      .filter((a) => a.getMovementCollision())) {
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
            entity.x + entity.height / 2,
            entity.y - entity.height / 2 - offset
          )
        )
          return true;
      }
      if (direction === "down") {
        if (
          this.isInBoundingBox(
            otherEntity,
            entity.x - entity.height / 2,
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

  public getCollidingEntities(entity: Entity, offset: number = 3) {
    return this.entityManager
      .getEntityList()
      .filter((e) => e !== entity && this.isColliding(entity, e, offset));
  }

  private isColliding(entity1: Entity, entity2: Entity, offset: number) {
    return (
      entity1.x - entity1.width / 2 - offset < entity2.x + entity2.width / 2 &&
      entity1.x + entity1.width / 2 + offset > entity2.x - entity2.width / 2 &&
      entity1.y - entity1.height / 2 - offset <
        entity2.y + entity2.height / 2 &&
      entity1.y + entity1.height / 2 + offset > entity2.y - entity2.height / 2
    );
  }

  private isInBoundingBox(entity: Entity, x: number, y: number) {
    return (
      x > entity.x - entity.width / 2 &&
      x < entity.x + entity.width / 2 &&
      y > entity.y - entity.height / 2 &&
      y < entity.y + entity.height / 2
    );
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
          )
        );
      default:
        return false;
    }
  }
}
