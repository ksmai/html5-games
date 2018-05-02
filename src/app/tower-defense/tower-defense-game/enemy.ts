import * as Phaser from 'phaser';

export class Enemy extends Phaser.Physics.Arcade.Sprite {
  private speed: number = 64;
  private hp: number = 100;
  private damage: number = 10;
  private timeline: Phaser.Tweens.Timeline;

  constructor(scene: Phaser.Scene, private path: number[][], frame: number) {
    super(scene, path[0][0] * 64, path[0][1] * 64, 'spritesheet', frame);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setGravity(0, 0);
    const tweens = path.slice(1).map(([x, y], i) => ({
      targets: this,
      duration: (Math.abs(path[i + 1][0] - path[i][0]) + Math.abs(path[i + 1][1] - path[i][1])) * 64 / this.speed * 1000,
      ease: 'Linear',
      repeat: false,
      props: {
        x: x * 64,
        y: y * 64,
      },
    }));
    this.timeline = this.scene.tweens.timeline({
      tweens,
    });
  }

  getDamage(): number {
    return this.damage;
  }

  cleanup(): void {
    this.timeline.destroy();
  }
}
