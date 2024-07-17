/**
 * 깊이 우선 탐색 알고리즘 (Depth First Search, DFS)
 *
 * * 동작 과정 (콜스택 방식)
 * 1. 현재 정점을 해시테이블에 저장
 * 2. 현재 정점의 인접 정점들 순회 (방문했던 정점이면 순회하지 않음)
 * 3. 방문하지 않았던 정점이면 그 정점에 대해서 재귀적으로 dfs 수행
 *
 * -> 시작 정점의 인접 정점 중 하나를 먼저 끝까지 탐색하고
 * 나머지 인접 정점도 같은 방식으로 탐색하는 알고리즘
 */

import { Vertex } from './1.graph.mjs';

function dfs(vertex, visitedVertices = {}) {
  visitedVertices[vertex.value] = true;

  console.log('정점: ', vertex.value);

  for (const adjacent of vertex.adjacentVertices) {
    if (visitedVertices[adjacent.value] == true) {
      continue; // 이미 방문했을 경우
    } else {
      dfs(adjacent, visitedVertices);
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

// dfs(ben);
