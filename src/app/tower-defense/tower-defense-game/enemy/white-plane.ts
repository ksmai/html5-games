import { Enemy } from './enemy';

export class WhitePlane extends Enemy {
  protected setup(): void {
    this.speed = 192;
    this.hp = 100;
    this.damage = 64;
    this.boxWidth = 43;
    this.boxHeight = 23;
    this.frameNumber = 271;
    this.coins = 1000;
    this.score = 1000;
    super.setup();
  }
}
