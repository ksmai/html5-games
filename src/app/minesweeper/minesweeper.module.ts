import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MinesweeperGameComponent } from './minesweeper-game/minesweeper-game.component';
import { MinesweeperRoutingModule } from './minesweeper-routing.module';
import { PhaserGameModule } from '../phaser-game/phaser-game.module';

@NgModule({
  imports: [
    CommonModule,
    MinesweeperRoutingModule,
    PhaserGameModule,
  ],
  declarations: [
    MinesweeperGameComponent,
  ],
})
export class MinesweeperModule {
}
