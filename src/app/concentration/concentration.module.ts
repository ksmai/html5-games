import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConcentrationGameComponent } from './concentration-game/concentration-game.component';
import { ConcentrationRoutingModule } from './concentration-routing.module';
import { PhaserGameModule } from '../phaser-game/phaser-game.module';

@NgModule({
  imports: [
    CommonModule,

    ConcentrationRoutingModule,
    PhaserGameModule,
  ],
  declarations: [ConcentrationGameComponent]
})
export class ConcentrationModule { }
