import Entity from "./Entity";
import GamePhysics from "../Managers/GamePhysics";
import LevelManager from "../Managers/LevelManager";
import Player from "./Player";
import KeyboardHandler from "../Singletons/KeyboardHandler";

export default class Entrance extends Entity {
  private levelManager: LevelManager;
  private keyboardHandler: KeyboardHandler;

  public constructor(
    x: number,
    y: number,
    sizeX: number,
    sizeY: number,
    texture: string,
    levelManager: LevelManager,
    hasMovementCollision: boolean
  ) {
    super(x, y, sizeX, sizeY, texture, 3, hasMovementCollision);
    this.keyboardHandler = KeyboardHandler.getInstance();
    this.levelManager = levelManager;
  }

  public tick(gamePhysics: GamePhysics) {
    if (
      gamePhysics.getCollidingEntities(this).some((e) => e instanceof Player) &&
      this.keyboardHandler.isKeyDown("e")
    ) {
      this.texture = "./OpenDoor.png";
      setTimeout(() => {
        this.levelManager.win = true;
        this.levelManager.nextLevel();
        this.levelManager.loadLevel();
        setTimeout(() => {
          this.levelManager.win = false;
        }, 1500);
      }, 400);
    } else {
      this.texture = "./CloseDoor.png";
    }
  }
}
