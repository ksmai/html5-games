import { Component } from '@angular/core';

import { StartScene } from './start.scene';

@Component({
  templateUrl: './tic-tac-toe-game.component.html',
  styleUrls: ['./tic-tac-toe-game.component.scss'],
})
export class TicTacToeGameComponent {
  config: any = {
    title: 'Tic Tac Toe',
    url: 'https://ksmai.github.io/html5-games/tic-tac-toe',
    version: '1.0',
    backgroundColor: '#eeeeee',
    scene: [
      StartScene,
    ],
  };
  instructions: string = `Obtain victory by lining up 3 symbols in a row, column or diagonal!`;
}
