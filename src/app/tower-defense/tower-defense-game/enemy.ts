import * as Phaser from 'phaser';

export class Enemy extends Phaser.Physics.Arcade.Sprite {
  private speed: number = 64;
  private hp: number = 100;
  private damage: number = 10;
  private moveTimeline: Phaser.Tweens.Timeline;
  private resetTintEvent: Phaser.Time.TimerEvent;

  constructor(scene: Phaser.Scene, private path: number[][], frame: number) {
    super(scene, path[0][0] * 64, path[0][1] * 64, 'spritesheet', frame);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setGravity(0, 0);
    this.setDepth(path[0][1] * 64);
    const tweens = path.slice(1).map(([x, y], i) => ({
      targets: this,
      duration: (Math.abs(path[i + 1][0] - path[i][0]) + Math.abs(path[i + 1][1] - path[i][1])) * 64 / this.speed * 1000,
      ease: 'Linear',
      repeat: false,
      props: {
        x: x * 64,
        y: y * 64,
        depth: y * 64,
      },
    }));
    this.moveTimeline = this.scene.tweens.timeline({
      tweens,
    });
  }

  getDamage(): number {
    return this.damage;
  }

  cleanup(): void {
    this.moveTimeline.destroy();
    this.resetTintEvent.destroy();
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
