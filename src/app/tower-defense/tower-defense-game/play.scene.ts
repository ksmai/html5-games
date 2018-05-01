import * as Phaser from 'phaser';

export class PlayScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PlayScene' })
  }

  preload() {
    this.load.spritesheet(
      'spritesheet',
      'assets/tower-defense/tilesheet/tilesheet.png',
      { frameWidth: 48, frameHeight: 48 },
    );
  }

  create() {
    this.add.text(432, 243, 'PlayScene').setColor('#ffffff').setOrigin(0.5);
  }
}
