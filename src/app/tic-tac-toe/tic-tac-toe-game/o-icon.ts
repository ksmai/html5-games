import * as Phaser from 'phaser';

export class OIcon extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'icon', 122);
    this.scene.add.existing(this);
  }
}
