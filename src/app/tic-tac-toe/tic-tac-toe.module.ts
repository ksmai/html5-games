import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PhaserGameModule } from '../phaser-game/phaser-game.module';
import { TicTacToeGameComponent } from './tic-tac-toe-game/tic-tac-toe-game.component';
import { TicTacToeRoutingModule } from './tic-tac-toe-routing.module';

@NgModule({
  imports: [
    CommonModule,

    PhaserGameModule,
    TicTacToeRoutingModule,
  ],
  declarations: [
    TicTacToeGameComponent,
  ],
})
export class TicTacToeModule {
}
