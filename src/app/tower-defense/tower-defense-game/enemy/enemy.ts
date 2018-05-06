import * as Phaser from 'phaser';

export class Enemy extends Phaser.Physics.Arcade.Sprite {
  protected speed: number;
  protected hp: number;
  protected damage: number;
  protected boxWidth: number;
  protected boxHeight: number;
  protected frameNumber: number;
  protected coins: number;
  protected score: number;
  protected moveTimeline: Phaser.Tweens.Timeline;
  protected resetTintEvent: Phaser.Time.TimerEvent;

  constructor(scene: Phaser.Scene, protected path: number[][]) {
    super(scene, path[0][0] * 64, path[0][1] * 64, 'spritesheet');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setup();
  }

  protected setup(): void {
    this.setSize(this.boxWidth, this.boxHeight);
    this.setFrame(this.frameNumber);
    this.setDepth(this.path[0][1] * 64 + Math.max(this.boxWidth, this.boxHeight));
    const tweens = this.path.slice(1).map(([x, y], i) => ({
      targets: this,
      duration: (Math.abs(this.path[i + 1][0] - this.path[i][0]) + Math.abs(this.path[i + 1][1] - this.path[i][1])) * 64 / this.speed * 1000,
      ease: 'Linear',
      repeat: false,
      props: {
        x: x * 64,
        y: y * 64,
        depth: y * 64 + Math.max(this.boxWidth, this.boxHeight),
      },
      onStart: () => {
        let angle: number;
        const [x0, y0] = this.path[i];
        if (x > x0) {
          angle = 0;
          this.setSize(this.boxWidth, this.boxHeight);
        } else if (x < x0) {
          angle = Math.PI;
          this.setSize(this.boxWidth, this.boxHeight);
        } else if (y > y0) {
          angle = Math.PI / 2;
          this.setSize(this.boxHeight, this.boxWidth);
        } else {
          angle = 3 * Math.PI / 2;
          this.setSize(this.boxHeight, this.boxWidth);
        }
        this.setRotation(angle);
      },
    }));
    this.moveTimeline = this.scene.tweens.timeline({
      tweens,
    });
  }

  getDamage(): number {
    return this.damage;
  }

  getCoins(): number {
    return this.coins;
  }

  getScore(): number {
    return this.score;
  }

  cleanup(): void {
    this.moveTimeline.stop();
    this.moveTimeline.destroy();
    if (this.resetTintEvent) {
      this.resetTintEvent.destroy();
    }
  }

  onDamage(damage: number): void {
    this.hp -= damage;
    if (this.hp <= 0) {
      this.scene.events.emit('enemyDestroyed', this);
    } else {
      this.setTint(0xff0000);
      if (this.resetTintEvent) {
        this.resetTintEvent.destroy();
      }
      this.resetTintEvent = this.scene.time.delayedCall(200, () => {
        this.setTint(0xffffff);
      }, null, this);
    }
  }

  onDestroy(group?: Phaser.GameObjects.Group): void {
    this.cleanup();
    this.destroy();
    if (group) {
      group.remove(this, true, true);
    }
  }
}
