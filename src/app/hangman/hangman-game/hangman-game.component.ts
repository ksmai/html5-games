import { Component } from '@angular/core';

import { StartScene } from './start.scene';
import { PlayScene } from './play.scene';

@Component({
  templateUrl: './hangman-game.component.html',
  styleUrls: ['./hangman-game.component.scss'],
})
export class HangmanGameComponent {
  config: any = {
    title: 'Hangman',
    url: 'https://ksmai.github.io/html5-games/hangman',
    version: '1.0',
    pixelArt: false,
    antialias: true,
    width: 864,
    height: 486,
    zoom: 1,
    backgroundColor: '#cccccc',
    scene: [
      StartScene,
      PlayScene,
    ],
  };
  instructions: string = 'Guess the word before the man gets hanged!';
}
