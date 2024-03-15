import KeyboardHandler from "../Singletons/KeyboardHandler";
import GamePhysics from "../Managers/GamePhysics";
import LevelManager from "../Managers/LevelManager";
import EntityManager from "../Managers/EntityManager";
import Bullet from "./Bullet";
import { MoveableEntity } from "./MoveableEntity";

export default class Player extends MoveableEntity {
  keyboardHandler: KeyboardHandler;
  levelManager: LevelManager;
  entityManager: EntityManager;

  private jumpForce = 5;
  private jumpTicksLeft = 0;
  private bulletCooldown = 0;
  private bulletInMag = 10;
  private gunReloadingTicksLeft = 30;
  private walking = false;
  private walkingState = 1;
  private walkingTicksLeft = 8;

  private movementKeys = {
    up: " ",
    left: "a",
    right: "d",
    shoot: "s",
  };

  constructor(
    x: number,
    y: number,
    width: number = 10,
    height: number = 5,
    texture: string,
    movementSpeed: number,
    visionConeWidth: number,
    levelManager: LevelManager,
    entityManager: EntityManager,
    hasMovementCollision: boolean,
    moveDirection: "right" | "left"
  ) {
    super(
      x,
      y,
      width,
      height,
      texture,
      movementSpeed,
      visionConeWidth,
      hasMovementCollision,
      moveDirection
    );
    this.levelManager = levelManager;
    this.entityManager = entityManager;
    this.keyboardHandler = KeyboardHandler.getInstance();
  }

  setMovementKeys(up: string, left: string, right: string, shoot: string) {
    this.movementKeys = { up, left, right, shoot };
  }

  getMovementKey(key: "up" | "left" | "right" | "shoot") {
    return this.movementKeys[key];
  }

  getPositionX() {
    return this.x;
  }

  getPositionY() {
    return this.y;
  }

  private handleShootingAnimation() {
    const shootingFrames = ["Frame1", "Frame2", "Frame3", "Frame4", "Frame5"];
    const frameDuration = 60;

    shootingFrames.forEach((frame, i) => {
      setTimeout(() => {
        this.texture = `./Player/Shoot/${frame}.png`;
        this.width = 60;
      }, i * frameDuration);
    });
  }

  tick(gamePhysics: GamePhysics) {
    const bulletCooldownValue = 10;
    const canShoot = this.bulletCooldown === 0;

    if (this.levelManager.win || this.levelManager.loseScreen.value) return;

    const canMove = (
      direction: "up" | "down" | "left" | "right",
      offset: number
    ) => !gamePhysics.collidesInDirection(this, direction, offset);

    const wantMove = (direction: "up" | "left" | "right" | "shoot") =>
      this.keyboardHandler.isKeyDown(this.getMovementKey(direction));

    if (this.bulletCooldown > 0) this.bulletCooldown--;

    if (canMove("down", gamePhysics.getGravity()))
      this.y += gamePhysics.getGravity();

    if (!canMove("down", gamePhysics.getGravity()) && wantMove("up"))
      this.jumpTicksLeft = 30;

    if (this.jumpTicksLeft && canMove("up", this.jumpForce)) {
      this.jumpTicksLeft--;
      this.y -= this.jumpForce;
    }

    if (!canMove("up", this.jumpForce)) this.jumpTicksLeft = 0;

    let isWalking = false;
    if (
      wantMove("left") &&
      canMove("left", this.getMovementSpeed()) &&
      !wantMove("shoot")
    ) {
      isWalking = true;
      this.setMoveDirection("left");
      this.x -= this.getMovementSpeed();
    }

    if (
      wantMove("right") &&
      canMove("right", this.getMovementSpeed()) &&
      !wantMove("shoot")
    ) {
      isWalking = true;
      this.setMoveDirection("right");
      this.x += this.getMovementSpeed();
    }

    this.walking = isWalking;

    if (wantMove("shoot") && canShoot && this.bulletInMag) {
      this.handleShootingAnimation();

      this.gunReloadingTicksLeft = 60;
      this.bulletCooldown = bulletCooldownValue;

      const bullet = new Bullet(
        this.x - (this.getMoveDirection() == "right" ? -20 : 20),
        this.y - 13,
        10,
        5,
        "./Bullet.png",
        this.levelManager,
        this.entityManager,
        this.getMoveDirection(),
        this.getMovementSpeed(),
        1,
        this.hasMovementCollision
      );

      this.entityManager.addEntity(bullet);
      this.bulletInMag--;
    }

    if (!this.bulletInMag) this.gunReloadingTicksLeft--;

    if (this.gunReloadingTicksLeft < 1) this.bulletInMag = 10;

    if (!this.walkingTicksLeft) {
      this.walkingTicksLeft = 8;
      if (this.walking) {
        this.walkingState = (this.walkingState % 7) + 1;

        this.width = 40;
        this.height = 80;
        this.texture = `./Player/Move/Frame${this.walkingState}.png`;
      }
    } else {
      this.walkingTicksLeft--;
    }
  }

  getAmmunition(): Number {
    return this.bulletInMag;
  }
}
