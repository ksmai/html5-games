type VertexMap = {
  [key: number]: any;
};

type Edges = {
  [key: number]: VertexMap;
};

import { inPlaceFisherYatesShuffle } from './shuffle';

/**
 * Simple undirected graph with no self loop
 */
export class Graph<T extends number> {
  private vertices: VertexMap = {};
  private edges: Edges = {};

  /**
   * Add a new vertex
   */
  addVertex(vertex: T): void {
    if (this.vertices.hasOwnProperty(vertex.toString())) {
      throw new Error(`Vertex already exists: ${vertex}`);
    }
    this.vertices[vertex.toString()] = true;
    this.edges[vertex.toString()] = {};
  }

  /**
   * Add a new edge between two existing vertices
   */
  addEdge(vertex1: T, vertex2: T) {
    if (vertex1 === vertex2) {
      throw new Error(`Self loop is not allowed: ${vertex1}`);
    }
    if (!this.vertices.hasOwnProperty(vertex1.toString())) {
      throw new Error(`Unknown vertex: ${vertex1}`);
    }
    if (!this.vertices.hasOwnProperty(vertex2.toString())) {
      throw new Error(`Unknown vertex: ${vertex2}`);
    }
    if (this.edges[vertex1.toString()].hasOwnProperty(vertex2.toString())) {
      throw new Error(`Edge already exists: ${vertex1} - ${vertex2}`);
    }
    if (this.edges[vertex2.toString()].hasOwnProperty(vertex1.toString())) {
      throw new Error(`Edge already exists: ${vertex2} - ${vertex1}`);
    }
    this.edges[vertex1.toString()][vertex2.toString()] = true;
    this.edges[vertex2.toString()][vertex1.toString()] = true;
  }

  getVertices(): VertexMap {
    return this.vertices;
  }

  getEdges(): Edges {
    return this.edges;
  }

  /**
   * Get a spanning tree from the graph
   * The algorithm starts from a random vertex and
   * add the vertex to both the visited set and the active set
   * at each iteration, choose either a random node between or 
   * the oldest node in the active set, and visit a random unvisited
   * neighbour of that node
   * if the chosen node has no unvisited neighbour, it will get removed
   * from the active set
   * The process repeats until there are no more nodes in the active set
   */
  growTree() {
    const tree = new Graph();
    const activeNodes: T[] = [];
    const activeNodeSet: VertexMap = {};
    const visitedNodeSet: VertexMap = {};
    const numNodes = Object.keys(this.vertices).length;
    const randomIndex = Math.floor(Math.random() * numNodes);
    const startingNode = Object.keys(this.vertices)[randomIndex];
    activeNodes.push(+startingNode as T);
    activeNodeSet[+startingNode] = true;
    visitedNodeSet[+startingNode] = true;
    tree.addVertex(+startingNode);
    while (activeNodes.length) {
      let hasUnvisitedNeighbor = false;
      const nodeIdx = Math.random() < 0.5 ? 0 : Math.floor(Math.random() * activeNodes.length);
      const node = activeNodes[nodeIdx];
      const neighbours = inPlaceFisherYatesShuffle(Object.keys(this.edges[node.toString()]));
      for (let neighbour of neighbours) {
        if (!visitedNodeSet.hasOwnProperty(neighbour.toString())) {
          hasUnvisitedNeighbor = true;
          activeNodes.push(+neighbour as T);
          activeNodeSet[+neighbour] = true;
          visitedNodeSet[+neighbour] = true;
          tree.addVertex(+neighbour);
          tree.addEdge(+node, +neighbour);
          break;
        }
      }
      if (!hasUnvisitedNeighbor) {
        activeNodes.splice(nodeIdx, 1);
        delete activeNodeSet[+node];
      }
    }

    return tree;
  }

  /**
   * Search a path between two vertices by DFS
   */
  search(start: T, end: T): T[] {
    const path = [start];
    const visited: VertexMap = {
      [start.toString()]: true,
    };

    while (path.length) {
      const nodes = Object.keys(this.edges[path[path.length - 1].toString()]);
      let hasMove = false;
      for (let node of nodes) {
        if (!visited[node.toString()]) {
          path.push(+node as T);
          visited[node.toString()] = true;
          hasMove = true;
          break;
        }
      }
      if (!hasMove) {
        path.pop();
      } else if (path[path.length - 1] === end) {
        break;
      }
    }

    return path;
  }

  debug(width: number, height: number) {
    const vertices = Object.keys(this.vertices).map(Number).sort();
    const rows = [];
    for (let y = 0; y < height; y++) {
      let row = '';
      let nextRow = '';
      for (let x = 0; x < width; x++) {
        const n = y * width + x;
        row += 0;
        if (x < width - 1 && this.edges[n.toString()].hasOwnProperty((n + 1).toString())) {
          row += '-';
        } else {
          row += ' ';
        }
        if (y < height - 1) {
          if (this.edges[n.toString()].hasOwnProperty((n + width).toString())) {
            nextRow += '| ';
          } else {
            nextRow += '  ';
          }
        }
      }
      rows.push(row, nextRow);
    }
    console.log(rows.join('\n'));
  }
}
