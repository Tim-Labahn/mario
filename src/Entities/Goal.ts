// Goal.ts
import LevelManager from "../Managers/LevelManager";
import Door from "./Door";

export default class Goal extends Door {
  public constructor(
    x: number,
    y: number,
    sizeX: number,
    sizeY: number,
    texture: string,
    levelManager: LevelManager,
    hasMovementCollision: boolean
  ) {
    super(x, y, sizeX, sizeY, texture, levelManager, hasMovementCollision);
  }

  protected onPlayerInteract() {
    this.texture = "./OpenDoor.png";
    setTimeout(() => {
      this.levelManager.win = true;
      this.levelManager.nextLevel();
      this.levelManager.loadLevel();
      setTimeout(() => {
        this.levelManager.win = false;
      }, 1500);
    }, 400);
  }

  protected onPlayerNotInteract() {
    this.texture = "./CloseDoor.png";
  }

  public getPositionX(): number {
    return this.x;
  }

  public getPositionY(): number {
    return this.y;
  }
}
