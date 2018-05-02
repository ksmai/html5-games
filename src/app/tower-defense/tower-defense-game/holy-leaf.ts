import * as Phaser from 'phaser';

import { Enemy } from './enemy';

export class HolyLeaf extends Phaser.Physics.Arcade.Sprite {
  private hp: number = 100;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'spritesheet', 134);
    scene.add.existing(this);
    scene.physics.add.existing(this);
  }

  getHit(enemy: Enemy) {
    this.hp -= enemy.getDamage();
    enemy.cleanup();
    enemy.destroy();
    this.scene.events.emit('enemyDestroyed', enemy);
    if (this.hp <= 0) {
      this.scene.events.emit('leafDestroyed');
      this.destroy();
    }
  }
}
