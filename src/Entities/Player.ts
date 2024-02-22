import KeyboardHandler from "../Singletons/KeyboardHandler";
import GamePhysics from "../Managers/GamePhysics";
import Entity from "./Entity";

export default class Player extends Entity {
  keyboardHandler: KeyboardHandler;

  private movementSpeed = 3;
  private jumpForce = 6;
  private gravity = 2.3;
  private jumpTicksLeft = 0;

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

    if (wantMove("left") && canMove("left", this.movementSpeed))
      this.x -= this.movementSpeed;
    if (wantMove("right") && canMove("right", this.movementSpeed))
      this.x += this.movementSpeed;
  }

  public constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    texture: string
  ) {
    super(x, y, width, height, texture);

    this.keyboardHandler = KeyboardHandler.getInstance();
  }

  private movementKeys = {
    up: " ",
    left: "a",
    right: "d",
  };

  public setMovementKeys(up: string, left: string, right: string) {
    this.movementKeys = { up, left, right };
  }

  public getMovementKey(key: "up" | "left" | "right") {
    return this.movementKeys[key];
  }
}
