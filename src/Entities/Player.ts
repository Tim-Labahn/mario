import KeyboardHandler from "../Singletons/KeyboardHandler";
import GamePhysics from "../Managers/GamePhysics";
import Entity from "./Entity";
import LevelManager from "../Managers/LevelManager";
import EntityManager from "../Managers/EntityManager";
import Bullet from "./Bullet";

export default class Player extends Entity {
  keyboardHandler: KeyboardHandler;
  levelManager: LevelManager;
  entityManager: EntityManager;
  private movementSpeed = 3;
  private gravity = 2.1;
  private jumpForce = 6;
  private jumpTicksLeft = 0;
  private bulletCooldown = 0;
  public stopPlayerMovement = false;
  public tick(gamePhysics: GamePhysics) {
    if (this.levelManager.win || this.levelManager.loseScreen.value) return;
    const canMove = (
      direction: "up" | "down" | "left" | "right",
      offset: number
    ) => {
      return !gamePhysics.collidesInDirection(this, direction, offset);
    };

    const wantMove = (direction: "up" | "left" | "right" | "shoot") => {
      return this.keyboardHandler.isKeyDown(this.getMovementKey(direction));
    };

    // Decrease bulletCooldown if it's greater than zero
    if (this.bulletCooldown > 0) {
      this.bulletCooldown--;
    }

    // Check if the player can shoot based on bulletCooldown
    const canShoot = this.bulletCooldown === 0;

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

    if (wantMove("left") && canMove("left", this.movementSpeed)) {
      this.moveDirection = "left";
      this.x -= this.movementSpeed;
    }

    if (wantMove("right") && canMove("right", this.movementSpeed)) {
      this.moveDirection = "right";
      this.x += this.movementSpeed;
    }

    const bulletCooldownValue = 20;

    if (wantMove("shoot") && canShoot) {
      this.bulletCooldown = bulletCooldownValue;
      this.entityManager.addEntity(
        new Bullet(
          this.x,
          this.y + 13,
          10,
          5,
          "./Bullet.png",
          this.levelManager,
          this.entityManager,
          this.moveDirection
        )
      );
    }
  }

  public constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    texture: string,
    levelManager: LevelManager,
    entityManager: EntityManager,
    direction: "right" | "left"
  ) {
    super(x, y, width, height, texture, direction);
    this.levelManager = levelManager;
    this.keyboardHandler = KeyboardHandler.getInstance();
    this.entityManager = entityManager;
  }

  private movementKeys = {
    up: " ",
    left: "a",
    right: "d",
    shoot: "s",
  };

  public setMovementKeys(
    up: string,
    left: string,
    right: string,
    shoot: string
  ) {
    this.movementKeys = { up, left, right, shoot };
  }
  public getMovementKey(key: "up" | "left" | "right" | "shoot") {
    return this.movementKeys[key];
  }
}
