import { State } from './state.enum';

interface WinningRow {
  state: State;
  row: number[];
}

export class Board {
  static ROWS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ];
  static COLS = [
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];
  static DIAGS = [
    [0, 4, 8],
    [2, 4, 6],
  ];
  static TUPLES = Board.ROWS.concat(Board.COLS).concat(Board.DIAGS);

  private states: State[];
  
  constructor() {
    this.states = Array(9).fill(State.NONE) as State[];
  }

  checkWinner(): WinningRow | null {
    const row = Board.TUPLES.find((tuple) => {
      return this.states[tuple[0]] === this.states[tuple[1]] &&
        this.states[tuple[1]] === this.states[tuple[2]] &&
        this.states[tuple[0]] !== State.NONE;
    });

    if (!row) {
      return null;
    }

    return {
      row,
      state: this.states[row[0]],
    };
  }

  get(i: number) {
    i = Math.floor(i);
    if (i < 0 || i > this.states.length) {
      throw new Error(`Expected i to be within 0 to 8, got ${i}`);
    }
    return this.states[i];
  }

  set(i: number, s: State) {
    i = Math.floor(i);
    if (i < 0 || i > this.states.length) {
      throw new Error(`Expected i to be within 0 to 8, got ${i}`);
    }
    this.states[i] = s;
  }

  numFilled(): number {
    return this.states.filter((s) => s !== State.NONE).length;
  }

  getEmptySlot(): number {
    return this.states.findIndex((spot) => spot === State.NONE);
  }
}
