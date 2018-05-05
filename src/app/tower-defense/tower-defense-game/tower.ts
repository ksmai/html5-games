import * as Phaser from 'phaser';

import { Enemy } from './enemy';

export class Tower {
  protected maxCooldown: number = 0;
  protected currentCooldown: number = 0;
  protected damage: number = 30;
  protected sprite: Phaser.Physics.Arcade.Sprite;
  protected target: Enemy = null;
  protected radius: number = 128;

  constructor(private scene: Phaser.Scene, private x: number, private y: number, private key: string, private frame: number) {
    this.sprite = scene.physics.add.sprite(x, y, key, frame);
    this.sprite.setOrigin(0.5);
    this.sprite.setCircle(this.radius, -this.radius + 32, -this.radius + 32);
  }

  update(t: number, dt: number): void {
    this.currentCooldown -= dt;
    if (this.target) {
console.log('rotate');
      this.sprite.setRotation(this.calculateRotation(this.x, this.y, this.target.x, this.target.y));
      this.target = null;
    }
  }

  setOverlap(group: Phaser.GameObjects.Group): void {
    (this.scene.physics.add.overlap as any)(this.sprite, group, (tower: Phaser.GameObjects.GameObject, enemy: Enemy) => {
      if (!this.target) {
        this.target = enemy;
      }
    });
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
