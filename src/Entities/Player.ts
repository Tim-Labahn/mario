import KeyboardHandler from "../Singletons/KeyboardHandler";
import GamePhysics from "../Managers/GamePhysics";
import Entity from "./Entity";
import LevelManager from "../Managers/LevelManager";

export default class Player extends Entity {
  keyboardHandler: KeyboardHandler;
  levelManager: LevelManager;
  private movementSpeed = 3;
  private jumpForce = 6;
  private gravity = 2.2;
  private jumpTicksLeft = 0;
  public stopPlayerMovement = false;
  public tick(gamePhysics: GamePhysics) {
    const canMove = (
      direction: "up" | "down" | "left" | "right",
      offset: number
    ) => {
      return !gamePhysics.collidesInDirection(this, direction, offset);
    };

    const wantMove = (direction: "up" | "left" | "right") => {
      return this.keyboardHandler.isKeyDown(this.getMovementKey(direction));
    };
    if (this.levelManager.win || this.levelManager.loseScreen.value) return;
    if (canMove("down", this.gravity)) {
      this.y += this.gravity;
    }

    if (!canMove("down", this.gravity) && wantMove("up")) {
      this.jumpTicksLeft = 30;
    }

    if (this.jumpTicksLeft && canMove("up", this.jumpForce)) {
      this.jumpTicksLeft--;
      this.y -= this.jumpForce;
    }
    if (!canMove("up", this.jumpForce)) {
      this.jumpTicksLeft = 0;
    }

    if (wantMove("left") && canMove("left", this.movementSpeed)) {
      this.moveDirection = "left";
      this.x -= this.movementSpeed;
    }
    if (wantMove("right") && canMove("right", this.movementSpeed)) {
      this.moveDirection = "right";
      this.x += this.movementSpeed;
    }
  }

  public constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    texture: string,
    levelManager: LevelManager
  ) {
    super(x, y, width, height, texture, "right");
    this.levelManager = levelManager;
    this.keyboardHandler = KeyboardHandler.getInstance();
  }

  private movementKeys = {
    up: " ",
    left: "a",
    right: "d",
    shoot: "s",
  };

  public setMovementKeys(
    up: string,
    left: string,
    right: string,
    shoot: string
  ) {
    this.movementKeys = { up, left, right, shoot };
  }
  public getMovementKey(key: "up" | "left" | "right" | "shoot") {
    return this.movementKeys[key];
  }
}
