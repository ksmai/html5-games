import * as Phaser from 'phaser';

export class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' });
  }

  preload() {
    this.load.spritesheet('icon', 'assets/tic-tac-toe/spritesheet.png', {
      frameWidth: 50,
      frameHeight: 50,
    });
  }

  create() {
    const oBox = this.add.graphics();
    oBox.lineStyle(3, 0xb6b7ba, 1);
    oBox.strokeRect(55, 46, 70, 70);
    const xBox = this.add.graphics();
    xBox.lineStyle(3, 0xb6b7ba, 1);
    xBox.strokeRect(163, 46, 70, 70);
    const o = this.add.sprite(90, 81, 'icon', 122);
    o.setTint(0x34ef1f);
    const x = this.add.sprite(198, 81, 'icon', 168);
    x.setTint(0xe84b33);
    oBox.setAlpha(0.7);
    o.setAlpha(0.7);
    xBox.setAlpha(0.7);
    x.setAlpha(0.7);

    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      if (pointer.x > 55 && pointer.x < 55 + 70 && pointer.y > 46 && pointer.y < 46 + 70) {
        oBox.setAlpha(1);
        o.setAlpha(1);
        xBox.setAlpha(0.7);
        x.setAlpha(0.7);
      } else if (pointer.x > 163 && pointer.x < 163 + 70 && pointer.y > 46 && pointer.y < 46 + 70) {
        oBox.setAlpha(0.7);
        o.setAlpha(0.7);
        xBox.setAlpha(1);
        x.setAlpha(1);
      } else {
        oBox.setAlpha(0.7);
        o.setAlpha(0.7);
        xBox.setAlpha(0.7);
        x.setAlpha(0.7);
      }
    });

    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      if (pointer.x > 55 && pointer.x < 55 + 70 && pointer.y > 46 && pointer.y < 46 + 70) {
        this.scene.start('PlayScene', { player: 0 });
        this.input.removeAllListeners();
      } else if (pointer.x > 163 && pointer.x < 163 + 70 && pointer.y > 46 && pointer.y < 46 + 70) {
      } else {
        this.scene.start('PlayScene', { player: 1 });
        this.input.removeAllListeners();
      }
    });
  }
}
