import Player from "../Entities/Player";
import Wall from "../Entities/Wall";
import EntityManager from "./EntityManager";

const LEVELS = [
  `             
WP
W
W                  W
W         W       WWW
WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW`,
];

export default class LevelManager {
  private entityManager: EntityManager;

  public constructor(entityManager: EntityManager) {
    this.entityManager = entityManager;
  }

  private currentLevel = 0;

  public loadLevel() {
    const map = LEVELS[this.currentLevel].trim();

    this.entityManager.clearEntities();

    map.split("\n").forEach((row, y) => {
      row.split("").forEach((cell, x) => {
        if (cell === "W")
          this.entityManager.addEntity(
            new Wall(x * 50 + 50, y * 50 + 50, 50, 50, "./Wall.png")
          );

        if (cell === "P")
          this.entityManager.addEntity(
            new Player(x * 50 + 50, y * 50 + 50, 40, 40, "./Player.png")
          );
      });
    });
  }
}
