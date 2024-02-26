import GamePhysics from "../Managers/GamePhysics";

export default abstract class Entity {
  public x: number;
  public y: number;

  public width: number;
  public height: number;

  public texture: string;

  public id: string;

  public moveDirection: string;

  public constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    texture: string,
    moveDirection: "left" | "right"
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.texture = texture;
    this.moveDirection = moveDirection;
    this.id = Math.random().toString(36).substring(7);
  }

  protected hasMovementCollision = true;

  public getMovementCollision() {
    return this.hasMovementCollision;
  }

  public abstract tick(gamePhysics: GamePhysics): void;
}
