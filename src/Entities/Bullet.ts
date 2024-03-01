import GamePhysics from "../Managers/GamePhysics";
import EntityManager from "../Managers/EntityManager";
import LevelManager from "../Managers/LevelManager";
import Wall from "./Wall";
import Player from "./Player";
import Enemy from "./Enemy";
import { MoveableEntity } from "./MoveableEntity";

export default class Bullet extends MoveableEntity {
  hasMovementCollision = true;
  levelManager: LevelManager;
  entityManager: EntityManager;

  public constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    texture: string,
    levelManager: LevelManager,
    entityManager: EntityManager,
    moveDirection: "left" | "right",
    movementSpeed: number,
    visonConeWidth: number,
    hasMovementCollision: boolean
  ) {
    super(
      x,
      y,
      width,
      height,
      texture,
      movementSpeed,
      visonConeWidth,
      hasMovementCollision,
      moveDirection
    );
    this.levelManager = levelManager;
    this.entityManager = entityManager;
  }

  public tick(gamePhysics: GamePhysics) {
    this.x += this.getMoveDirection() == "left" ? -20 : 20;

    if (
      gamePhysics
        .getCollidingEntities(this, 1)
        .filter((e) => !(e instanceof Player)).length
    ) {
      if (
        gamePhysics
          .getCollidingEntities(this, 1)
          .filter((e) => e instanceof Wall)
      ) {
        this.entityManager.removeEntity(this);
      }
      if (
        gamePhysics
          .getCollidingEntities(this, 1)
          .filter((e) => e instanceof Enemy)
      ) {
        for (let enemy of gamePhysics
          .getCollidingEntities(this, 1)
          .filter((e) => e instanceof Enemy)) {
          this.entityManager.removeEntity(enemy);
        }
        this.entityManager.removeEntity(this);
      }
    }
  }
}
