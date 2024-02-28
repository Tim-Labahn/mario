import Entity from "./Entity";
import GamePhysics from "../Managers/GamePhysics";
import LevelManager from "../Managers/LevelManager";
import Player from "./Player";

export default class Goal extends Entity {
  private levelManager: LevelManager;

  public constructor(
    x: number,
    y: number,
    sizeX: number,
    sizeY: number,
    texture: string,
    levelManager: LevelManager
  ) {
    super(x, y, sizeX, sizeY, texture, "right");

    this.levelManager = levelManager;
  }

  public tick(gamePhysics: GamePhysics) {
    if (
      gamePhysics.getCollidingEntities(this).some((e) => e instanceof Player)
    ) {
      this.texture = "./OpenDoor.png";
      setTimeout(() => {
        this.levelManager.win = true;
        this.levelManager.nextLevel();
        this.levelManager.loadLevel();
        setTimeout(() => {
          this.levelManager.win = false;
        }, 1500)
      }, 400)
    } else {
      this.texture = "./CloseDoor.png";
    }
  }
}
