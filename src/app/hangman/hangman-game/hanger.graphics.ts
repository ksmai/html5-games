import * as Phaser from 'phaser';

export class Hanger extends Phaser.GameObjects.Graphics {
  private countdown: number = 7;

  constructor(scene: Phaser.Scene, private onDie: () => void) {
    super(scene, {});
    this.scene.add.existing(this);
    this.setup();
  }

  hang(): void {
    this.countdown--;
    if (this.countdown === 0) {
      this.onDie();
    }
  }

  private setup(): void {
  }
}
