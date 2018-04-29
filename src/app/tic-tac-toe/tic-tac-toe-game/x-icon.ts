import * as Phaser from 'phaser';

export class XIcon extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'icon', 168);
    this.scene.add.existing(this);
  }
}
