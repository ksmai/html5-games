import * as Phaser from 'phaser';

import { PathGenerator } from './path-generator';

export class PlayScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PlayScene' })
  }

  init() {
    const width = this.sys.canvas.width / 48;
    const height = this.sys.canvas.height / 48;
    const pathGenerator = new PathGenerator(width, height);
    const path = pathGenerator.generate(width + height);

    const map: number[][] = Array<number[]>(height)
      .fill(null)
      .map(() => Array<number>(width).fill(0));
    for (let node of path) {
      const y = Math.floor(node / width);
      const x = node % width;
      map[y][x] = 1;
    }

    console.log(map.map(r => r.join('')).join('\n'));
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
    this.input.once('pointerdown', () => this.scene.restart());
  }
}
