import { Board } from './board';
import { State } from './state.enum';

export class AIPlayer {
  private defenseMode = false;
  private winMode = false;

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
        return 0;
      case 1:
        return board.get(4) === State.NONE ? 4 : 0;
      case 2:
        if (board.get(4) === State.NONE) {
          this.winMode = true;
          return this.win(board);
        } else {
          return 8;
        }
      case 3:
        this.defenseMode = true;
        if (board.get(4) !== this.state) {
          this.defend(board);
        } else if (board.get(0) === board.get(8) && board.get(0) !== State.NONE) {
          return 1;
        } else if (board.get(2) === board.get(6) && board.get(2) !== State.NONE) {
          return 1;
        } else {
          return this.defend(board);
        }
      case 4:
        this.defenseMode = true;
        if (board.get(2) !== State.NONE) {
          return 6;
        } else if (board.get(6) !== State.NONE) {
          return 2;
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
    return board.getEmptySlot();
  }

  win(board: Board): number {
    const numFilled = board.numFilled();
    switch (numFilled) {
      case 2:
        if (board.get(1) !== State.NONE) {
          return 6;
        } else if (board.get(2) !== State.NONE) {
          return 6;
        } else if (board.get(3) !== State.NONE) {
          return 2;
        } else if (board.get(5) !== State.NONE) {
          return 2;
        } else if (board.get(6) !== State.NONE) {
          return 2;
        } else if (board.get(7) !== State.NONE) {
          return 6;
        } else {
          return 6;
        }
      case 4:
        if (board.get(2) === this.state) {
          if (board.get(1) === State.NONE) {
            return 1;
          } else if (board.get(5) !== State.NONE) {
            return 6;
          } else {
            return 8;
          }
        } else {
          if (board.get(3) === State.NONE) {
            return 3;
          } else if (board.get(1) !== State.NONE) {
            return 8;
          } else if (board.get(2) !== State.NONE) {
            return 8;
          } else {
            return 2;
          }
        }
      case 6:
        if (board.get(2) !== this.state) {
          if (board.get(7) === State.NONE) {
            return 7;
          } else if (board.get(3) === State.NONE) {
            return 3;
          } else {
            return 4;
          }
        } else if (board.get(6) !== this.state) {
          if (board.get(1) === State.NONE) {
            return 1;
          } else if (board.get(5) === State.NONE) {
            return 5;
          } else {
            return 4;
          }
        } else {
          if (board.get(1) === State.NONE) {
            return 1;
          } else if (board.get(3) === State.NONE) {
            return 3;
          } else {
            return 4;
          }
        }
      default:
        throw new Error('This is not a winning board for me');
    }
  }
}
