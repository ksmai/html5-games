import * as Phaser from 'phaser';

export class PlayScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PlayScene' });
  }

  create() {
    this.cameras.main.fadeIn(1000, 255, 255, 255);
    this.add.text(200, 200, 'it works');
  }
}
