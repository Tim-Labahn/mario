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
    width: number,
    height: number,
    texture: string,
    visionConeWidth: number,
    levelManager: LevelManager,
    entityManager: EntityManager,
    hasMovementCollision: boolean
  ) {
    super(x, y, width, height, texture, visionConeWidth, hasMovementCollision);
    this.levelManager = levelManager;
    this.hasMovementCollision = false;
    this.entityManager = entityManager;
  }
  hasMovementCollision = true;
  public tick(gamePhysics: GamePhysics): void {
    for (const player of this.entityManager.getPlayerList()) {
      //TODO: there is a bug whre player can survive on the border but die on jumping or moving. only had it once so no idea what it was.
      if (gamePhysics.isCollidingInDirection(this, player, "up", 6)) {
        this.entityManager.removeEntity(player);
      }
    }
  }
}
