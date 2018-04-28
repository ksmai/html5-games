import { Component } from '@angular/core';

@Component({
  selector: 'game-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'Games';

  links: any[] = [{
    name: 'Test',
    path: '/',
  }, {
    name: 'Test 2',
    path: '/test2',
  }];
}
