import * as Phaser from 'phaser';

export class Card {
  private flipped: boolean = false;
  private flipping: boolean = false;
  private matched: boolean = false;
  private front: Phaser.GameObjects.Sprite;
  private back: Phaser.GameObjects.Sprite;

  constructor(private scene: Phaser.Scene, public cardFrame: number, private cardBackFrame: number) {
    this.front = this.scene.add.sprite(0, 0, 'card', cardFrame) as Phaser.GameObjects.Sprite;
    this.front.setScale(0.2);
    this.front.setVisible(false);
    this.front.setInteractive();
    this.front.setOrigin(0, 0);

    this.back = this.scene.add.sprite(0, 0, 'cardBack', cardBackFrame) as Phaser.GameObjects.Sprite;
    this.back.setScale(0.2);
    this.back.setInteractive();
    this.back.setOrigin(0, 0);

    this.scene.input.on('gameobjectup', this.handleClick, this);
  }

  setPosition(x: number, y: number): void {
    this.front.setPosition(x, y);
    this.back.setPosition(x, y);
  }

  isFlipped(): boolean {
    return this.flipped;
  }

  isFlipping(): boolean {
    return this.flipping;
  }

  flip(): void {
    if (this.flipped) {
      this.front.setVisible(false);
      this.back.setVisible(true);
    } else {
      this.front.setVisible(true);
      this.back.setVisible(false);
    }
    this.flipped = !this.flipped;
  }

  isMatch(card: Card): boolean {
    return this.cardFrame === card.cardFrame;
  }

  match(): void {
    this.front.destroy();
    this.back.destroy();
  }

  changeCardBack(frame: number): void {
    this.back.setFrame(frame);
  }

  private handleClick(pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.GameObject): void {
    if (this.matched || this.flipping) {
      return;
    }

    if (gameObject === this.front) {
      this.scene.events.emit('clickedFront', this);
    } else if (gameObject === this.back) {
      this.scene.events.emit('clickedBack', this);
    }
  }
}
