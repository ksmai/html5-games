import { NgModule, Optional, SkipSelf } from '@angular/core';

import { SidenavService } from './sidenav.service';

@NgModule({
  imports: [
  ],
  providers: [
    SidenavService,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() coreModule: CoreModule) {
    if (coreModule) {
      throw new Error('CoreModule can only be imported once');
    }
  }
}
