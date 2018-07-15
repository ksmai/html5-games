import * as Phaser from 'phaser';

export class StartScene extends Phaser.Scene {
  private colors: string[] = [
    '#4286f4',
    '#6242f4',
    '#f442f4',
    '#f4425f',
    '#f49e42',
    '#92f442',
    '#42f4c8',
  ];
  private titles: Phaser.GameObjects.Text[];
  private readonly UPDATE_COLOR_INTERVAL: number = 50;
  private updateColorTimer: number = 0;

  constructor() {
    super({ key: 'StartScene' });
  }

  create() {
    this.titles = 'HANGMAN'.split('').map((ch, i) => {
      return this.add.text(
        this.sys.canvas.width / 2 + (i - 3) * 64,
        this.sys.canvas.height / 4,
        ch,
      );
    });
    this.titles.forEach((title, i) => {
      title.setFontSize(96);
      title.setFontStyle('bold');
      title.setOrigin(0.5, 0.5);
      title.setStroke('#000000', 3);
      title.setColor(this.colors[i]);
    });
    const startText = this.add.text(
      this.sys.canvas.width / 2,
      this.sys.canvas.height * 3 / 4,
      'Click to start',
    );
    startText.setFontSize(48);
    startText.setOrigin(0.5, 0.5);
    startText.setColor('#ffffff');
    startText.setFontStyle('bold');
    startText.setStroke('#000000', 1);
    this.input.once('pointerup', () => {
      this.cameras.main.fadeOut(1000, 255, 255, 255, (camera: Phaser.Cameras.Scene2D.Camera, progress: number) => {
        if (progress < 1) {
          return;
        }
        this.input.removeAllListeners();
        this.scene.start('PlayScene');
        this.scene.stop('StartScene');
      });
    });
  }

  update(t: number, dt: number) {
    this.updateColorTimer += dt;
    if (this.updateColorTimer > this.UPDATE_COLOR_INTERVAL) {
      this.updateColorTimer %= this.UPDATE_COLOR_INTERVAL;
      this.colors.push(this.colors.shift());
      this.titles.forEach((title, i) => title.setColor(this.colors[i]));
    }
  }
}
