/**
 * * 트리와 그래프
 * - 트리는 그래프의 한 종류이다.
 * - 그래프가 특정 조건을 가지면 트리임
 *
 * * 그래프 -> 트리가 되기 위한 특정 조건
 * 1. 노드는 부모/자식 계층적 구조를 가지며, 그래프에서 사이클이 없어야 한다.
 *   - 사이클? 노드들이 서로 순환적으로 참조하는 경우
 * 2. 연결되지 않은 노드가 없어야 한다.
 *
 * * 그래프 용어
 * - 노드를 "정점"이라고 부름
 * - 간선(Edge): 정점을 잇는 선
 * - 간선으로 연결된 정점을 서로 "인접(Adjacent)"했다고 함
 * - 인접한 정점은 "이웃(Neighbor)"이라고 함
 *   ex. 정점2는 정점1의 이웃
 *
 * * 방향 그래프
 * - 연결된 방향이 추가 된 그래프 (양방향으로 관계를 표현하는 그래프)
 *
 * ***** ***** *****
 *
 * * DFS vs. BFS
 * - DFS: 인접 정점을 방문하면, 그 정점의 인접 정점을 끝까지 탐색하는 기법
 * - BFS: 방문한 정점의 모든 인접 정점을 먼저 탐색하는 기법
 *
 * * 성능
 * - 성능은 동일, 상황에 따라 선택하자..
 * - 그래프의 성능은 정점(V), 간선(E)의 수에 따라 달라짐 O(V+E)
 */
