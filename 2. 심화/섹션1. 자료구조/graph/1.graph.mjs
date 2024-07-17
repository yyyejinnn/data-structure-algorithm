/**
 * 방향 그래프
 */

export class Vertex {
  // 정점
  constructor(value) {
    this.value = value;
    this.adjacentVertices = []; // 인접한 정점들
  }

  addAdjacentVertex(vertex) {
    // follow
    this.adjacentVertices.push(vertex);
  }

  removeAdjacentVertex(vertex) {
    this.adjacentVertices = this.adjacentVertices.filter((acentVertex) => acentVertex !== vertex);
  }
}

/** test */

let jake = new Vertex('Jake');
let ben = new Vertex('Ben');
let joy = new Vertex('Joy');
let ivy = new Vertex('Ivy');
let elin = new Vertex('Elin');
let anna = new Vertex('Anna');
let david = new Vertex('David');

jake.addAdjacentVertex(ben); // jake -> ben
ben.addAdjacentVertex(jake);
joy.addAdjacentVertex(ben);
joy.addAdjacentVertex(ivy);
ivy.addAdjacentVertex(joy);
ivy.addAdjacentVertex(ben);
elin.addAdjacentVertex(ivy);
elin.addAdjacentVertex(anna);
anna.addAdjacentVertex(ben);
anna.addAdjacentVertex(david);
anna.addAdjacentVertex(elin);
david.addAdjacentVertex(anna);

// console.log('====================================');
// console.log('Jake vertices: ', jake.adjacentVertices);
// console.log('Ben vertices: ', ben.adjacentVertices);
// console.log('Joy vertices: ', joy.adjacentVertices);
// console.log('Ivy vertices: ', ivy.adjacentVertices);
// console.log('Elin vertices: ', elin.adjacentVertices);
// console.log('David vertices: ', david.adjacentVertices);

// console.log('Before Anna vertices: ', anna.adjacentVertices);
// anna.removeAdjacentVertex(ben);
// console.log('After Anna vertices: ', anna.adjacentVertices);
