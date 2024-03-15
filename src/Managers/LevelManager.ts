import { ref } from "vue";
import DeathBorder from "../Entities/Deathborder";
import Enemy from "../Entities/Enemy";
import Goal from "../Entities/Goal";
import Player from "../Entities/Player";
import Wall from "../Entities/Wall";
import EntityManager from "./EntityManager";
import GamePhysics from "./GamePhysics";
import Entrance from "../Entities/Entrance";

const LEVELS = [
  `             
WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
W                                                   W
W                                                   W
W1                   E                        E    GW
WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
`,
  `             
WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
W                                                   W
W                                                   W
WS 1                E     G                   E     W
WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
`,
];

export default class LevelManager {
  private entityManager: EntityManager;

  public constructor(entityManager: EntityManager) {
    this.entityManager = entityManager;
  }
  public win = false;
  private currentLevel = 0;
  public loseScreen = ref(false);

  public nextLevel() {
    if (this.currentLevel < LEVELS.length - 1) {
      this.currentLevel++;
    } else {
      this.currentLevel = 0;
    }
  }

  public lastLevel() {
    if (this.currentLevel >= 1) {
      this.currentLevel--;
    }
  }

  public tick(_: GamePhysics) {
    if (this.entityManager.getPlayerList().length == 0) {
      this.loseScreen.value = true;
    }
  }
  public loadLevel() {
    const map = LEVELS[this.currentLevel].trim();

    this.entityManager.clearEntities();

    map.split("\n").forEach((row, y) => {
      row.split("").forEach((cell, x) => {
        if (cell === "W")
          this.entityManager.addEntity(
            new Wall(x * 50 + 50, y * 50 + 50, 50, 50, "./Wall1.png", 0, true)
          );

        if (cell === "1") {
          const player = new Player(
            x * 50 + 70,
            y * 50 + 10,
            45,
            90,
            "./Player/Idle.png",
            3,
            5,
            this,
            this.entityManager,
            true,
            "right"
          );
          player.setMovementKeys(" ", "a", "d", "s");
          this.entityManager.addEntity(player);
        }
        if (cell === "2") {
          const player = new Player(
            x * 50 + 50,
            y * 50 + 50,
            40,
            80,
            "./Player/Move/Frame1.png",
            3,
            5,
            this,
            this.entityManager,
            true,
            "right"
          );
          player.setMovementKeys(
            "ArrowUp",
            "ArrowLeft",
            "ArrowRight",
            "ArrowDown"
          );
          this.entityManager.addEntity(player);
        }
        if (cell === "D")
          this.entityManager.addEntity(
            new DeathBorder(
              x * 50 + 50,
              y * 50 + 50,
              50,
              50,
              "./Black.png",
              0,
              this,
              this.entityManager,
              true
            )
          );
        if (cell === "E")
          this.entityManager.addEntity(
            new Enemy(
              x * 50 + 60,
              y * 50 + 30,
              40,
              80,
              "./Enemy/Move/Frame1.png",
              1,
              "right",
              this,
              this.entityManager,
              3,
              true
            )
          );
        if (cell === "G") {
          this.entityManager.addEntity(
            new Goal(
              x * 50 + 50,
              y * 50 + 25,
              50,
              100,
              "./Door.png",
              this,
              false
            )
          );
        }
        if (cell === "S") {
          this.entityManager.addEntity(
            new Entrance(
              x * 50 + 50,
              y * 50 + 25,
              50,
              100,
              "./Door.png",
              this,
              false
            )
          );
        }
      });
    });
  }
}
