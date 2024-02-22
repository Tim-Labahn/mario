import Entity from "./Entity";
import GamePhysics from "../Managers/GamePhysics";
import LevelManager from "../Managers/LevelManager";
import Player from "./Player";

export default class Enemy extends Entity {
  levelManager: LevelManager;
  public constructor(
    x: number,
    y: number,
    sizeX: number,
    sizeY: number,
    texture: string,
    levelManager: LevelManager
  ) {
    super(x, y, sizeX, sizeY, texture);
    this.levelManager = levelManager;
    this.hasMovementCollision = true;
  }

  private moveSpeed = 1;

  private moveDirection = "left";

  public tick(gamePhysics: GamePhysics) {
    const wantMove = (direction: "right" | "left") => {
      return this.moveDirection == direction;
    };

    const canMove = (direction: "right" | "left") => {
      return gamePhysics.collidesInDirection(this, direction, this.moveSpeed);
    };

    if (wantMove("right") && canMove("right")) {
      this.x += this.moveSpeed;
    }
    if (
      this.moveDirection == "right" &&
      gamePhysics.collidesInDirection(this, "right", 1)
    ) {
      this.moveDirection = "left";
    }
    if (
      this.moveDirection == "left" &&
      !gamePhysics.collidesInDirection(this, "left", 1)
    ) {
      this.x -= this.moveSpeed;
    } else if (
      this.moveDirection == "left" &&
      gamePhysics.collidesInDirection(this, "left", 1)
    ) {
      this.moveDirection = "right";
    }

    if (
      gamePhysics.getCollidingEntities(this).some((e) => e instanceof Player)
    ) {
      this.levelManager.loadLevel();
    }
  }
}
