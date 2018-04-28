import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SidenavService {
  toggle$ = new Subject<any>();

  toggle(): void {
    this.toggle$.next();
  }

  getToggles(): Observable<any> {
    return this.toggle$.asObservable();
  }
}
