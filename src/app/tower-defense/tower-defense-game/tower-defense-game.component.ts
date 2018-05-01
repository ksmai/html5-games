import { Component } from '@angular/core';

import { StartScene } from './start.scene';
import { PlayScene } from './play.scene';

@Component({
  templateUrl: './tower-defense-game.component.html',
  styleUrls: ['./tower-defense-game.component.scss'],
})
export class TowerDefenseGameComponent {
  config: any = {
    title: 'Tower Defense',
    url: 'https://ksmai.github.io/html5-games/tower-defense',
    version: '1.0',
    pixelArt: false,
    antialias: true,
    width: 768,
    height: 432,
    zoom: 1,
    scene: [
      StartScene,
      PlayScene,
    ],
  };
  instructions: string = `Kill all the enemies before they touch the star!`;
}
