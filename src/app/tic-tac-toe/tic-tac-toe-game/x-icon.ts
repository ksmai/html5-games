import * as Phaser from 'phaser';

export class XIcon extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'icon', 168);
    this.setTint(0xe84b33);
    this.scene.add.existing(this);
  }
}
