import { Enemy } from './enemy';

export class WhiteCannon extends Enemy {
  protected setup(): void {
    this.speed = 96;
    this.hp = 300;
    this.damage = 25;
    this.boxWidth = 48;
    this.boxHeight = 20;
    this.frameNumber = 292;
    this.coins = 200;
    this.score = 200;
    super.setup();
  }
}
