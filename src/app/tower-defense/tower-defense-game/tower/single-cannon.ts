import * as Phaser from 'phaser';

import { BigCannon, Projectile } from '../projectile';
import { Tower } from './tower';

export class SingleCannon extends Tower {
  static cost: number = 1000;
  static frameNumber: number = 249;
  protected halfSize: number;

  protected setup(): void {
    this.idleFrameNumber = this.frameNumber;
    this.maxCooldown = 250;
    this.radius = 128;
    this.halfSize = 32;
    this.projectileConstructor = BigCannon;
    super.setup();
  }

  protected createProjectiles(angle: number): Projectile[] {
    return [new this.projectileConstructor(
      this.scene,
      this.x + this.halfSize * Math.sin(angle),
      this.y - this.halfSize * Math.cos(angle),
      this.target,
    )];
  }

  protected get frameNumber() {
    return SingleCannon.frameNumber;
  }
}
