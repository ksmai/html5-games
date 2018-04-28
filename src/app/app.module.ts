import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import {
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule,
} from '@angular/material';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import 'hammerjs';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    ServiceWorkerModule.register('./ngsw-worker.js', {
      enabled: environment.production,
    }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
