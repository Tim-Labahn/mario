import Entity from "./Entity";
import GamePhysics from "../Managers/GamePhysics";
import LevelManager from "../Managers/LevelManager";
import EntityManager from "../Managers/EntityManager";
import Bullet from "./Bullet";
import { MoveableEntity } from "./MoveableEntity";

export default class Enemy extends MoveableEntity {
  levelManager: LevelManager;
  entityManager: EntityManager;
  private walkingTicksLeft: number = 0;
  private walking: boolean = false;
  private walkingState: number = 1;
  public constructor(
    x: number,
    y: number,
    width: number,
    heigth: number,
    texture: string,
    moveSpeed: number,
    moveDirection: "left" | "right",
    levelManager: LevelManager,
    entityManager: EntityManager,
    visionConeWidth: number = 0,
    hasMovementCollision: boolean
  ) {
    super(
      x,
      y,
      width,
      heigth,
      texture,
      moveSpeed,
      visionConeWidth,
      hasMovementCollision,
      moveDirection
    );
    this.levelManager = levelManager;
    this.entityManager = entityManager;
    this.hasMovementCollision = true;
  }

  public tick(gamePhysics: GamePhysics) {
    const wantMove = (direction: "right" | "left") => {
      return this.getMoveDirection() == direction;
    };

    const canMove = (direction: "down" | "up" | "right" | "left") => {
      return !gamePhysics.collidesInDirection(
        this,
        direction,
        this.getMovementSpeed()
      );
    };

    const canFall = () => {
      return !gamePhysics.collidesInDirection(
        this,
        "down",
        gamePhysics.getGravity()
      );
    };

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
      this.y += gamePhysics.getGravity();
    }

    let isWalking = false;
    if (wantMove("right") && canMove("right")) {
      isWalking = true;
      this.x += this.getMovementSpeed();
    } else if (wantMove("right") && !canMove("right")) {
      this.setMoveDirection("left");
    }

    if (wantMove("left") && canMove("left")) {
      isWalking = true;
      this.x -= this.getMovementSpeed();
    } else if (wantMove("left") && !canMove("left")) {
      this.setMoveDirection("right");
    }
    this.walking = isWalking;

    if (!this.walkingTicksLeft) {
      this.walkingTicksLeft = 10;
      if (this.walking) {
        this.walkingState++;
        this.texture = "./Enemy/Move/Frame" + this.walkingState + ".png";
      }
      if (this.walkingState >= 8) {
        this.walkingState = 1;
      }
    } else {
      this.walkingTicksLeft--;
    }
  }
}
