import * as Phaser from 'phaser';
import { Subscription } from 'rxjs/Subscription';

import { LevelMap } from './level-map';
import { Enemy } from './enemy';
import { EnemySpawner } from './enemy-spawner';

export class PlayScene extends Phaser.Scene {
  private levelMap: LevelMap;
  private enemySpawner: EnemySpawner;
  private subscription: Subscription;

  constructor() {
    super({ key: 'PlayScene' })
  }

  init() {
    const mapWidth = this.sys.canvas.width / 64;
    const mapHeight = this.sys.canvas.height / 64;
    this.levelMap = new LevelMap(mapWidth, mapHeight, this);
    this.levelMap.init();
    this.enemySpawner = new EnemySpawner({
      rate: 1,
    });
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
    this.subscription = this.enemySpawner.startSpawn().subscribe(() => {
      new Enemy(this, this.levelMap.getWholePath(), 246);
    });
    this.input.once('pointerdown', () => this.scene.restart());
  }

  update(t: number, dt: number) {
    this.enemySpawner.update(dt);
  }

  destroy() {
    this.input.removeAllListeners();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
