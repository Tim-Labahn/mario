import GamePhysics from "../Managers/GamePhysics";

export default abstract class Entity {
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public texture: string;
  public id: string;
  public hasMovementCollision: boolean;
  public visionConeWidth: number;

  public constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    texture: string,
    visionConeWidth: number,
    hasMovementCollision: boolean
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.texture = texture;
    this.visionConeWidth = visionConeWidth;
    this.hasMovementCollision = hasMovementCollision;
    this.id = Math.random().toString(36).substring(7);
  }

  public abstract tick(gamePhysics: GamePhysics): void;
}
