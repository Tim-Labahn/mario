import Entity from "./Entity";
import GamePhysics from "../Managers/GamePhysics";

export default class Wall extends Entity {
  protected hasMovementCollision = true;
  public tick(_: GamePhysics) {
    // Walls don't do anything
  }
}
