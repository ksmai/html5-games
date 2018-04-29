import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MinesweeperGameComponent } from './minesweeper-game/minesweeper-game.component';

const routes: Routes = [
  { path: '', component: MinesweeperGameComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class MinesweeperRoutingModule {
}
