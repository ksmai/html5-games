import * as Phaser from 'phaser';
import { Subscription } from 'rxjs/Subscription';

import { LevelMap } from './level-map';
import { HolyLeaf } from './holy-leaf';
import { Enemy } from './enemy';
import { EnemySpawner } from './enemy-spawner';

export class PlayScene extends Phaser.Scene {
  private levelMap: LevelMap;
  private enemySpawner: EnemySpawner;
  private subscription: Subscription;
  private holyLeaf: HolyLeaf;
  private enemyGroup: Phaser.Physics.Arcade.Group;
  private gameover: boolean = false;

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
    this.enemyGroup = this.physics.add.group();
    this.levelMap.create();
    this.subscription = this.enemySpawner.startSpawn().subscribe(() => {
      this.enemyGroup.add(new Enemy(this, this.levelMap.getWholePath(), 246));
    });
    const [lastX, lastY] = this.levelMap.getLastPoint();
    this.holyLeaf = new HolyLeaf(this, lastX * 64, lastY * 64);
    this.physics.add.collider(this.holyLeaf, this.enemyGroup, (holyLeaf, enemy) => {
      holyLeaf.getHit(enemy);
    });
    this.events.once('leafDestroyed', () => {
      this.holyLeaf = null;
      this.gameover = true;
      this.tweens.killAll();
    });
    this.events.on('enemyDestroyed', (enemy: Enemy) => {
      this.enemyGroup.remove(enemy);
    });
    this.input.once('pointerdown', () => this.scene.restart());
  }

  update(t: number, dt: number) {
    if (this.gameover) {
      return;
    }
    this.enemySpawner.update(dt);
  }

  destroy() {
    this.input.removeAllListeners();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
