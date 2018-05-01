import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TowerDefenseGameComponent } from './tower-defense-game/tower-defense-game.component';

const routes: Routes = [
  { path: '', component: TowerDefenseGameComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class TowerDefenseRoutingModule {
}
