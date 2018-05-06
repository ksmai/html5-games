import * as Phaser from 'phaser';

import { Projectile } from './projectile';

export class BigCannon extends Projectile {
  protected setup(): void {
    this.damage = 40;
    this.speed = 384;
    this.aoe = false;
    this.size = 17;
    this.frameNumber = 296;
    this.angularOffset = Math.PI;
    super.setup();
  }
}
