import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'concentration', loadChildren: './concentration/concentration.module#ConcentrationModule' },
  { path: 'minesweeper', loadChildren: './minesweeper/minesweeper.module#MinesweeperModule' },
  { path: 'tic-tac-toe', loadChildren: './tic-tac-toe/tic-tac-toe.module#TicTacToeModule' },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
