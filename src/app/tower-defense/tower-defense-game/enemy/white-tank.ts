import { Enemy } from './enemy';

export class WhiteTank extends Enemy {
  protected setup(): void {
    this.speed = 64;
    this.hp = 1000;
    this.damage = 48;
    this.boxWidth = 52;
    this.boxHeight = 36;
    this.frameNumber = 269;
    this.coins = 500;
    this.score = 500;
    super.setup();
  }
}