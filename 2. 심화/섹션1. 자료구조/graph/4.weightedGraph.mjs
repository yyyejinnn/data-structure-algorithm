/**
 * 가중 그래프
 * - 간선(Edge)의 크기 저장하는 그래프
 * - 크기 -> 정점 간의 거리 또는 비용 등 -> 정하기 나름
 * - 방향 -> 방향에 따라 크기가 달라질 수도 있음
 */

class WeightedGraphVertex {
  constructor(value) {
    this.value = value;
    this.adjacentVertices = {};
  }

  addAdjacentVertex(vertex, weight) {
    this.adjacentVertices[vertex.value] = weight;
  }

  removeAdjacentVertex(vertex) {
    delete this.adjacentVertices[vertex.value];
  }
}

/** test */

const seoul = new WeightedGraphVertex('서울');
const wonju = new WeightedGraphVertex('원주');
const gangneung = new WeightedGraphVertex('강릉');
const deajeon = new WeightedGraphVertex('대전');
const jeonju = new WeightedGraphVertex('전주');
const daegu = new WeightedGraphVertex('대구');

seoul.addAdjacentVertex(wonju, 87);
seoul.addAdjacentVertex(deajeon, 140);
seoul.addAdjacentVertex(jeonju, 87);

console.log(seoul.adjacentVertices);
seoul.removeAdjacentVertex(deajeon);

console.log('===== After delete ====');
console.log(seoul.adjacentVertices);
