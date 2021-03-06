import * as Phaser from 'phaser';

import { Card } from './card';
import { inPlaceFisherYatesShuffle } from '../../../utils/shuffle';

export class PlayScene extends Phaser.Scene {
  active = false;
  private cards: Card[];
  private flippedCards: Card[];
  private matchCount: number;
  private moveCount: number;

  constructor() {
    super({ key: 'PlayScene' });
  }

  init() {
    this.flippedCards = [];
    this.matchCount = 0;
    this.moveCount = 0;
  }

  preload() {
    this.load.spritesheet(
      'card',
      'assets/concentration/playingCards.png',
      { frameWidth: 140, frameHeight: 190 },
    );
    this.load.spritesheet(
      'cardBack',
      'assets/concentration/playingCardBacks.png',
      { frameWidth: 140, frameHeight: 190 },
    );
  }

  create() {
    const possibleFrames = Array(68)
      .fill(null)
      .map((e: null, i) => i)
      .filter((i) => (i + 1) % 7 > 0 && ((i + 2) % 7 > 0 || i / 7 < 3));
    const frames = Array(20)
      .fill(null)
      .map(() => {
        const frameIdx = Math.floor(Math.random() * possibleFrames.length)
        const [frame] = possibleFrames.splice(frameIdx, 1);
        return frame;
      });
    frames.push(...frames);
    inPlaceFisherYatesShuffle(frames);
    this.cards = frames.map((frame) => new Card(this, frame, Math.floor(Math.random() * 15))); 
    this.cards.forEach((card, i) => {
      card.setPosition(14.72 + 28.72 * (i % 10), 21 + 40 * Math.floor(i / 10));
    });

    this.cameras.main.fadeIn(1000, 255, 255, 255, (camera: Phaser.Cameras.Scene2D.Camera, progress: number) => {
      if (progress < 1) {
        this.cards.forEach((card) => card.changeCardBack(Math.floor(Math.random() * 15)));
        return;
      }

      this.events.on('clickedBack', function onClickedBack(card: Card) {
        if (this.flippedCards.length === 2) {
          this.flippedCards.forEach((flippedCard: Card) => flippedCard.flip());
          this.flippedCards = [];
        }
        card.flip();
        this.flippedCards.push(card);
        if (this.flippedCards.length === 2) {
          this.moveCount += 1;

          if (this.flippedCards[0].isMatch(this.flippedCards[1])) {
            this.flippedCards.forEach((flippedCard: Card) => flippedCard.match());
            this.matchCount += 2;
            this.flippedCards = [];

            if (this.matchCount === this.cards.length) {
              this.events.removeListener('clickedBack', onClickedBack);
              this.time.delayedCall(2000, () => {
                this.cameras.main.fadeOut(1000, 255, 255, 255, (camera: Phaser.Cameras.Scene2D.Camera, progress: number) => {
                  if (progress < 1) {
                    return;
                  }

                  this.scene.start('ScoreScene', {
                    moveCount: this.moveCount,
                  });
                }, this);
              }, [], this);
            }
          }
        }
      }, this);
    }, this);
  }
}
