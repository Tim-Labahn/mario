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
W                                                   W
W             WE                                    W
W             WWWWWWWWWWWWWWWWWWWWW                 W
W                                                   W
W                                                   W
W                                                   W
W                                                   W
W  1              WW  WW   E    W                  GW
WWWWWWWW   WWWWWWWWW  WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
WWWWWWWWDDDWWWWWWWWWDDWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
`,
  `             
W                                                   W
W                                                   W
W                                                   W
W                                                   W
W                                                   W
W                                                   W
W                                                   W
WS  1                                               W
WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
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
    if (this.currentLevel > 0) {
      this.currentLevel--;
    } else {
      this.currentLevel = LEVELS.length;
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
            new Wall(x * 50 + 50, y * 50 + 50, 50, 50, "./Wall1.png", "right")
          );

        if (cell === "1") {
          const player = new Player(
            x * 50 + 50,
            y * 50 + 50,
            50,
            100,
            "./Player1.png",
            this,
            this.entityManager,
            "right"
          );
          player.setMovementKeys(" ", "a", "d", "s");
          this.entityManager.addEntity(player);
        }
        if (cell === "2") {
          const player = new Player(
            x * 50 + 40,
            y * 50 + 50,
            45,
            45,
            "./Player2.png",
            this,
            this.entityManager,
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
              "right",
              this,
              this.entityManager
            )
          );
        if (cell === "E")
          this.entityManager.addEntity(
            new Enemy(
              x * 50 + 45,
              y * 50 + 50,
              40,
              40,
              "./Enemy.png",
              this,
              this.entityManager
            )
          );
        if (cell === "G") {
          this.entityManager.addEntity(
            new Goal(x * 50 + 50, y * 50 + 25, 50, 100, "./Door.png", this)
          );
        }
        if (cell === "S") {
          this.entityManager.addEntity(
            new Entrance(x * 50 + 50, y * 50 + 25, 50, 100, "./Door.png", this)
          );
        }
      });
    });
  }
}
