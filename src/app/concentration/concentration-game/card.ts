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

    this.back = this.scene.add.sprite(0, 0, 'cardBack', cardBackFrame) as Phaser.GameObjects.Sprite;
    this.back.setScale(0.2);
    this.back.setInteractive();

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
    let toHide: Phaser.GameObjects.Sprite;
    let toShow: Phaser.GameObjects.Sprite;
    if (this.flipped) {
      toHide = this.front;
      toShow = this.back;
    } else {
      toShow = this.front;
      toHide = this.back;
    }
    this.flipped = !this.flipped;
    this.flipping = true;

    toShow.setScale(0, 0.22);
    this.scene.tweens.add({
      targets: toHide,
      scaleY: 0.22,
      scaleX: 0,
      onComplete: () => {
        toHide.setVisible(false);
        toShow.setVisible(true);

        this.scene.tweens.add({
          targets: toShow,
          scaleY: 0.2,
          scaleX: 0.2,
          onComplete: () => {
            this.flipping = false;
          },
          ease: 'Linear',
          duration: 150,
        });
      },
      ease: 'Linear',
      duration: 150,
    });
  }

  isMatch(card: Card): boolean {
    return this.cardFrame === card.cardFrame;
  }

  match(): void {
    this.matched = true;
    this.scene.input.removeListener('gameobjectup', this.handleClick, this, false);

    this.scene.tweens.add({
      targets: this.front,
      alpha: 0,
      duration: 200,
      delay: 300,
      ease: 'Linear',
      repeat: 5,
      onComplete: () => {
        this.front.destroy();
        this.back.destroy();
      },
    });
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
