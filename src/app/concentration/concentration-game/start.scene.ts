import * as Phaser from 'phaser';

export class StartScene extends Phaser.Scene {
  active = true;
  private title: Phaser.GameObjects.Text;
  private instruction: Phaser.GameObjects.Text;
  private clicked: boolean = false;

  constructor() {
    super({ key: 'StartScene' });
  }

  preload(): void {
  }

  create(): void {
    this.title = this.add
      .text(48, 32, 'Concentration')
      .setStroke('#c93f3f', 3)
      .setFontSize(24)
      .setColor('#c93f3f');
    this.instruction = this.add
      .text(72, 96, 'Click to start!')
      .setFontSize(16)
      .setColor('#ffffff');
  }

  update(): void {
    if (this.clicked) {
      return;
    }

    if (this.input.activePointer.isDown) {
      this.clicked = true;
      this.scene.start('PlayScene');
    }
  }
}
