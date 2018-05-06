import * as Phaser from 'phaser';

import { Enemy } from '../enemy';
import { Projectile } from '../projectile';

export class Tower extends Phaser.Physics.Arcade.Sprite {
  static cost: number;
  static frameNumber: number;
  static radius: number;
  protected maxCooldown: number;
  protected currentCooldown: number = 0;
  protected target: Enemy = null;
  protected idleFrameNumber: number;
  protected projectileConstructor: typeof Projectile;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'spritesheet');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setDepth(y);
    this.setup();
  }

  protected setup(): void {
    this.setFrame(this.frameNumber);
    this.setCircle(this.radius, -this.radius + 32, -this.radius + 32);
  }

  tick(t: number, dt: number): void {
    this.currentCooldown = Math.max(0, this.currentCooldown - dt);
    if (this.currentCooldown <= 500) {
      this.setFrame(this.frameNumber);
    } else {
      this.setFrame(this.idleFrameNumber);
    }
    if (this.target) {
      const angle = this.calculateRotation(this.x, this.y, this.target.x, this.target.y);
      this.setRotation(angle);
      if (this.currentCooldown <= 0) {
        const projectiles = this.createProjectiles(angle);
        this.scene.events.emit('projectilesCreated', projectiles);
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

  protected createProjectiles(angle: number): Projectile[] {
    return [new this.projectileConstructor(
      this.scene,
      this.x,
      this.y,
      this.target,
    )];
  }

  protected get frameNumber() {
    return Tower.frameNumber;
  }

  protected get radius() {
    return Tower.radius;
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
