import { Enemy } from './enemy';

export class GreenTank extends Enemy {
  protected setup(): void {
    this.speed = 64;
    this.hp = 1000;
    this.damage = 48;
    this.boxWidth = 52;
    this.boxHeight = 36;
    this.frameNumber = 268;
    this.coins = 100;
    this.score = 500;
    super.setup();
  }
}
