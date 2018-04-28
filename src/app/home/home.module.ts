import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';

import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,

    HomeRoutingModule,
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
