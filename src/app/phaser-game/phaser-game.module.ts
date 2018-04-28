import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhaserGameContainerComponent } from './phaser-game-container/phaser-game-container.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PhaserGameContainerComponent,
  ],
  exports: [
    PhaserGameContainerComponent,
  ],
})
export class PhaserGameModule { }
