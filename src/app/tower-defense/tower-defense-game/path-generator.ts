import { Graph } from '../../../utils/graph';

export class PathGenerator {
  constructor(private width: number, private height: number) {
  }

  generate(minWidth: number = this.width): number[] {
    const graph = new Graph();
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        graph.addVertex(y * this.width + x);
      }
    }
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (y < this.height - 1) {
          graph.addEdge(y * this.width + x, (y + 1) * this.width + x);
        }
        if (x < this.width - 1) {
          graph.addEdge(y * this.width + x, y * this.width + (x + 1));
        }
      }
    }

    let tree = graph.growTree();
    let startX: number;
    let startY: number;
    let endX: number;
    let endY: number;
    let path: number[];
    let retryCount = 0;

    do {
      if (retryCount > 10) {
        tree = graph.growTree();
        retryCount = 0;
      }
      do {
        [startX, startY] = this.getRandomPointAtEdge();
        [endX, endY] = this.getRandomPointAtEdge();
      } while (Math.abs(startX - endX) + Math.abs(startY - endY) < 2);
      path = tree.search(startY * this.width + startX, endY * this.width + endX);
      this.shortcut(path);
      retryCount += 1;
    } while (path.length < minWidth);

    return path;
  }

  getRandomPointAtEdge() {
    const isAtHorizontalEdge = Math.random() < 0.5;
    let x: number;
    let y: number;
    if (isAtHorizontalEdge) {
      x = Math.floor(Math.random() * (this.width - 2)) + 1;
      y = Math.random() < 0.5 ? 0 : this.height - 1;
    } else {
      x = Math.random() < 0.5 ? 0 : this.width - 1;
      y = Math.floor(Math.random() * (this.height - 2)) + 1;
    }
    return [x, y];
  }

  shortcut(path: number[]): void {
    let hasShortcut = true;
    while (hasShortcut) {
      hasShortcut = false;
      for (let i = 0; i < path.length - 2; i++) {
        const y = Math.floor(path[i] / this.width);
        const x = path[i] % this.width;
        for (let j = i + 2; j < path.length; j++) {
          const y2 = Math.floor(path[j] / this.width);
          const x2 = path[j] % this.width;
          if (Math.abs(y - y2) + Math.abs(x - x2) <= 1) {
            path.splice(i + 1, j - i - 1);
            hasShortcut = true;
            break;
          }
        }
        if (hasShortcut) {
          break;
        }
      }
    }
  }
}
