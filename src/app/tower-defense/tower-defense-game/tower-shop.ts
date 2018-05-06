import * as Phaser from 'phaser';

import {
  Tower,
  SingleCannon,
  DoubleCannon,
  SingleRocket,
  DoubleRocket,
} from './tower';

export class TowerShop {
  private selectedTower: typeof Tower;
  private towers: Array<typeof Tower> = [SingleCannon, DoubleCannon, SingleRocket, DoubleRocket];
  private margin: number = 24;
  private width: number = 48;
  private height: number = 48;
  private y: number = 8;
  private groups: Phaser.GameObjects.Group[] = [];
  private xStart: number;

  constructor(private scene: Phaser.Scene) {
  }

  create(): void {
    this.xStart = (this.scene.sys.canvas.width - this.width * this.towers.length - this.margin * (this.towers.length - 1)) / 2;
    this.towers.forEach((tower: typeof Tower, i: number) => {
      const group = this.renderButton(this.xStart + (this.width + this.margin) * i, this.y, tower);
      this.groups.push(group);
    });
  }

  handlePointerMove(pointer: Phaser.Input.Pointer): boolean {
    for (let i = 0; i < this.towers.length; i++) {
      const tower = this.towers[i];
      const x = this.xStart + (this.width + this.margin) * i;
      if (pointer.x > x && pointer.x < x + this.width && pointer.y > this.y && pointer.y < this.y + this.height) {
        this.groups[i].getChildren().forEach((child: Phaser.GameObjects.Graphics | Phaser.GameObjects.Sprite) => {
          child.setAlpha(0.8);
        });
        return true;
      } else if (this.selectedTower !== tower) {
        this.groups[i].getChildren().forEach((child: Phaser.GameObjects.Graphics | Phaser.GameObjects.Sprite) => {
          child.setAlpha(0.5);
        });
      }
    }
    return true;
  }

  handlePointerDown(pointer: Phaser.Input.Pointer): boolean {
    for (let i = 0; i < this.towers.length; i++) {
      const tower = this.towers[i];
      const x = this.xStart + (this.width + this.margin) * i;
      if (pointer.x > x && pointer.x < x + this.width && pointer.y > this.y && pointer.y < this.y + this.height) {
        if (this.selectedTower === tower) {
          this.selectedTower = null;
        } else {
          this.selectedTower = tower;
        }
        return false;
      }
    }
    return true;
  }

  getSelectedTower(): typeof Tower {
    return this.selectedTower;
  }

  private renderButton(
    x: number,
    y: number,
    ctor: typeof Tower,
  ): Phaser.GameObjects.Group {
    const graphics = this.scene.add.graphics();
    graphics.fillStyle(0xffffff);
    graphics.lineStyle(5, 0xffffff);
    graphics.fillRect(x, y, this.width, this.height);
    graphics.strokeRect(x, y, this.width, this.height);
    graphics.setDepth(y + this.height);
    graphics.setAlpha(0.5);

    const sprite = this.scene.add.sprite(x + this.width / 2, y + 16, 'spritesheet', ctor.frameNumber);
    sprite.setDepth(y + this.height);
    sprite.setAlpha(0.5);
    sprite.setScale(0.5);

    const group = this.scene.add.group(null, null);
    group.addMultiple([graphics, sprite]);

    ctor.cost.toString().split('').forEach((digit, i) => {
      const sprite = this.scene.add.sprite(x + 8 + i * 10, y + this.height - 8, 'spritesheet', 276 + +digit);
      sprite.setDepth(y + this.height);
      sprite.setAlpha(0.5);
      sprite.setScale(0.4);
      sprite.setTint(0xd0d400);
      group.add(sprite);
    });

    return group;
  }
}
