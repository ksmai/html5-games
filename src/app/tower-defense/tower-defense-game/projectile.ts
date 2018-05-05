import * as Phaser from 'phaser';

import { Enemy } from './enemy';

export class Projectile extends Phaser.Physics.Arcade.Sprite {
  protected damage: number = 40;
  protected speed: number = 256;
  protected aoe: boolean = false;
  protected size: number = 8;
  protected keyName: string = 'spritesheet';
  protected frameNumber: number = 272;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    private target: Enemy,
  ) {
    super(scene, x, y, 'spritesheet');
    this.setFrame(this.frameNumber);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setDepth(y * 64);
    this.setCircle(this.size, -this.size + 32, -this.size + 32);
  }

  tick(t: number, dt: number): void {
    const xdiff = this.target.x - this.x;
    const ydiff = this.target.y - this.y;
    let angle: number;
    if (ydiff === 0) {
      angle = xdiff > 0 ? Math.PI / 2 : -Math.PI / 2;
    } else if (ydiff > 0) {
      angle = Math.PI - Math.atan(xdiff / ydiff);
    } else {
      angle = -Math.atan(xdiff / ydiff);
    }
    const xspeed = dt / 1000 * this.speed * Math.sin(angle);
    const yspeed = dt / 1000 * this.speed * -Math.cos(angle);
    this.x += xspeed;
    this.y += yspeed;
    if (!this.target.active && Math.sqrt(Math.pow(this.x - this.target.x, 2) + Math.pow(this.y - this.target.y, 2)) < 32) {
      this.scene.events.emit('projectileExploded', this);
    }
  }

  getDamage(): number {
    return this.damage;
  }

  isAOE(): boolean {
    return this.aoe;
  }

  onDestroy(group: Phaser.Physics.Arcade.Group): void {
    this.destroy();
    group.remove(this, true, true);
  }
}
