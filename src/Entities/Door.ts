import Entity from "./Entity";
import GamePhysics from "../Managers/GamePhysics";
import LevelManager from "../Managers/LevelManager";
import Player from "./Player";
import KeyboardHandler from "../Singletons/KeyboardHandler";

export default class Door extends Entity {
  protected levelManager: LevelManager;
  protected keyboardHandler: KeyboardHandler;

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
      this.onPlayerInteract();
    } else {
      this.onPlayerNotInteract();
    }
  }

  protected onPlayerInteract() {
    // Logic to be executed when the player interacts with the door
    this.levelManager.win = true;
    this.levelManager.nextLevel();
    this.levelManager.loadLevel();
    setTimeout(() => {
      this.levelManager.win = false;
    }, 1500);
  }

  protected onPlayerNotInteract() {
    // Logic to be executed when the player is not interacting with the door
  }
}
