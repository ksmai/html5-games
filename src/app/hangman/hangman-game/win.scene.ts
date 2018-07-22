import * as Phaser from 'phaser';

export class WinScene extends Phaser.Scene {
  private word: string;

  constructor() {
    super({ key: 'WinScene' });
  }

  init({ word }: { word: string }) {
    this.word = word;
  }

  create() {
    this.cameras.main.fadeIn(1000, 255, 255, 255);
    const title = this.add.text(
      this.sys.canvas.width / 2,
      this.sys.canvas.height / 4,
      'CONGRATULATIONS!\nYOU GUESSED THE WORD',
    );
    title.setFontSize(64);
    title.setFontStyle('bold');
    title.setStroke('#000000', 3);
    title.setColor('#ffffff');
    title.setOrigin(0.5);
    title.setAlign('center');

    const word = this.add.text(
      this.sys.canvas.width / 2,
      this.sys.canvas.height * 3 / 4,
      `"${this.word}"`,
    );
    word.setFontSize(128);
    word.setFontStyle('bold');
    word.setColor('#ffffff');
    word.setStroke('#000000', 8);
    word.setOrigin(0.5, 0.5);

    this.input.once('pointerup', () => {
      this.cameras.main.fadeOut(1000, 255, 255, 255, (camera: Phaser.Cameras.Scene2D.Camera, progress: number) => {
        if (progress < 1) {
          return;
        }

        this.scene.switch('StartScene');
        this.scene.stop('WinScene');
      });
    });
  }
}
