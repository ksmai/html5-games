import * as Phaser from 'phaser';
import { Subscription } from 'rxjs/Subscription';

import { LevelMap } from './level-map';
import { Enemy } from './enemy';
import { EnemySpawner } from './enemy-spawner';
import { Tower, SingleCannon, DoubleCannon } from './tower';
import { Projectile } from './projectile';

export class StartScene extends Phaser.Scene {
  private levelMap: LevelMap;
  private particles: Phaser.GameObjects.Particles.ParticleEmitterManager;
  private enemyGroup: Phaser.Physics.Arcade.Group;
  private towerGroup: Phaser.Physics.Arcade.Group;
  private projectileGroup: Phaser.Physics.Arcade.Group;
  private enemySpawner: EnemySpawner;
  private subscription: Subscription;

  constructor() {
    super({ key: 'StartScene' })
  }

  preload() {
    this.load.spritesheet(
      'spritesheet',
      'assets/tower-defense/tilesheet/tilesheet.png',
      { frameWidth: 64, frameHeight: 64 },
    );
    this.load.atlas(
      'explosion',
      'assets/tower-defense/particles/explosion.png',
      'assets/tower-defense/particles/explosion.json',
    );
    this.load.audio('music', [
      'assets/tower-defense/sounds/music.ogg',
      'assets/tower-defense/sounds/music.mp3',
    ], undefined, undefined);
  }

  init() {
    const mapWidth = this.sys.canvas.width / 64;
    const mapHeight = this.sys.canvas.height / 64;
    this.levelMap = new LevelMap(mapWidth, mapHeight, this);
    this.levelMap.init([24, 32, 33, 34, 26, 27, 28, 36, 37, 38, 30, 31]);
    this.enemySpawner = new EnemySpawner(0, true);
  }

  create() {
    this.towerGroup = this.physics.add.group();
    this.enemyGroup = this.physics.add.group();
    this.projectileGroup = this.physics.add.group();
    this.towerGroup.add(new SingleCannon(this, 2 * 64 + 32, 7 * 64 + 32));
    this.towerGroup.add(new SingleCannon(this, 3 * 64 + 32, 7 * 64 + 32));
    this.towerGroup.add(new SingleCannon(this, 10 * 64 + 32, 7 * 64 + 32));
    this.towerGroup.add(new SingleCannon(this, 11 * 64 + 32, 7 * 64 + 32));
    this.towerGroup.add(new DoubleCannon(this, 6 * 64 + 32, 8 * 64 + 32));
    this.towerGroup.add(new DoubleCannon(this, 7 * 64 + 32, 8 * 64 + 32));
    this.sound.play('music', { loop: true, volume: 0.5 });
    this.particles = this.add.particles('explosion');
    this.particles.createEmitter({
      frame: ['smoke-puff', 'cloud', 'smoke-puff'],
      lifespan: 2000,
      quantity: 6,
      angle: { min: 0, max: 359 },
      speed: { min: 16, max: 32 },
      scale: { start: 0.5, end: 0.25 },
      alpha: { start: 0.8, end: 0 },
      on: false,
    });
    this.levelMap.create();
    this.subscription = this.enemySpawner.startSpawn().subscribe((ctor: typeof Enemy) => {
      const enemy = new ctor(this, this.levelMap.getWholePath());
      this.enemyGroup.add(enemy);
    });
    (this.physics.add.collider as any)(this.projectileGroup, this.enemyGroup, (projectile: Projectile, enemy: Enemy) => {
      enemy.onDamage(projectile.getDamage());
      projectile.onDestroy(this.projectileGroup);
    });
    (this.physics.add.overlap as any)(this.towerGroup, this.enemyGroup, (tower: Tower, enemy: Enemy) => {
      if (!tower.getTarget()) {
        tower.setTarget(enemy);
      }
    });
    this.events.on('enemyDestroyed', (enemy: Enemy) => {
      (this.particles as any).setDepth(enemy.y + 64);
      this.particles.emitParticleAt(enemy.x, enemy.y, 6);
      enemy.onDestroy(this.enemyGroup);
    });
    this.events.on('projectilesCreated', (projectiles: Projectile[]) => {
      this.projectileGroup.addMultiple(projectiles);
    });
    this.events.on('projectileExploded', (projectile: Projectile) => {
      projectile.onDestroy(this.projectileGroup);
    });

    const title = this.add.text(this.sys.canvas.width / 2, 128, 'TOWER DEFENSE');
    title.setFontSize(96);
    title.setFontStyle('bold');
    title.setOrigin(0.5);
    title.setStroke('#000000', 3);

    const instruction = this.add.text(this.sys.canvas.width / 2, 256, 'Click to start!');
    instruction.setFontSize(48);
    instruction.setFontStyle('bold');
    instruction.setOrigin(0.5);
    instruction.setStroke('#000000', 1);

    this.tweens.add({
      targets: instruction,
      props: {
        alpha: 0.4,
      },
      ease: 'Linear',
      duration: 800,
      yoyo: true,
      repeat: -1,
    });

    this.input.once('pointerup', () => {
      this.cleanup();
      this.scene.stop('StartScene');
      this.scene.start('PlayScene', {
        score: 0,
        coins: 1500,
        level: 0,
      });
    });
  }

  update(t: number, dt: number): void {
    this.enemySpawner.update(dt);
    this.towerGroup.getChildren().forEach((tower: Tower) => tower.tick(t, dt));
    this.projectileGroup.getChildren().forEach((projectile: Projectile) => projectile.tick(t, dt));
  }

  cleanup() {
    this.tweens.killAll();
    this.sound.stopAll();
    this.input.removeAllListeners();
    this.events.removeAllListeners();
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}
