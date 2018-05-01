import * as Phaser from 'phaser';

import { PathGenerator } from './path-generator';

interface Tileset {
  TOP_LEFT_INNER: number;
  TOP_RIGHT_INNER: number;
  BOTTOM_LEFT_INNER: number;
  BOTTOM_RIGHT_INNER: number;
  TOP_LEFT_OUTER: number;
  TOP_RIGHT_OUTER: number;
  BOTTOM_LEFT_OUTER: number;
  BOTTOM_RIGHT_OUTER: number;
  TOP: number;
  BOTTOM: number;
  LEFT: number;
  RIGHT: number;
  MIDDLE: number;
  COIN: number;
  SIDE: number;
}

const TILE_OFFSETS: Tileset = {
  TOP_LEFT_INNER: 48,
  TOP_RIGHT_INNER: 46,
  BOTTOM_LEFT_INNER: 2,
  BOTTOM_RIGHT_INNER: 0,
  TOP_LEFT_OUTER: 3,
  TOP_RIGHT_OUTER: 4,
  BOTTOM_LEFT_OUTER: 26,
  BOTTOM_RIGHT_OUTER: 27,
  TOP: 47,
  BOTTOM: 1,
  LEFT: 25,
  RIGHT: 23,
  MIDDLE: 50,
  COIN: 49,
  SIDE: 24,
};

const TILES: Tileset[] = [];
for (let y = 0; y < 4; y++) {
  for (let x = 0; x < 3; x++) {
    const offset = y * (3 * 23) + x * 5;
    const tiles: { [key: string]: number } = {};
    for (let [key, value] of Object.entries(TILE_OFFSETS)) {
      tiles[key] = value + offset;
    }
    TILES.push(tiles as any as Tileset);
  }
}

export class PlayScene extends Phaser.Scene {
  private map: number[][];
  private startNodes: number[][];
  private endNodes: number[][];

  constructor() {
    super({ key: 'PlayScene' })
  }

  init() {
    const mapWidth = this.sys.canvas.width / 64;
    const mapHeight = this.sys.canvas.height / 64;
    const pathGeneratorWidth = Math.ceil(mapWidth / 2);
    const pathGeneratorHeight = Math.ceil(mapHeight / 2);
    const pathGenerator = new PathGenerator(pathGeneratorWidth, pathGeneratorHeight);
    const path = pathGenerator.generate(pathGeneratorWidth + pathGeneratorHeight);

    this.map = Array<number[]>(mapHeight)
      .fill(null)
      .map(() => Array<number>(mapWidth).fill(0));
    for (let node of path) {
      const y = Math.floor(node / pathGeneratorWidth);
      const x = node % pathGeneratorWidth;
      if (y * 2 < mapHeight && x * 2 < mapWidth) {
        this.map[y * 2][x * 2] = 1;
      }
      if (y * 2 + 1 < mapHeight && x * 2 < mapWidth) {
        this.map[y * 2 + 1][x * 2] = 1;
      }
      if (y * 2 < mapHeight && x * 2 + 1 < mapWidth) {
        this.map[y * 2][x * 2 + 1] = 1;
      }
      if (y * 2 + 1 < mapHeight && x * 2 + 1 < mapWidth) {
        this.map[y * 2 + 1][x * 2 + 1] = 1;
      }
    }
    const startNode = path[0];
    const startNodeY = 2 * Math.floor(startNode / pathGeneratorWidth);
    const startNodeX = 2 * (startNode % pathGeneratorWidth);
    this.startNodes = [];
    if (startNodeX === 0) {
      this.startNodes.push([startNodeX, startNodeY], [startNodeX, startNodeY + 1]);
    }
    if (startNodeX === mapWidth - 2) {
      this.startNodes.push([startNodeX + 1, startNodeY], [startNodeX + 1, startNodeY + 1]);
    }
    if (startNodeY === 0) {
      this.startNodes.push([startNodeX, startNodeY], [startNodeX + 1, startNodeY]);
    }
    if (startNodeY === mapHeight - 2) {
      this.startNodes.push([startNodeX, startNodeY + 1], [startNodeX + 1, startNodeY + 1]);
    }

    const endNode = path[path.length - 1];
    const endNodeY = 2 * Math.floor(endNode / pathGeneratorWidth);
    const endNodeX = 2 * (endNode % pathGeneratorWidth);
    this.endNodes = [];
    if (endNodeX === 0) {
      this.endNodes.push([endNodeX, endNodeY], [endNodeX, endNodeY + 1]);
    }
    if (endNodeX === mapWidth - 2) {
      this.endNodes.push([endNodeX + 1, endNodeY], [endNodeX + 1, endNodeY + 1]);
    }
    if (endNodeY === 0) {
      this.endNodes.push([endNodeX, endNodeY], [endNodeX + 1, endNodeY]);
    }
    if (endNodeY === mapHeight - 2) {
      this.endNodes.push([endNodeX, endNodeY + 1], [endNodeX + 1, endNodeY + 1]);
    }
  }

  preload() {
    this.load.spritesheet(
      'spritesheet',
      'assets/tower-defense/tilesheet/tilesheet.png',
      { frameWidth: 64, frameHeight: 64 },
    );
  }

  create() {
    const tileset = TILES[Math.floor(Math.random() * TILES.length)];
    const data: number[][] = [];
    for (let y = 0; y < this.map.length; y++) {
      const row = [];
      for (let x = 0; x < this.map[y].length; x++) {
        let currentTile: number;
        if (this.map[y][x]) {
          if (y === 0 && !this.isTerminalNode(x, y) || y > 0 && !this.map[y - 1][x]) {
            if (x === 0 && !this.isTerminalNode(x, y) || x > 0 && !this.map[y][x - 1]) {
              currentTile = tileset.TOP_LEFT_OUTER;
            } else if (x === this.map[y].length - 1 && !this.isTerminalNode(x, y) || x < this.map[y].length - 1 && !this.map[y][x + 1]) {
              currentTile = tileset.TOP_RIGHT_OUTER;
            } else {
              currentTile = tileset.TOP;
            }
          } else if (y === this.map.length - 1 && !this.isTerminalNode(x, y) || y < this.map.length - 1 && !this.map[y + 1][x]) {
            if (x === 0 && !this.isTerminalNode(x, y) || x > 0 && !this.map[y][x - 1]) {
              currentTile = tileset.BOTTOM_LEFT_OUTER;
            } else if (x === this.map[y].length - 1 && !this.isTerminalNode(x, y) || x < this.map[y].length - 1 && !this.map[y][x + 1]) {
              currentTile = tileset.BOTTOM_RIGHT_OUTER;
            } else {
              currentTile = tileset.BOTTOM;
            }
          } else if (x === 0 && !this.isTerminalNode(x, y) || x > 0 && !this.map[y][x - 1]) {
            currentTile = tileset.LEFT;
          } else if (x === this.map[y].length - 1 && !this.isTerminalNode(x, y) || x < this.map[y].length - 1 && !this.map[y][x + 1]) {
            currentTile = tileset.RIGHT;
          } else {
            if (x > 0 && y > 0 && !this.map[y - 1][x - 1]) {
              currentTile = tileset.TOP_LEFT_INNER;
            } else if (x < this.map[y].length - 1 && y > 0 && !this.map[y - 1][x + 1]) {
              currentTile = tileset.TOP_RIGHT_INNER;
            } else if (x > 0 && y < this.map.length - 1 && !this.map[y + 1][x - 1]) {
              currentTile = tileset.BOTTOM_LEFT_INNER;
            } else if (x < this.map[y].length - 1 && y < this.map.length - 1 && !this.map[y + 1][x + 1]) {
              currentTile = tileset.BOTTOM_RIGHT_INNER;
            } else {
              currentTile = tileset.MIDDLE;
            }
          }
        } else {
          currentTile = tileset.SIDE;
        }
        row.push(currentTile);
      }
      data.push(row);
    }

    const map = this.make.tilemap({
      data,
      tileWidth: 64,
      tileHeight: 64,
    });
    const tiles = map.addTilesetImage('spritesheet');
    const layer = map.createStaticLayer(0, tiles, 0, 0);

    this.input.once('pointerdown', () => this.scene.restart());
  }

  private isTerminalNode(x: number, y: number): boolean {
    const startNode = this.startNodes.find((node) => node[0] === x && node[1] === y);
    if (startNode) {
      return true;
    }
    const endNode = this.endNodes.find((node) => node[0] === x && node[1] === y);
    if (endNode) {
      return true;
    }
    return false;
  }
}
