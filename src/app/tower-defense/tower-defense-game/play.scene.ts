import * as Phaser from 'phaser';
import { Subscription } from 'rxjs/Subscription';

import { LevelMap } from './level-map';
import { HolyLeaf } from './holy-leaf';
import { Enemy } from './enemy';
import { EnemySpawner } from './enemy-spawner';
import { Tower } from './tower';
import { Projectile } from './projectile';

export class PlayScene extends Phaser.Scene {
  private levelMap: LevelMap;
  private enemySpawner: EnemySpawner;
  private subscription: Subscription;
  private holyLeaf: HolyLeaf;
  private enemyGroup: Phaser.Physics.Arcade.Group;
  private towerGroup: Phaser.Physics.Arcade.Group;
  private projectileGroup: Phaser.Physics.Arcade.Group;
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
    this.towerGroup = this.physics.add.group();
    this.enemyGroup = this.physics.add.group();
    this.projectileGroup = this.physics.add.group();
    this.levelMap.create();
    this.subscription = this.enemySpawner.startSpawn().subscribe(() => {
      const enemy = new Enemy(this, this.levelMap.getWholePath());
      this.enemyGroup.add(enemy);
    });
    const [lastX, lastY] = this.levelMap.getLastPoint();
    this.holyLeaf = new HolyLeaf(this, lastX * 64, lastY * 64);
    (this.physics.add.collider as any)(this.holyLeaf, this.enemyGroup, (holyLeaf: HolyLeaf, enemy: Enemy) => {
      holyLeaf.getHit(enemy);
    });
    (this.physics.add.collider as any)(this.projectileGroup, this.enemyGroup, (projectile: Projectile, enemy: Enemy) => {
      if (projectile.isAOE()) {
      } else {
        enemy.onDamage(projectile.getDamage());
        projectile.onDestroy(this.projectileGroup);
      }
    });
    (this.physics.add.overlap as any)(this.towerGroup, this.enemyGroup, (tower: Tower, enemy: Enemy) => {
      if (!tower.getTarget()) {
        tower.setTarget(enemy);
      }
    });
    this.events.once('leafDestroyed', () => {
      this.holyLeaf = null;
      this.gameover = true;
      this.tweens.killAll();
    });
    this.events.on('enemyDestroyed', (enemy: Enemy) => {
      enemy.onDestroy(this.enemyGroup);
    });
    this.events.on('projectileCreated', (projectile: Projectile) => {
      this.projectileGroup.add(projectile);
    });
    this.events.on('projectileExploded', (projectile: Projectile) => {
      if (projectile.isAOE()) {
      }
      projectile.onDestroy(this.projectileGroup);
    });
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      const tower = new Tower(this, Math.floor(pointer.x / 64) * 64 + 32, Math.floor(pointer.y / 64) * 64 + 32);
      this.towerGroup.add(tower);
/*
      this.input.once('pointerdown', () => {
        this.scene.restart();
      });
*/
    });
  }

  update(t: number, dt: number) {
    if (this.gameover) {
      return;
    }
    this.enemySpawner.update(dt);
    this.towerGroup.getChildren().forEach((tower: Tower) => tower.tick(t, dt));
    this.projectileGroup.getChildren().forEach((projectile: Projectile) => projectile.tick(t, dt));
  }

  destroy() {
    this.input.removeAllListeners();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
