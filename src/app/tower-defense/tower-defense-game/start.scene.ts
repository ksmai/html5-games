import * as Phaser from 'phaser';

export class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' })
  }

  preload() {
  }

  create() {
    this.add.text(432, 243, 'StartScene').setColor('#ffffff').setOrigin(0.5);
    this.input.once('pointerup', () => {
      this.scene.stop('StartScene');
      this.scene.start('PlayScene');
    });
  }
}
