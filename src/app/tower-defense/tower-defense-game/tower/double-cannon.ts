import * as Phaser from 'phaser';

import { Projectile, SmallCannon } from '../projectile';
import { Tower } from './tower';

export class DoubleCannon extends Tower {
  static radius: number = 128;
  static cost: number = 2000;
  static frameNumber: number = 250;
  protected halfSize: number;

  protected setup(): void {
    this.idleFrameNumber = this.frameNumber;
    this.maxCooldown = 300;
    this.currentCooldown = 0;
    this.halfSize = 32;
    this.projectileConstructor = SmallCannon;
    super.setup();
  }

  protected createProjectiles(angle: number): Projectile[] {
    return [new this.projectileConstructor(
      this.scene,
      this.x - 10 + this.halfSize * Math.sin(angle),
      this.y - this.halfSize * Math.cos(angle),
      this.target,
    ), new this.projectileConstructor(
      this.scene,
      this.x + 10 + this.halfSize * Math.sin(angle),
      this.y - this.halfSize * Math.cos(angle),
      this.target,
    )];
  }

  protected get frameNumber() {
    return DoubleCannon.frameNumber;
  }

  protected get radius() {
    return DoubleCannon.radius;
  }
}
