import GamePhysics from "../Managers/GamePhysics";

export default abstract class Entity {
  public texture: string;
  public id: string;

  public constructor(texture: string) {
    this.texture = texture;
    this.id = Math.random().toString(36).substring(7);
  }

  public abstract tick(gamePhysics: GamePhysics): void;
}

export class MoveableEntity extends Entity {
  private movementSpeed: number;
  private positionX: number;
  private positionY: number;

  public constructor(texture: string, movementSpeed: number,positionX:number,positionY:number) {
    super(texture);
    this.movementSpeed = movementSpeed;
    this.positionX = positionX
    this.positionY = positionY
  }

  public getMovementSpeed(): number {
    return this.movementSpeed;
  }

  public setMovementSpeed(speed: number): void {
    this.movementSpeed = speed;
  }

  public tick(_: GamePhysics): void {
    // Implement tick logic for MoveableEntity
  }
}
