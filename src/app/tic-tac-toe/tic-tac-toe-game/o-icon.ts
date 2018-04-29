import * as Phaser from 'phaser';

export class OIcon extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'icon', 122);
    this.setTint(0x34ef1f);
    this.scene.add.existing(this);
  }
}
