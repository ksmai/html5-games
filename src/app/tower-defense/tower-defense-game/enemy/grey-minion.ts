import { Enemy } from './enemy';

export class GreyMinion extends Enemy {
  protected setup(): void {
    this.speed = 96;
    this.hp = 200;
    this.damage = 16;
    this.boxWidth = 16;
    this.boxHeight = 26;
    this.frameNumber = 248;
    this.coins = 100;
    this.score = 100;
    super.setup();
  }
}
