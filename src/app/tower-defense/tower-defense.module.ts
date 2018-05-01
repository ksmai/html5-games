import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';

import { TowerDefenseGameComponent } from './tower-defense-game/tower-defense-game.component';
import { TowerDefenseRoutingModule } from './tower-defense-routing.module';
import { PhaserGameModule } from '../phaser-game/phaser-game.module';

@NgModule({
  imports: [
    CommonModule,

    PhaserGameModule,
    TowerDefenseRoutingModule,
  ],
  declarations: [
    TowerDefenseGameComponent,
  ],
})
export class TowerDefenseModule {
}
