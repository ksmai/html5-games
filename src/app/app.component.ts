import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MatSidenav } from '@angular/material';

import { SidenavService } from './core/sidenav.service';

@Component({
  selector: 'game-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title: string = 'Games';

  links: any[] = [{
    name: 'Test',
    path: '/',
  }, {
    name: 'Test 2',
    path: '/test2',
  }];

  @ViewChild('sidenav') private sidenavEl: MatSidenav;
  private subscription: Subscription;


  constructor(private sidenavService: SidenavService) {
  }

  ngOnInit(): void {
    this.subscription = this.sidenavService
      .getToggles()
      .subscribe(() => this.sidenavEl.toggle());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
