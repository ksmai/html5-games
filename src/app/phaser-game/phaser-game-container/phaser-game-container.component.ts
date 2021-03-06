import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  Input,
} from '@angular/core';
import * as Phaser from 'phaser';

@Component({
  selector: 'game-phaser-game-container',
  templateUrl: './phaser-game-container.component.html',
  styleUrls: ['./phaser-game-container.component.scss']
})
export class PhaserGameContainerComponent implements AfterViewInit, OnDestroy {
  @Input() config: any = {};
  @Input() title: string = '';
  @Input() instructions: string = '';
  private game: Phaser.Game;
  @ViewChild('gameContainer') private gameContainer: ElementRef;

  constructor(private el: ElementRef) { }

  ngAfterViewInit(): void {
    this.game = new Phaser.Game(Object.assign({}, {
      width: 288,
      height: 162,
      zoom: Math.min(3, (window.innerWidth - 64) / 288),
      pixelArt: true,
      antialias: false,
      type: Phaser.AUTO,
      parent: this.gameContainer.nativeElement,
    }, this.config));
    if (this.config.width) {
      this.el.nativeElement.style.width = `${this.config.width + 64}px`;
    } else {
      this.el.nativeElement.style.width = '928px';
    }
  }

  ngOnDestroy() {
    this.game.destroy(true);
  }
}
