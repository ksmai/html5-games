import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcentrationGameComponent } from './concentration-game.component';

describe('ConcentrationGameComponent', () => {
  let component: ConcentrationGameComponent;
  let fixture: ComponentFixture<ConcentrationGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcentrationGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcentrationGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
