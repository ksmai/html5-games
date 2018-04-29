import * as Phaser from 'phaser';

export class ScoreScene extends Phaser.Scene {
  active = false;
  private moveCount: number;
  private now: number;

  constructor() {
    super({ key: 'ScoreScene' });
  }

  init(params: { [key: string]: any }) {
    this.moveCount = params.moveCount;
    this.now = Date.now();
  }

  create() {
    this.cameras.main.fadeIn(1000, 255, 255, 255, (camera: Phaser.Cameras.Scene2D.Camera, progress: number) => {
      if (progress < 1) {
        return;
      }
      this.add.text(30, 32, 'Congratulations!')
        .setStroke('#c93f3f', 3)
        .setFontSize(24)
        .setColor('#c93f3f');
      this.add.text(96, 64, `You won in
  ${this.moveCount}
  moves`)
        .setStroke('#c93f3f', 3)
        .setFontSize(16)
        .setAlign('center')
        .setColor('#ffffff');
    }, this);
  }

  update() {
    if (Date.now() - this.now < 1500) {
      return;
    }
    if (this.input.activePointer.isDown) {
      this.scene.start('PlayScene');
    }
  }
}
