import { Component } from '@angular/core';

@Component({
  templateUrl: './minesweeper-game.component.html',
  styleUrls: ['./minesweeper-game.component.scss'],
})
export class MinesweeperGameComponent {
  config: any = {
    title: 'Minesweeper',
    url: 'https://ksmai.github.io/html5-games/minesweeper',
    version: '1.0',
    backgroundColor: '#ffffff',
    scene: [],
  };
  instructions: string = `Find out all the safety areas!`;
}
