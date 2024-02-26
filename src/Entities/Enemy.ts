import Entity from "./Entity";
import GamePhysics from "../Managers/GamePhysics";
import LevelManager from "../Managers/LevelManager";
import Player from "./Player";
import EntityManager from "../Managers/EntityManager";

export default class Enemy extends Entity {
  levelManager: LevelManager;
  entityManager: EntityManager;
  public constructor(
    x: number,
    y: number,
    sizeX: number,
    sizeY: number,
    texture: string,
    levelManager: LevelManager,
    entityManager: EntityManager
  ) {
    super(x, y, sizeX, sizeY, texture);
    this.levelManager = levelManager;
    this.entityManager = entityManager;
    this.hasMovementCollision = true;
  }
  private gravity = 2.3;
  private moveSpeed = 1;
  private moveDirection = "left";

  public tick(gamePhysics: GamePhysics) {
    const wantMove = (direction: "right" | "left") => {
      return this.moveDirection == direction;
    };

    const canMove = (direction: "down" | "up" | "right" | "left") => {
      return !gamePhysics.collidesInDirection(this, direction, this.moveSpeed);
    };
    if (
      gamePhysics.isCollidingInDirection(
        this,
        this.entityManager.getEntityList().find((a) => a instanceof Player)!,
        "up"
      )
    ) {
      this.entityManager.removeEntity(this);
    }
    if (
      gamePhysics.isCollidingInDirection(
        this,
        this.entityManager.getEntityList().find((a) => a instanceof Player)!,
        "left"
      ) ||
      gamePhysics.isCollidingInDirection(
        this,
        this.entityManager.getEntityList().find((a) => a instanceof Player)!,
        "right"
      ) ||
      gamePhysics.isCollidingInDirection(
        this,
        this.entityManager.getEntityList().find((a) => a instanceof Player)!,
        "down"
      )
    ) {
      this.levelManager.loseScreen.value = true;
    }
    if (this.levelManager.win || this.levelManager.loseScreen.value) return;
    if (canMove("down")) {
      this.y += this.gravity;
    }
    if (wantMove("right") && canMove("right")) {
      this.x += this.moveSpeed;
    }
    if (wantMove("right") && !canMove("right")) {
      this.moveDirection = "left";
    }
    if (wantMove("left") && canMove("left")) {
      this.x -= this.moveSpeed;
    } else if (wantMove("left") && !canMove("left")) {
      this.moveDirection = "right";
    }
  }
}
