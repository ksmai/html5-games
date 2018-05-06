import * as Phaser from 'phaser';

import { Projectile } from './projectile';

export class BigRocket extends Projectile {
  protected setup(): void {
    this.damage = 200;
    this.speed = 448;
    this.aoe = false;
    this.size = 15;
    this.frameNumber = 252;
    this.angularOffset = 0;
    super.setup();
  }
}
