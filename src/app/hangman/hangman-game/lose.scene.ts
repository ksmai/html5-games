import * as Phaser from 'phaser';

export class LoseScene extends Phaser.Scene {
  private word: string;

  constructor() {
    super({ key: 'LoseScene' });
  }

  init({ word }: { word: string }) {
    this.word = word;
  }

  create() {
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    const title = this.add.text(
      this.sys.canvas.width / 2,
      this.sys.canvas.height / 4,
      'YOU LOSE\nTHE WORD WAS',
    );
    title.setFontSize(64);
    title.setFontStyle('bold');
    title.setAlign('center');
    title.setOrigin(0.5);
    title.setStroke('#000000', 3);
    title.setColor('#ffffff');
    const word = this.add.text(
      this.sys.canvas.width / 2,
      this.sys.canvas.height * 3 / 4,
      this.word,
    );
    word.setFontSize(128);
    word.setFontStyle('bold');
    word.setOrigin(0.5, 0.5);
    word.setColor('#ffffff');
    word.setStroke('#000000', 8);
    this.input.once('pointerup', () => {
      this.cameras.main.fadeOut(1000, 255, 255, 255, (camera: Phaser.Cameras.Scene2D.Camera, progress: number) => {
        if (progress < 1) {
          return;
        }

        this.scene.switch('StartScene');
        this.scene.stop('LoseScene');
      });
    });
  }
}
