import Entity from "./Entity";
import GamePhysics from "../Managers/GamePhysics";
import LevelManager from "../Managers/LevelManager";
import Player from "./Player";

export default class DeathBorder extends Entity {
  levelManager: LevelManager;
  public constructor(
    x: number,
    y: number,
    sizeX: number,
    sizeY: number,
    texture: string,
    levelManager: LevelManager
  ) {
    super(x, y, sizeX, sizeY, texture);
    this.levelManager = levelManager;
    this.hasMovementCollision = true;
  }

  protected hasMovementCollision = true;
  public tick(gamePhysics: GamePhysics) {
    if (
      gamePhysics.getCollidingEntities(this).some((e) => e instanceof Player)
    ) {
      this.levelManager.loadLevel();
    }
  }
}
