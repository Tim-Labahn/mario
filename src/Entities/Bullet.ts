import GamePhysics from "../Managers/GamePhysics";
import EntityManager from "../Managers/EntityManager";
import LevelManager from "../Managers/LevelManager";
import Wall from "./Wall";
import Enemy from "./Enemy";
import { MoveableEntity } from "./MoveableEntity";

export default class Bullet extends MoveableEntity {
  levelManager: LevelManager;
  entityManager: EntityManager;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    texture: string,
    levelManager: LevelManager,
    entityManager: EntityManager,
    moveDirection: "left" | "right",
    movementSpeed: number,
    visionConeWidth: number,
    hasMovementCollision: boolean
  ) {
    super(x, y, width, height, texture, movementSpeed, visionConeWidth, hasMovementCollision, moveDirection);
    this.levelManager = levelManager;
    this.entityManager = entityManager;
    this.hasMovementCollision = true; // You had it duplicated in your code
  }

  tick(gamePhysics: GamePhysics) {
    this.moveBullet();
    this.handleCollisions(gamePhysics);
  }

  private moveBullet() {
    this.x += this.getMoveDirection() == "left" ? -20 : 20;
  }

  private handleCollisions(gamePhysics: GamePhysics) {
    const collidingEntities = gamePhysics.getCollidingEntities(this, 1);

    const walls = collidingEntities.filter((e) => e instanceof Wall);
    const enemies = collidingEntities.filter((e) => e instanceof Enemy);

    if (walls.length) {
      this.entityManager.removeEntity(this);
    }

    if (enemies.length) {
      enemies.forEach((enemy) => this.entityManager.removeEntity(enemy));
      this.entityManager.removeEntity(this);
    }
  }
}
