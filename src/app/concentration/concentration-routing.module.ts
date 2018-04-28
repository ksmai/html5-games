import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConcentrationGameComponent } from './concentration-game/concentration-game.component';

const routes: Routes = [
  { path: '', component: ConcentrationGameComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class ConcentrationRoutingModule {
}
