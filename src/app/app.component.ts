import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MatSidenav } from '@angular/material';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd, RouterEvent } from '@angular/router';

import { SidenavService } from './core/sidenav.service';

@Component({
  selector: 'game-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title: string = 'Games';
  isLoadingRouteConfig: boolean = false;

  links: any[] = [{
    name: 'Concentration',
    path: '/concentration',
  }, {
    name: 'Hangman',
    path: '/hangman',
  }, /*{
    name: 'Minesweeper',
    path: '/minesweeper',
  },*/ {
    name: 'Tic Tac Toe',
    path: '/tic-tac-toe',
  }, {
    name: 'Tower Defense',
    path: '/tower-defense',
  }];

  @ViewChild('sidenav') private sidenavEl: MatSidenav;
  private subscription: Subscription;


  constructor(
    private sidenavService: SidenavService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.sidenavService
      .getToggles()
      .subscribe(() => this.sidenavEl.toggle());
    this.subscription.add(
      this.router.events.subscribe((evt: RouterEvent) => {
        if (evt instanceof RouteConfigLoadStart) {
          this.isLoadingRouteConfig = true;
        } else if (evt instanceof RouteConfigLoadEnd) {
          this.isLoadingRouteConfig = false;
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onNavigate(): void {
    setTimeout(() => {
      this.sidenavEl.close();
    }, 200);
  }
}
