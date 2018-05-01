import * as Phaser from 'phaser';

export class Enemy extends Phaser.GameObjects.Sprite {
  private speed: number = 64;
  private hp: number = 100;

  constructor(scene: Phaser.Scene, private path: number[][], frame: number) {
    super(scene, path[0][0] * 64, path[0][1] * 64, 'spritesheet', frame);
    this.scene.add.existing(this);
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
    this.scene.tweens.timeline({
      tweens,
    });
  }
}
