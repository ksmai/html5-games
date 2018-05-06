import * as Phaser from 'phaser';

import { SmallRocket, Projectile } from '../projectile';
import { Tower } from './tower';

export class DoubleRocket extends Tower {
  static cost: number = 8000;
  static frameNumber: number = 205;
  protected halfSize: number;

  protected setup(): void {
    this.idleFrameNumber = 228;
    this.maxCooldown = 2500;
    this.radius = 300;
    this.halfSize = 4;
    this.projectileConstructor = SmallRocket;
    super.setup();
  }

  protected createProjectiles(angle: number): Projectile[] {
    return [new this.projectileConstructor(
      this.scene,
      this.x - 8.5 + this.halfSize * Math.sin(angle),
      this.y - this.halfSize * Math.cos(angle),
      this.target,
    ), new this.projectileConstructor(
      this.scene,
      this.x + 8.5 + this.halfSize * Math.sin(angle),
      this.y - this.halfSize * Math.cos(angle),
      this.target,
    )];
  }

  protected get frameNumber() {
    return DoubleRocket.frameNumber;
  }
}
