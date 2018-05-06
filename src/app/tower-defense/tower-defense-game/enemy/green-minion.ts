import { Enemy } from './enemy';

export class GreenMinion extends Enemy {
  protected setup(): void {
    this.speed = 96;
    this.hp = 200;
    this.damage = 16;
    this.boxWidth = 20;
    this.boxHeight = 25;
    this.frameNumber = 245;
    this.coins = 100;
    this.score = 100;
    super.setup();
  }
}
