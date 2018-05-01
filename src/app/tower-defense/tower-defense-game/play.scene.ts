import * as Phaser from 'phaser';

import { PathGenerator } from './path-generator';

export class PlayScene extends Phaser.Scene {
  private map: number[][];

  constructor() {
    super({ key: 'PlayScene' })
  }

  init() {
    const mapWidth = this.sys.canvas.width / 64;
    const mapHeight = this.sys.canvas.height / 64;
    const pathGeneratorWidth = Math.ceil(mapWidth / 2);
    const pathGeneratorHeight = Math.ceil(mapHeight / 2);
    const pathGenerator = new PathGenerator(pathGeneratorWidth, pathGeneratorHeight);
    const path = pathGenerator.generate(pathGeneratorWidth + pathGeneratorHeight);

    this.map = Array<number[]>(mapHeight)
      .fill(null)
      .map(() => Array<number>(mapWidth).fill(0));
    for (let node of path) {
      const y = Math.floor(node / pathGeneratorWidth);
      const x = node % pathGeneratorWidth;
      if (y * 2 < mapHeight && x * 2 < mapWidth) {
        this.map[y * 2][x * 2] = 1;
      }
      if (y * 2 + 1 < mapHeight && x * 2 < mapWidth) {
        this.map[y * 2 + 1][x * 2] = 1;
      }
      if (y * 2 < mapHeight && x * 2 + 1 < mapWidth) {
        this.map[y * 2][x * 2 + 1] = 1;
      }
      if (y * 2 + 1 < mapHeight && x * 2 + 1 < mapWidth) {
        this.map[y * 2 + 1][x * 2 + 1] = 1;
      }
    }

    console.log(this.map.map(r => r.join('')).join('\n'));
  }

  preload() {
    this.load.spritesheet(
      'spritesheet',
      'assets/tower-defense/tilesheet/tilesheet.png',
      { frameWidth: 64, frameHeight: 64 },
    );
  }

  create() {
    for (let y = 0; y < this.map.length; y++) {
      for (let x = 0; x < this.map[y].length; x++) {
        if (this.map[y][x]) {
          this.add.sprite(x * 64, y * 64, 'spritesheet', 24).setOrigin(0);
        }
      }
    }
console.log(this.textures.get('spritesheet'));
    this.input.once('pointerdown', () => this.scene.restart());
  }
}
