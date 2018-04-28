import { Component } from '@angular/core';
import { SidenavService } from '../../core/sidenav.service';

@Component({
  selector: 'game-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private sidenavService: SidenavService) {
  }

  onStartPlaying(evt: Event) {
    evt.preventDefault();
    this.sidenavService.toggle();
  }
}
