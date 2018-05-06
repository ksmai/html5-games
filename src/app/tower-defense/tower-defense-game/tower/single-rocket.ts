import * as Phaser from 'phaser';

import { BigRocket, Projectile } from '../projectile';
import { Tower } from './tower';

export class SingleRocket extends Tower {
  static radius: number = 300;
  static cost: number = 4000;
  static frameNumber: number = 206;
  protected halfSize: number;

  protected setup(): void {
    this.idleFrameNumber = 229;
    this.maxCooldown = 2500;
    this.halfSize = 7;
    this.projectileConstructor = BigRocket;
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
    return SingleRocket.frameNumber;
  }

  protected get radius() {
    return SingleRocket.radius;
  }
}
