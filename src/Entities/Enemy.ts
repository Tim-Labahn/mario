import Entity from "./Entity";
import GamePhysics from "../Managers/GamePhysics";
import LevelManager from "../Managers/LevelManager";
import EntityManager from "../Managers/EntityManager";
import Bullet from "./Bullet";

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
    super(x, y, sizeX, sizeY, texture, "right");
    this.levelManager = levelManager;
    this.entityManager = entityManager;
    this.hasMovementCollision = true;
  }
  private gravity = 2.3;
  private moveSpeed = 1;

  public getMoveDirection() {
    return this.moveDirection;
  }

  public tick(gamePhysics: GamePhysics) {
    const wantMove = (direction: "right" | "left") => {
      return this.moveDirection == direction;
    };

    const canMove = (direction: "down" | "up" | "right" | "left") => {
      return !gamePhysics.collidesInDirection(this, direction, this.moveSpeed);
    };

    const canFall =()=>{
      return !gamePhysics.collidesInDirection(this, "down", this.gravity);
    }

    if (
      gamePhysics
        .getCollidingEntities(this, 1)
        .filter((e) => e instanceof Bullet).length
    ) {
      this.entityManager.removeEntity(this);
    }
    for (const player of this.entityManager.getPlayerList()) {
      if (
        gamePhysics.isCollidingInDirection(this, player, "left") ||
        gamePhysics.isCollidingInDirection(this, player, "right") ||
        gamePhysics.isCollidingInDirection(this, player, "down")
      ) {
        this.entityManager.removeEntity(player);
      }
    }

    if (this.levelManager.win || this.levelManager.loseScreen.value) return;
    for (const player of this.entityManager.getPlayerList()) {
      if (gamePhysics.isCollidingInDirection(this, player, "up")) {
        this.entityManager.removeEntity(this);
      }
    }

    if (canFall()) {
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
