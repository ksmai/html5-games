import * as Phaser from 'phaser';

import { Enemy } from './enemy';

export class HolyLeaf extends Phaser.Physics.Arcade.Sprite {
  private maxHP: number = 100;
  private hp: number = 100;
  private tween: Phaser.Tweens.Tween;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'spritesheet', 134);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.tween = scene.tweens.add({
      targets: this,
      rotation: Math.PI * 2,
      loop: -1,
      duration: 6000,
      ease: 'Linear',
    });
  }

  getHit(enemy: Enemy) {
    this.hp -= enemy.getDamage();
    this.setTint(0xff00ff + 0xff00 * this.hp / this.maxHP);
    enemy.cleanup();
    enemy.destroy();
    this.scene.events.emit('enemyDestroyed', enemy);
    if (this.hp <= 0) {
      this.scene.events.emit('leafDestroyed');
      this.cleanup();
      this.destroy();
    }
  }

  cleanup(): void {
    this.tween.stop();
  }
}
