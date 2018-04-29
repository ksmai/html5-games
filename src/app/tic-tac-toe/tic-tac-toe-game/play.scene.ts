import * as Phaser from 'phaser';

import { OIcon } from './o-icon';
import { XIcon } from './x-icon';
import { State } from './state.enum';
import { Board } from './board';
import { AIPlayer } from './ai-player';

export class PlayScene extends Phaser.Scene {
  active = false;

  private player: State.O | State.X;
  private playerHoverIcon: XIcon | OIcon;
  private computer: AIPlayer;
  private board: Board;

  constructor() {
    super({ key: 'PlayScene' });
  }

  init({ player }: { player: State.O | State.X }) {
    this.player = player;
    this.playerHoverIcon = this.player === State.O ? new OIcon(this, 0, 0) : new XIcon(this, 0, 0);
    this.playerHoverIcon.setAlpha(0.3);
    this.playerHoverIcon.setVisible(false);
    this.board = new Board();
    this.computer = new AIPlayer(player === State.O ? State.X : State.O);

    if (player === State.X) {
      this.move(this.computer.nextMove(this.board), this.computer.getState());
    }

    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      const position = this.xyToPosition(pointer.x, pointer.y);
      if (position > -1 && this.board.get(position) === State.NONE) {
        const [x, y] = this.positionToXY(position);
        this.playerHoverIcon.x = x;
        this.playerHoverIcon.y = y;
        this.playerHoverIcon.setVisible(true);
      } else {
        this.playerHoverIcon.setVisible(false);
      }
    });
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      const position = this.xyToPosition(pointer.x, pointer.y);
      if (position > -1 && this.board.get(position) === State.NONE) {
        this.move(position, this.player);
        const winner = this.board.checkWinner();
        if (winner) {
          console.log(winner);
        } else if (this.board.numFilled() < 9) {
          this.move(this.computer.nextMove(this.board), this.computer.getState());
        } else {
          console.log('draw');
        }
      }
    });
  }

  preload() {
    this.load.spritesheet('icon', 'assets/tic-tac-toe/spritesheet.png', {
      frameWidth: 50,
      frameHeight: 50,
    });
  }

  create() {
    const graphics = this.add.graphics();
    graphics.lineStyle(4, 0x222222, 1);
    graphics.lineBetween(115, 2, 115, 160);
    graphics.lineBetween(173, 2, 173, 160);
    graphics.lineBetween(57, 54, 231, 54);
    graphics.lineBetween(57, 108, 231, 108);
  }

  move(position: number, state: State) {
    this.board.set(position, state);
    let [x, y] = this.positionToXY(position);
    if (state === State.O) {
      new OIcon(this, x, y);
    } else {
      new XIcon(this, x, y);
    }
    const winner = this.board.checkWinner();
    if (winner) {
      console.log(winner);
    }
  }

  positionToXY(position: number): [number, number] {
    const x = 86 + 58 * (position % 3);
    const y = 28 + 53 * Math.floor(position / 3);
    return [x, y];
  }

  xyToPosition(x: number, y: number): number {
    let row: number = -1;
    let col: number = -1;
    if (y > 6 && y < 50) {
      row = 0;
    } else if (y > 58 && y < 104) {
      row = 1;
    } else if (y > 112 && y < 156) {
      row = 2;
    }
    if (x > 61 && x < 111) {
      col = 0;
    } else if (x > 119 && x < 169) {
      col = 1;
    } else if (x > 177 && x < 227) {
      col = 2;
    }
    if (row === -1 || col === -1) {
      return -1;
    }
    return row * 3 + col;
  }
}
