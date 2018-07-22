import * as Phaser from 'phaser';

export class Hanger extends Phaser.GameObjects.Graphics {
  private countdown: number = 7;
  private _left: number = 332;
  private _top: number = 50;
  private _width: number = 200;
  private _height: number = 250;
  private _thickness: number = 8;
  private _color: number = 0x333333;
  private _ropeLength: number = 20;
  private _headRadius: number = 20;
  private _bodyLength: number = 50;
  private _armLength: number = 30;
  private _legLength: number = 40;
  private _armAngle: number = Math.PI / 3;
  private _legAngle: number = Math.PI / 4;

  constructor(scene: Phaser.Scene, private onDie: () => void) {
    super(scene, {});
    this.scene.add.existing(this);
    this.setup();
  }

  hang(): void {
    let x1, x2, y1, y2;
    switch (--this.countdown) {
      case 6:
        x1 = x2 = this._left + this._width / 2;
        y1 = this._top;
        y2 = y1 + this._ropeLength;
        this.beginPath();
        this.moveTo(x1, y1);
        this.lineTo(x2, y2);
        this.closePath();
        this.strokePath();
        break;
      case 5:
        this.strokeCircle(
          this._left + this._width / 2,
          this._top + this._ropeLength + this._headRadius,
          this._headRadius,
        );
        break;
      case 4:
        x1 = x2 = this._left + this._width / 2;
        y1 = this._top + this._ropeLength + 2 * this._headRadius;
        y2 = y1 + this._bodyLength;
        this.beginPath();
        this.moveTo(x1, y1);
        this.lineTo(x2, y2);
        this.closePath();
        this.strokePath();
        break;
      case 3:
        x1 = this._left + this._width / 2;
        y1 = this._top + this._ropeLength + 2 * this._headRadius + this._bodyLength / 2;
        x2 = x1 - this._armLength * Math.sin(this._armAngle);
        y2 = y1 - this._armLength * Math.cos(this._armAngle);
        this.beginPath();
        this.moveTo(x1, y1);
        this.lineTo(x2, y2);
        this.closePath();
        this.strokePath();
        break;
      case 2:
        x1 = this._left + this._width / 2;
        y1 = this._top + this._ropeLength + 2 * this._headRadius + this._bodyLength / 2;
        x2 = x1 + this._armLength * Math.sin(this._armAngle);
        y2 = y1 - this._armLength * Math.cos(this._armAngle);
        this.beginPath();
        this.moveTo(x1, y1);
        this.lineTo(x2, y2);
        this.closePath();
        this.strokePath();
        break;
      case 1:
        x1 = this._left + this._width / 2;
        y1 = this._top + this._ropeLength + 2 * this._headRadius + this._bodyLength - this._thickness * Math.sin(this._legAngle);
        x2 = x1 - this._legLength * Math.sin(this._legAngle);
        y2 = y1 + this._legLength * Math.cos(this._legAngle);
        this.beginPath();
        this.moveTo(x1, y1);
        this.lineTo(x2, y2);
        this.closePath();
        this.strokePath();
        break;
      case 0:
        x1 = this._left + this._width / 2;
        y1 = this._top + this._ropeLength + 2 * this._headRadius + this._bodyLength - this._thickness * Math.sin(this._legAngle);
        x2 = x1 + this._legLength * Math.sin(this._legAngle);
        y2 = y1 + this._legLength * Math.cos(this._legAngle);
        this.beginPath();
        this.moveTo(x1, y1);
        this.lineTo(x2, y2);
        this.closePath();
        this.strokePath();
        this.onDie();
    }
  }

  private setup(): void {
    this.lineStyle(this._thickness, this._color);
    this.beginPath();
    this.moveTo(this._left, this._top);
    this.lineTo(this._left + this._width, this._top);
    this.moveTo(this._left, this._top - this._thickness / 2);
    this.lineTo(this._left, this._top + this._height + this._thickness / 2);
    this.moveTo(this._left, this._top + this._height);
    this.lineTo(this._left + this._width, this._top + this._height);
    this.closePath();
    this.strokePath();
  }
}
