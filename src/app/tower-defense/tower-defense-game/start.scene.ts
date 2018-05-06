import * as Phaser from 'phaser';

export class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' })
  }

  preload() {
    this.load.audio('music', [
      'assets/tower-defense/sounds/music.ogg',
      'assets/tower-defense/sounds/music.mp3',
    ], undefined, undefined);
  }

  create() {
    this.sound.play('music', { loop: true, volume: 0.5 });
    this.add.text(432, 243, 'StartScene').setColor('#ffffff').setOrigin(0.5);
    this.input.once('pointerup', () => {
      this.sound.stopAll();
      this.scene.stop('StartScene');
      this.scene.start('PlayScene', {
        score: 0,
        coins: 1500,
        level: 0,
      });
    });
  }
}
