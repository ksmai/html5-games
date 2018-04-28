import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaserGameContainerComponent } from './phaser-game-container.component';

describe('PhaserGameContainerComponent', () => {
  let component: PhaserGameContainerComponent;
  let fixture: ComponentFixture<PhaserGameContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhaserGameContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaserGameContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
