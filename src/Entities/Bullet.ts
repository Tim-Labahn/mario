import Entity from "./Entity";
import GamePhysics from "../Managers/GamePhysics";

export default class Bullet extends Entity {
  protected hasMovementCollision = true;
  public tick(_: GamePhysics) {
    // Bullets don't do anything yet
  }
}
