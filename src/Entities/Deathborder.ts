import Entity from "./Entity";
import LevelManager from "../Managers/LevelManager";
import GamePhysics from "../Managers/GamePhysics";
import EntityManager from "../Managers/EntityManager";

export default class DeathBorder extends Entity {
  levelManager: LevelManager;
  entityManager: EntityManager;
  public constructor(
    x: number,
    y: number,
    sizeX: number,
    sizeY: number,
    texture: string,
    moveDirection: "left" | "right",
    levelManager: LevelManager,
    entityManager: EntityManager,
  ) {
    super(x, y, sizeX, sizeY, texture, moveDirection);
    this.levelManager = levelManager;
    this.hasMovementCollision = true;
    this.entityManager = entityManager;
  }
  protected hasMovementCollision = true;
  public tick(gamePhysics: GamePhysics): void {
    for (const player of this.entityManager.getPlayerList()) {
      if (
        gamePhysics.isCollidingInDirection(this, player, "up")
      ) {
        this.entityManager.removeEntity(player);
      }
    }
  }
}
