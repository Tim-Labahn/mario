import Entity from "./Entity";
import LevelManager from "../Managers/LevelManager";
import GamePhysics from "../Managers/GamePhysics";
import EntityManager from "../Managers/EntityManager";
import Player from "./Player";

export default class DeathBorder extends Entity {
  levelManager: LevelManager;
  entityManager: EntityManager;

  constructor(
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

  tick(gamePhysics: GamePhysics): void {
    this.checkPlayerCollisions(gamePhysics);
  }

  private checkPlayerCollisions(gamePhysics: GamePhysics): void {
    for (const player of this.entityManager.getPlayerList()) {
      if (this.isPlayerAboveDeathBorder(player, gamePhysics)) {
        this.entityManager.removeEntity(player);
      }
    }
  }

  private isPlayerAboveDeathBorder(player: Player, gamePhysics: GamePhysics): boolean {
    return gamePhysics.isCollidingInDirection(this, player, "up", 6);
  }
}
