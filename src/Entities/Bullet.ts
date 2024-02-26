import Entity from "./Entity";
import GamePhysics from "../Managers/GamePhysics";
import EntityManager from "../Managers/EntityManager";
import LevelManager from "../Managers/LevelManager";

export default class Bullet extends Entity {
  protected hasMovementCollision = true;
  levelManager: LevelManager;
  entityManager: EntityManager;
  public tick(gamePhysics: GamePhysics) {
    this.x++;

    if (gamePhysics.getCollidingEntities(this, 2)) {
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
    entityManager: EntityManager
  ) {
    super(x, y, width, height, texture, "right");
    this.levelManager = levelManager;
    this.entityManager = entityManager;
  }
}
