import { Board } from './board';
import { State } from './state.enum';

const ROTATED_SLOT = [
  [0, 6, 8, 2],
  [1, 3, 7, 5],
  [2, 0, 6, 8],
  [3, 7, 5, 1],
  [4, 4, 4, 4],
  [5, 1, 3, 7],
  [6, 8, 2, 0],
  [7, 5, 1, 3],
  [8, 2, 0, 6],
];

export class AIPlayer {
  private defenseMode = false;
  private winMode = false;
  private rotation = Math.floor(Math.random() * 4);

  constructor(private state: State.O | State.X) {
  }

  getState() {
    return this.state;
  }

  nextMove(board: Board): number {
    if (this.defenseMode) {
      return this.defend(board);
    }

    if (this.winMode) {
      return this.win(board);
    }

    const numFilled = board.numFilled();
    switch (numFilled) {
      case 0:
        return this.getRotated(0);
      case 1:
        return board.get(this.getRotated(4)) === State.NONE ? this.getRotated(4) : this.getRotated(0);
      case 2:
        if (board.get(this.getRotated(4)) === State.NONE) {
          this.winMode = true;
          return this.win(board);
        } else {
          return this.getRotated(8);
        }
      case 3:
        this.defenseMode = true;
        if (board.get(this.getRotated(4)) !== this.state) {
          this.defend(board);
        } else if (board.get(this.getRotated(0)) === board.get(this.getRotated(8)) && board.get(this.getRotated(0)) !== State.NONE) {
          return this.getRotated(1);
        } else if (board.get(this.getRotated(2)) === board.get(this.getRotated(6)) && board.get(this.getRotated(2)) !== State.NONE) {
          return this.getRotated(1);
        } else {
          return this.defend(board);
        }
      case 4:
        this.defenseMode = true;
        if (board.get(this.getRotated(2)) !== State.NONE) {
          return this.getRotated(6);
        } else if (board.get(this.getRotated(6)) !== State.NONE) {
          return this.getRotated(2);
        } else {
          return this.defend(board);
        }
      default:
        throw new Error('Should have entered defense mode or win mode by now');
    }
  }

  defend(board: Board): number {
    for (let tuple of Board.TUPLES) {
      const pairs = [
        [tuple[1], tuple[2]],
        [tuple[0], tuple[2]],
        [tuple[0], tuple[1]],
      ];
      const samePair = pairs.findIndex((pair, i) => {
        return board.get(pair[0]) === board.get(pair[1]) &&
          board.get(pair[0]) === this.state &&
          board.get(tuple[i]) === State.NONE;
      });
      if (samePair !== -1) {
        return tuple[samePair];
      }
    }

    for (let tuple of Board.TUPLES) {
      const pairs = [
        [tuple[1], tuple[2]],
        [tuple[0], tuple[2]],
        [tuple[0], tuple[1]],
      ];
      const samePair = pairs.findIndex((pair, i) => {
        return board.get(pair[0]) === board.get(pair[1]) &&
          board.get(pair[0]) !== this.state &&
          board.get(pair[0]) !== State.NONE &&
          board.get(tuple[i]) === State.NONE;
      });
      if (samePair !== -1) {
        return tuple[samePair];
      }
    }
    return board.getMostValuableSlot();
  }

  win(board: Board): number {
    const numFilled = board.numFilled();
    switch (numFilled) {
      case 2:
        if (board.get(this.getRotated(1)) !== State.NONE) {
          return this.getRotated(6);
        } else if (board.get(this.getRotated(2)) !== State.NONE) {
          return this.getRotated(6);
        } else if (board.get(this.getRotated(3)) !== State.NONE) {
          return this.getRotated(2);
        } else if (board.get(this.getRotated(5)) !== State.NONE) {
          return this.getRotated(2);
        } else if (board.get(this.getRotated(6)) !== State.NONE) {
          return this.getRotated(2);
        } else if (board.get(this.getRotated(7)) !== State.NONE) {
          return this.getRotated(6);
        } else {
          return this.getRotated(6);
        }
      case 4:
        if (board.get(this.getRotated(2)) === this.state) {
          if (board.get(this.getRotated(1)) === State.NONE) {
            return this.getRotated(1);
          } else if (board.get(this.getRotated(5)) !== State.NONE) {
            return this.getRotated(6);
          } else {
            return this.getRotated(8);
          }
        } else {
          if (board.get(this.getRotated(3)) === State.NONE) {
            return this.getRotated(3);
          } else if (board.get(this.getRotated(1)) !== State.NONE) {
            return this.getRotated(8);
          } else if (board.get(this.getRotated(2)) !== State.NONE) {
            return this.getRotated(8);
          } else {
            return this.getRotated(2);
          }
        }
      case 6:
        if (board.get(this.getRotated(2)) !== this.state) {
          if (board.get(this.getRotated(7)) === State.NONE) {
            return this.getRotated(7);
          } else if (board.get(this.getRotated(3)) === State.NONE) {
            return this.getRotated(3);
          } else {
            return this.getRotated(4);
          }
        } else if (board.get(this.getRotated(6)) !== this.state) {
          if (board.get(this.getRotated(1)) === State.NONE) {
            return this.getRotated(1);
          } else if (board.get(this.getRotated(5)) === State.NONE) {
            return this.getRotated(5);
          } else {
            return this.getRotated(4);
          }
        } else {
          if (board.get(this.getRotated(1)) === State.NONE) {
            return this.getRotated(1);
          } else if (board.get(this.getRotated(3)) === State.NONE) {
            return this.getRotated(3);
          } else {
            return this.getRotated(4);
          }
        }
      default:
        throw new Error('This is not a winning board for me');
    }
  }

  private getRotated(idx: number): number {
    return ROTATED_SLOT[idx][this.rotation % 4];
  }
}
