import * as Phaser from 'phaser';

import { Projectile } from './projectile';

export class SmallCannon extends Projectile {
  protected setup(): void {
    this.damage = 40;
    this.speed = 256;
    this.aoe = false;
    this.size = 9;
    this.frameNumber = 295;
    this.angularOffset = Math.PI;
    super.setup();
  }
}
