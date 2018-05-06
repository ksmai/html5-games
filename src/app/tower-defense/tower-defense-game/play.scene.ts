import * as Phaser from 'phaser';
import { Subscription } from 'rxjs/Subscription';

import { LevelMap } from './level-map';
import { HolyLeaf } from './holy-leaf';
import { Enemy } from './enemy';
import { EnemySpawner } from './enemy-spawner';
import { TowerShop } from './tower-shop';
import { Tower } from './tower';
import { Projectile } from './projectile';

export class PlayScene extends Phaser.Scene {
  private levelMap: LevelMap;
  private enemySpawner: EnemySpawner;
  private subscription: Subscription;
  private holyLeaf: HolyLeaf;
  private towerShop: TowerShop;
  private enemyGroup: Phaser.Physics.Arcade.Group;
  private towerGroup: Phaser.Physics.Arcade.Group;
  private projectileGroup: Phaser.Physics.Arcade.Group;
  private statGroup: Phaser.GameObjects.Group;
  private gameover: boolean;
  private score: number;
  private coins: number;
  private level: number;
  private spawningEnded: boolean;
  private towerShadow: Phaser.GameObjects.Sprite;
  private rangeIndicator: Phaser.GameObjects.Graphics;
  private aoeCircles: Array<[Phaser.Geom.Circle, number]>;
  private particles: Phaser.GameObjects.Particles.ParticleEmitterManager;

  constructor() {
    super({ key: 'PlayScene' })
  }

  init({ coins, score, level }: { coins: number, score: number, level: number }) {
    const mapWidth = this.sys.canvas.width / 64;
    const mapHeight = this.sys.canvas.height / 64;
    this.levelMap = new LevelMap(mapWidth, mapHeight, this);
    this.levelMap.init();
    this.enemySpawner = new EnemySpawner(level);
    this.gameover = false;
    this.score = score;
    this.level = level;
    this.coins = coins;
    this.spawningEnded = false;
    this.aoeCircles = [];
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
    this.load.audio('explode', [
      'assets/tower-defense/sounds/explode.wav',
    ], undefined, undefined);
    this.load.audio('hit', [
      'assets/tower-defense/sounds/hit.wav',
    ], undefined, undefined);
    this.load.audio('coin', [
      'assets/tower-defense/sounds/coin.wav',
    ], undefined, undefined);
    this.load.audio('victory', [
      'assets/tower-defense/sounds/victory.wav',
    ], undefined, undefined);
    this.load.audio('defeat', [
      'assets/tower-defense/sounds/defeat.wav',
    ], undefined, undefined);
    this.load.audio('disallowed', [
      'assets/tower-defense/sounds/disallowed.wav',
    ], undefined, undefined);
  }

  create() {
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
    this.towerShop = new TowerShop(this);
    this.towerShop.create();
    this.towerShadow = this.add.sprite(0, 0, 'spritesheet');
    this.towerShadow.setAlpha(0.5);
    this.towerShadow.setVisible(false);
    this.rangeIndicator = this.add.graphics();
    this.rangeIndicator.setAlpha(0.5);
    this.rangeIndicator.setVisible(false);
    this.statGroup = this.add.group(null, null);
    this.towerGroup = this.physics.add.group();
    this.enemyGroup = this.physics.add.group();
    this.projectileGroup = this.physics.add.group();
    this.levelMap.create();
    this.subscription = this.enemySpawner.startSpawn().subscribe((ctor: typeof Enemy) => {
      const enemy = new ctor(this, this.levelMap.getWholePath());
      this.enemyGroup.add(enemy);
    }, null, () => this.spawningEnded = true);
    const [lastX, lastY] = this.levelMap.getLastPoint();
    this.holyLeaf = new HolyLeaf(this, lastX * 64, lastY * 64);
    this.updateStatGroup();

    (this.physics.add.collider as any)(this.holyLeaf, this.enemyGroup, (holyLeaf: HolyLeaf, enemy: Enemy) => {
      holyLeaf.getHit(enemy);
    });
    (this.physics.add.collider as any)(this.projectileGroup, this.enemyGroup, (projectile: Projectile, enemy: Enemy) => {
      if (projectile.isAOE()) {
        this.aoeCircles.push([
          new Phaser.Geom.Circle(projectile.x, projectile.y, projectile.getAOERadius()),
          projectile.getDamage(),
        ]);
        this.sound.play('explode');
        this.particles.emitParticleAt(projectile.x, projectile.y, 6);
      } else {
        enemy.onDamage(projectile.getDamage());
      }
      projectile.onDestroy(this.projectileGroup);
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
      this.onGameover();
    });
    this.events.on('enemyDestroyed', (enemy: Enemy) => {
      this.increaseStats({
        coins: enemy.getCoins(),
        score: enemy.getScore(),
      });
      (this.particles as any).setDepth(enemy.y + 64);
      this.sound.play('explode');
      this.particles.emitParticleAt(enemy.x, enemy.y, 6);
      enemy.onDestroy(this.enemyGroup);
    });
    this.events.on('projectilesCreated', (projectiles: Projectile[]) => {
      this.projectileGroup.addMultiple(projectiles);
    });
    this.events.on('projectileExploded', (projectile: Projectile) => {
      if (projectile.isAOE()) {
        this.aoeCircles.push([
          new Phaser.Geom.Circle(projectile.x, projectile.y, projectile.getAOERadius()),
          projectile.getDamage(),
        ]);
        this.sound.play('explode');
        this.particles.emitParticleAt(projectile.x, projectile.y, 6);
      }
      projectile.onDestroy(this.projectileGroup);
    });
    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      if(!this.towerShop.handlePointerMove(pointer)) {
        return;
      }
      const towerConstructor = this.towerShop.getSelectedTower();
      if (!towerConstructor) {
        return;
      }
      const mapX = Math.floor(pointer.x / 64);
      const mapY = Math.floor(pointer.y / 64);
      if (!this.levelMap.isEmptySlot(mapX, mapY)) {
        this.towerShadow.setVisible(false);
        this.rangeIndicator.setVisible(false);
        return;
      }
      this.towerShadow.setPosition(mapX * 64 + 32, mapY * 64 + 32);
      this.towerShadow.setDepth(mapY * 64 + 32);
      this.towerShadow.setFrame(towerConstructor.frameNumber);
      this.towerShadow.setVisible(true);
      this.towerShadow.setTint(this.coins < towerConstructor.cost ? 0xff9999 : 0xffffff);
      this.rangeIndicator.clear();
      const circle = new Phaser.Geom.Circle(mapX * 64 + 32, mapY * 64 + 32, towerConstructor.radius);
      this.rangeIndicator.fillStyle(this.coins < towerConstructor.cost ? 0xff9999 : 0xffffff, 0.5);
      this.rangeIndicator.fillCircleShape(circle);
      this.rangeIndicator.setDepth(mapY * 64 + 32);
      this.rangeIndicator.setVisible(true);
    });
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      if (!this.towerShop.handlePointerDown(pointer)) {
        return;
      }
      const towerConstructor = this.towerShop.getSelectedTower();
      if (!towerConstructor) {
        return;
      }
      if (this.coins < towerConstructor.cost) {
        this.sound.play('disallowed', { volume: 0.5 });
        return;
      }
      const mapX = Math.floor(pointer.x / 64);
      const mapY = Math.floor(pointer.y / 64);
      if (!this.levelMap.isEmptySlot(mapX, mapY)) {
        return;
      }
      this.increaseStats({
        coins: -towerConstructor.cost,
      });
      const tower = new towerConstructor(this, Math.floor(pointer.x / 64) * 64 + 32, Math.floor(pointer.y / 64) * 64 + 32);
      this.towerGroup.add(tower);
      this.levelMap.fillSlot(mapX, mapY);
      this.towerShadow.setVisible(false);
      this.rangeIndicator.setVisible(false);
      this.sound.play('coin', { volume: 0.5 });
    });
  }

  update(t: number, dt: number) {
    if (this.gameover) {
      return;
    }
    if (this.spawningEnded && !this.enemyGroup.getLength()) {
      this.gameover = true;
      this.tweens.killAll();
      this.onWin();
    }
    this.enemySpawner.update(dt);
    this.towerGroup.getChildren().forEach((tower: Tower) => tower.tick(t, dt));
    this.projectileGroup.getChildren().forEach((projectile: Projectile) => projectile.tick(t, dt));
    if (this.aoeCircles.length) {
      const children = this.enemyGroup.getChildren();
      for (let i = children.length - 1; i >= 0; i--) {
        const enemy = children[i] as Enemy;
        const body = enemy.body as Phaser.Physics.Arcade.Body;
        const bounds = body.getBounds({} as any);
        const x = bounds.x;
        const y = bounds.y;
        const w = bounds.right - x;
        const h = bounds.bottom - y;
        const rect = new Phaser.Geom.Rectangle(x, y, w, h);
        this.aoeCircles.forEach(([circle, damage]) => {
          if (!enemy.active) {
            return;
          }
          if (Phaser.Geom.Intersects.CircleToRectangle(circle, rect)) {
            enemy.onDamage(damage);
          }
        });
      }
      this.aoeCircles = [];
    }
  }

  cleanup() {
    this.sound.stopAll();
    this.input.removeAllListeners();
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  private increaseStats({ coins = 0, score = 0 } = {}) {
    this.score += score;
    this.coins += coins;
    this.updateStatGroup();
  }

  private updateStatGroup(): void {
    this.statGroup.clear(true, true);
    const y = 16;
    let x = 16;
    const levelIcon = this.statGroup.create(x, y, 'spritesheet', 274, true, true) as Phaser.GameObjects.Sprite;
    levelIcon.setScale(0.5);
    levelIcon.setAlpha(0.8);
    levelIcon.setDepth(y);
    x += 16;
    (this.level + 1).toString().split('').forEach((digit) => {
      const num = this.statGroup.create(x, y, 'spritesheet', 276 + +digit, true, true) as Phaser.GameObjects.Sprite;
      num.setScale(0.5);
      num.setAlpha(0.8);
      num.setDepth(y);
      x += 16;
    });

    x += 16;

    const scoreIcon = this.statGroup.create(x, y, 'spritesheet', 275, true, true) as Phaser.GameObjects.Sprite;
    scoreIcon.setScale(0.5);
    scoreIcon.setAlpha(0.8);
    scoreIcon.setDepth(y);
    x += 16;
    (this.score).toString().split('').forEach((digit) => {
      const num = this.statGroup.create(x, y, 'spritesheet', 276 + +digit, true, true) as Phaser.GameObjects.Sprite;
      num.setScale(0.5);
      num.setAlpha(0.8);
      num.setDepth(y);
      x += 16;
    });

    x = this.sys.canvas.width - 16;
    (this.coins).toString().split('').reverse().forEach((digit) => {
      const num = this.statGroup.create(x, y, 'spritesheet', 276 + +digit, true, true) as Phaser.GameObjects.Sprite;
      num.setScale(0.5);
      num.setAlpha(0.8);
      num.setDepth(y);
      x -= 16;
    });
    const coinsIcon = this.statGroup.create(x, y, 'spritesheet', 272, true, true) as Phaser.GameObjects.Sprite;
    coinsIcon.setScale(0.5);
    coinsIcon.setAlpha(0.8);
    coinsIcon.setDepth(y);
    x -= 16;
  }

  private onWin(): void {
    this.increaseStats({
      score: (this.level + 1) * 3000,
      coins: Math.floor(3000 * Math.sqrt(this.level + 1)),
    });

    const winScreen = this.add.graphics();
    winScreen.setDepth(this.sys.canvas.height + 1000);
    winScreen.fillStyle(0x000000, 0.7);
    winScreen.fillRect(0, 0, this.sys.canvas.width, this.sys.canvas.height);
    const innerWidth = this.sys.canvas.width * 2 / 3;
    const innerHeight = this.sys.canvas.height * 2 / 3;
    const innerOffsetX = (this.sys.canvas.width - innerWidth) / 2;
    const innerOffsetY = (this.sys.canvas.height - innerHeight) / 2;
    winScreen.fillRect(innerOffsetX, innerOffsetY, innerWidth, innerHeight);

    const midX = this.sys.canvas.width / 2;
    const midY = this.sys.canvas.height / 2;
    const fontSize = 48;
    const winText = this.add.text(
      midX,
      innerOffsetY + fontSize + 64,
      `Level Completed`,
      { fontSize, fontStyle: 'bold' },
    );

    winText.setOrigin(0.5);
    winText.setDepth(winScreen.depth + 1);

    const continueY = midY + 96;
    const continueText = this.add.text(
      midX,
      continueY,
      'Click to continue',
      { fontSize: fontSize * 0.7 },
    );
    continueText.setOrigin(0.5);
    continueText.setDepth(winScreen.depth + 1);

    this.cleanup();
    this.tweens.add({
      targets: continueText,
      props: {
        alpha: 0.5,
      },
      ease: 'Power',
      duration: 500,
      yoyo: true,
      repeat: -1,
    });
    this.sound.play('victory');
    this.input.once('pointerup', () => {
      this.cleanup();
      this.scene.stop('PlayScene');
      this.scene.start('PlayScene', {
        level: this.level + 1,
        score: this.score,
        coins: this.coins,
      });
    });
  }

  private onGameover(): void {
    const loseScreen = this.add.graphics();
    loseScreen.setDepth(this.sys.canvas.height + 1000);
    loseScreen.fillStyle(0x000000, 0.7);
    loseScreen.fillRect(0, 0, this.sys.canvas.width, this.sys.canvas.height);
    const innerWidth = this.sys.canvas.width * 2 / 3;
    const innerHeight = this.sys.canvas.height * 2 / 3;
    const innerOffsetX = (this.sys.canvas.width - innerWidth) / 2;
    const innerOffsetY = (this.sys.canvas.height - innerHeight) / 2;
    loseScreen.fillRect(innerOffsetX, innerOffsetY, innerWidth, innerHeight);

    const midX = this.sys.canvas.width / 2;
    const midY = this.sys.canvas.height / 2;
    const fontSize = 64;
    const gameoverText = this.add.text(
      midX,
      innerOffsetY + fontSize + 16,
      'Game Over',
      { fontSize, fontStyle: 'bold' },
    );

    gameoverText.setOrigin(0.5);
    gameoverText.setDepth(loseScreen.depth + 1);

    const highscoreY = midY + 32;
    const highscoreText = this.add.text(
      midX,
      highscoreY,
      'Highscore',
      { fontSize: fontSize * 1.1, fontStyle: 'bold' },
    );
    highscoreText.setOrigin(0.5);
    highscoreText.setDepth(loseScreen.depth + 1);

    const scoreY = highscoreY + fontSize + 16;
    const scoreText = this.add.text(
      midX,
      scoreY,
      this.score.toString(),
      { fontSize, fontStyle: 'bold' },
    );
    scoreText.setOrigin(0.5);
    scoreText.setDepth(loseScreen.depth + 1);

    this.cleanup();
    this.sound.play('defeat');
    this.input.once('pointerup', () => {
      this.cleanup();
      this.scene.stop('PlayScene');
      this.scene.start('StartScene');
    });
  }
}
