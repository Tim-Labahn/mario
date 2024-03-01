import GamePhysics from "../Managers/GamePhysics";
import Entity from "./Entity";

export abstract class MoveableEntity extends Entity {
  private movementSpeed: number;
  private moveDirection: "right" | "left";

  public constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    texture: string,
    movementSpeed: number,
    visionConeWidth: number,
    hasMovementCollision: boolean,
    moveDirection: "right" | "left"
  ) {
    super(x, y, width, height, texture, visionConeWidth, hasMovementCollision);
    this.movementSpeed = movementSpeed;
    this.moveDirection = moveDirection;
  }

  public move(): void {}

  public getMovementSpeed(): number {
    return this.movementSpeed;
  }

  public getMoveDirection(): "right" | "left" {
    return this.moveDirection;
  }

  public setMoveDirection(direction: "right" | "left"): void {
    this.moveDirection = direction;
  }

  public abstract tick(gamePhysics: GamePhysics): void;
}
