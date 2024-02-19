import GamePhysics from "../Managers/GamePhysics";
import Entity from "./Entity";

export default class Player extends Entity {
  public tick(gamePhysics: GamePhysics) {}

  public constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    texture: string
  ) {
    super(x, y, width, height, texture);
  }

  private movementKeys = {
    jump: "space",
    left: "A",
    right: "D",
  };
}
