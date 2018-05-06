import * as Phaser from 'phaser';

import { Projectile } from './projectile';

export class SmallRocket extends Projectile {
  protected setup(): void {
    this.damage = 200;
    this.speed = 448;
    this.aoe = false;
    this.size = 12;
    this.frameNumber = 251;
    this.angularOffset = 0;
    super.setup();
  }
}
