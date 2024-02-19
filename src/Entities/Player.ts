import KeyboardHandler from "../Singletons/KeyboardHandler";
import GamePhysics from "../Managers/GamePhysics";
import Entity from "./Entity";

export default class Player extends Entity {
  keyboardHandler: KeyboardHandler;

  public movementSpeed = 3;

  private gravity = 2;
  public tick(gamePhysics: GamePhysics) {
    console.log(this.x, this.y);
    if (!gamePhysics.collidesInDirection(this, "down", this.gravity)) {
      this.y += this.gravity; // You should define gravity as a constant value
    }

    if (
      this.keyboardHandler.isKeyDown(this.getMovementKey("up")) &&
      !gamePhysics.collidesInDirection(this, "up", this.movementSpeed)
    )
      this.y -= this.movementSpeed;
    if (
      this.keyboardHandler.isKeyDown(this.getMovementKey("left")) &&
      !gamePhysics.collidesInDirection(this, "left", this.movementSpeed)
    )
      this.x -= this.movementSpeed;
    if (
      this.keyboardHandler.isKeyDown(this.getMovementKey("right")) &&
      !gamePhysics.collidesInDirection(this, "right", this.movementSpeed)
    )
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
