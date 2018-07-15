import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhaserGameModule } from '../phaser-game/phaser-game.module';
import { HangmanGameComponent } from './hangman-game/hangman-game.component';
import { HangmanRoutingModule } from './hangman-routing.module';

@NgModule({
  imports: [
    CommonModule,

    PhaserGameModule,
    HangmanRoutingModule,
  ],

  declarations: [
    HangmanGameComponent,
  ],
})
export class HangmanModule {
}
