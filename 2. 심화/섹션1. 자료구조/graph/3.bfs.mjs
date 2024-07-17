/**
 * 너비 우선 탐색 알고리즘 (Breadth First Search, BFS)
 *
 * * 동작 과정 (큐)
 * 1. 방문한 정점으로 저장하고(해시 테이블), 방문한 정점을 큐에 삽입
 * 2. 큐에서 dequeue
 * 3. dequeue한 정점의 모든 인접 정점 순차적으로 순회
 *   -> 만약 인접 정점이 이미 방문한 정점이라면 건너뛰고, 방문하지 않은 정점이라면 1~ 반복
 *
 * 4. 큐가 비어있을 때까지 1~3 반복
 */

import { Vertex } from './1.graph.mjs';
import { Queue } from '../../../1. 기본/섹션1. 자료구조/3.queue.mjs';

function bfs(vertex) {
  let queue = new Queue();
  let visitedVertices = new Set();

  // 첫번째 정점 저장
  visitedVertices.add(vertex.value);
  queue.enqueue(vertex);

  while (!queue.isEmpty()) {
    let currVertex = queue.dequeue().data;
    console.log('정점: ', currVertex.value);

    // 이웃 순차적으로 순회
    for (const adjacent of currVertex.adjacentVertices) {
      if (visitedVertices.has(adjacent.value)) {
        continue; // 이미 방문한 이웃이면 건너 뜀
      } else {
        visitedVertices.add(adjacent.value);
        queue.enqueue(adjacent);
      }
    }
  }
}

let jake = new Vertex('Jake');
let ben = new Vertex('Ben');
let joy = new Vertex('Joy');
let ivy = new Vertex('Ivy');
let elin = new Vertex('Elin');
let anna = new Vertex('Anna');
let david = new Vertex('David');
let owen = new Vertex('Owen');

// 모두 양방향 관계
ben.addAdjacentVertex(ivy);
ben.addAdjacentVertex(jake);
ben.addAdjacentVertex(anna);
ben.addAdjacentVertex(david);

ivy.addAdjacentVertex(ben);
ivy.addAdjacentVertex(joy);

joy.addAdjacentVertex(ivy);
joy.addAdjacentVertex(jake);

jake.addAdjacentVertex(ben);
jake.addAdjacentVertex(joy);

anna.addAdjacentVertex(ben);

david.addAdjacentVertex(ben);
david.addAdjacentVertex(elin);

elin.addAdjacentVertex(david);
elin.addAdjacentVertex(owen);

owen.addAdjacentVertex(elin);

bfs(ben);
