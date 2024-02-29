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
  private gravity = 3;
  private jumpForce = 5;
  private jumpTicksLeft = 0;
  private bulletCooldown = 0;
  private bulletInMag = 10;
  private gunReloadingTicksLeft = 30;
  public stopPlayerMovement = false;
  private walking = false;

  public tick(gamePhysics: GamePhysics) {
    const bulletCooldownValue = 10;
    const canShoot = this.bulletCooldown === 0;
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
      this.walking = true;
      this.moveDirection = "left";
      this.x -= this.movementSpeed;
    }

    if (wantMove("right") && canMove("right", this.movementSpeed)) {
      this.walking = true;
      this.moveDirection = "right";
      this.x += this.movementSpeed;
    }

    if (wantMove("shoot") && canShoot && this.bulletInMag) {
      this.gunReloadingTicksLeft = 60;
      this.bulletCooldown = bulletCooldownValue;
      this.entityManager.addEntity(
        new Bullet(
          this.x -
            (this.moveDirection == "right"
              ? -20
              : 20) /*This is the ofset from the mullet of the gun to where it should spawn so it does not spawn in player.*/,
          this.y - 13,
          10,
          5,
          "./Bullet.png",
          this.levelManager,
          this.entityManager,
          this.moveDirection
        )
      );
      this.bulletInMag--;
    }
    if (!this.bulletInMag) {
      this.gunReloadingTicksLeft--;
    }
    if (this.gunReloadingTicksLeft < 1) {
      this.bulletInMag = 10;
    }

    if (this.walking) {
      this.texture = "./Player/Move/Frame1.png";
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

  public getAmmunition(): Number {
    return this.bulletInMag;
  }
}
