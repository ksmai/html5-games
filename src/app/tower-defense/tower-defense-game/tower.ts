import * as Phaser from 'phaser';

import { Enemy } from './enemy';
import { Projectile } from './projectile';

export class Tower extends Phaser.Physics.Arcade.Sprite {
  static cost: number = 500;
  protected maxCooldown: number = 200;
  protected currentCooldown: number = 0;
  protected damage: number = 30;
  protected target: Enemy = null;
  protected radius: number = 128;
  protected halfSize: number = 32;
  protected frameNumber: number = 249;
  protected projectileConstructor: typeof Projectile = Projectile;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'spritesheet');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setDepth(y);
    this.setFrame(this.frameNumber);
    this.setCircle(this.radius, -this.radius + 32, -this.radius + 32);
  }

  tick(t: number, dt: number): void {
    this.currentCooldown = Math.max(0, this.currentCooldown - dt);
    if (this.target) {
      const angle = this.calculateRotation(this.x, this.y, this.target.x, this.target.y);
      this.setRotation(angle);
      if (this.currentCooldown <= 0) {
        const projectile = new this.projectileConstructor(
          this.scene,
          this.x + this.halfSize * Math.sin(angle),
          this.y - this.halfSize * Math.cos(angle),
          this.target,
        );
        this.scene.events.emit('projectileCreated', projectile);
        this.currentCooldown = this.maxCooldown;
      }
      this.target = null;
    }
  }

  getTarget(): Enemy | null {
    return this.target;
  }

  setTarget(target: Enemy): void {
    this.target = target;
  }

  private calculateRotation(x: number, y: number, x2: number, y2: number): number {
    if (y2 === y) {
      return x2 > x ? Math.PI / 2 : -Math.PI / 2;
    }
    if (y2 > y) {
      return Math.PI - Math.atan((x2 - x) / (y2 - y));
    }
    return -Math.atan((x2 - x) / (y2 - y));
  }
}
