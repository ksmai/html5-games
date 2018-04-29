import { Component } from '@angular/core';

import { StartScene } from './start.scene';
import { PlayScene } from './play.scene';
import { ScoreScene } from './score.scene';

@Component({
  selector: 'game-concentration-game',
  templateUrl: './concentration-game.component.html',
  styleUrls: ['./concentration-game.component.scss']
})
export class ConcentrationGameComponent {
  config: any = {
    title: 'Concentration',
    url: 'https://ksmai.github.io/html5-games/concentration',
    version: '1.0',
    backgroundColor: '#529848',
    scene: [
      StartScene,
      PlayScene,
      ScoreScene,
    ],
  };

  instructions: string = `Eliminate all the cards by flipping the matching pairs`;
}
