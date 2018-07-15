import * as Phaser from 'phaser';

export class PlayScene extends Phaser.Scene {
  private remainingChars: number;
  private word: string;
  private revealedWord: string;
  private displayWord: Phaser.GameObjects.Text;
  private charPositions: { [key: string]: number[] };

  constructor() {
    super({ key: 'PlayScene' });
  }

  init() {
    this.word = 'HELLOWORLD';
    this.remainingChars = this.word.length;
    this.charPositions = this.word.split('').reduce((positions, ch, idx) => {
      if (!positions[ch]) {
        positions[ch] = [];
      }
      positions[ch].push(idx);
      return positions;
    }, {});
    this.revealedWord = this.word.split('').map((c, i) => i > 0 ? ' _' : '_').join('');
  }

  create() {
    this.cameras.main.fadeIn(1000, 255, 255, 255);
    this.displayWord = this.add.text(
      this.sys.canvas.width / 2,
      this.sys.canvas.height - 128,
      this.revealedWord,
    );
    this.displayWord.setFontSize(48);
    this.displayWord.setFontStyle('bold');
    this.displayWord.setStroke('#000000', 3);
    this.displayWord.setOrigin(0.5);
    this.input.keyboard.on('keyup', (evt: any) => {
      if (evt.keyCode < 65 || evt.keyCode > 90) {
        return;
      }
      const c = String.fromCharCode(evt.keyCode);
      if (this.charPositions[c]) {
        this.charPositions[c].forEach((pos) => {
          const displayPos = 2 * pos;
          this.revealedWord = this.revealedWord.slice(0, displayPos) + this.word[pos] + this.revealedWord.slice(displayPos + 1);
        });
        this.displayWord.setText(this.revealedWord);
        this.remainingChars -= this.charPositions[c].length;
        this.charPositions[c] = [];
        if (this.remainingChars === 0) {
          console.log('you win');
        }
      } else {
        console.log('wrong guess');
      }
    });
  }
}
