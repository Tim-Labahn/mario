import Entity from "./Entity";
import GamePhysics from "../Managers/GamePhysics";
import EntityManager from "../Managers/EntityManager";
import LevelManager from "../Managers/LevelManager";
import Wall from "./Wall";

export default class Bullet extends Entity {
  protected hasMovementCollision = true;
  levelManager: LevelManager;
  entityManager: EntityManager;
  public tick(gamePhysics: GamePhysics) {
    this.x += this.moveDirection == "left" ? -15 : 15;

    if (
      gamePhysics.getCollidingEntities(this, 2).filter((e) => e instanceof Wall)
        .length
    ) {
      this.entityManager.removeEntity(this);
    }
  }
  public constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    texture: string,
    levelManager: LevelManager,
    entityManager: EntityManager,
    moveDirection: string
  ) {
    super(x, y, width, height, texture, "right");
    this.levelManager = levelManager;
    this.entityManager = entityManager;
    this.moveDirection = moveDirection;
  }
}
