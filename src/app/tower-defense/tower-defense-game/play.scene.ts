import * as Phaser from 'phaser';

import { LevelMap } from './level-map';

export class PlayScene extends Phaser.Scene {
  private levelMap: LevelMap;

  constructor() {
    super({ key: 'PlayScene' })
  }

  init() {
    const mapWidth = this.sys.canvas.width / 64;
    const mapHeight = this.sys.canvas.height / 64;
    this.levelMap = new LevelMap(mapWidth, mapHeight, this);
    this.levelMap.init();
  }

  preload() {
    this.load.spritesheet(
      'spritesheet',
      'assets/tower-defense/tilesheet/tilesheet.png',
      { frameWidth: 64, frameHeight: 64 },
    );
  }

  create() {
    this.levelMap.create();
    this.input.once('pointerdown', () => this.scene.restart());
  }
}
