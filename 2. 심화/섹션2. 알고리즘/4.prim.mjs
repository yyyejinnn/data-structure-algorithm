/**
 * 최소 신장 트리 (Minimum Spanning Tree, MST)
 *
 * * 신장 트리
 *   - 트리도 그래프의 일종! (트리: 순환 구조 없는 그래프)
 *   - 순환구조 없이 모든 정점이 연결된 그래프
 *
 * * 최소 신장 트리
 *   - 수많은 신장 트리 중, 간선의 길이가 가장 짧은(최소한의 간선으로 만든) 신장 트리
 *   - ex. 크루스칼 알고리즘, 프림 알고리즘
 *
 * * 프림 알고리즘
 *   - 다익스트라 알고리즘과 구현 방식 비슷
 *   - 매순간 가장 가까운 정점을 찾아 모든 정점을 가장 짧게 연결하는 알고리즘 -> "탐욕 알고리즘"에 속함
 *
 * * 다익스트라 vs. 프림
 *  유사점) 구현 방식은 거의 동일
 *  차이점) 결과는 매우 다름 !!
 *    - 다익스트라: 시작~목적지까지 "최단 거리" 찾는 알고리즘, 방향/무방향 그래프에서 동작
 *    - 프림: 시작지에서 "최소 비용"으로 모든 정점 연결하는 알고리즘, 무방향에서만 동작
 */

{
  class City {
    constructor(name) {
      this.name = name;
      this.adjacentCities = {};
    }

    addAdjacentCity(city, distance) {
      this.adjacentCities[city.name] = distance;
    }

    removeAdjacentCity(city) {
      delete this.adjacentCities[city.name];
    }
  }

  class Prim {
    constructor() {
      this.allCities = {};
    }

    registerCity(city) {
      this.allCities[city.name] = city;
    }

    MST(startCity) {
      let visitedCities = {};
      let unvisitedCities = {};
      let mstTable = {};

      // unvisitedCities 초기화
      for (let cityName in this.allCities) {
        unvisitedCities[cityName] = this.allCities[cityName];
      }

      // mstTable 초기화
      if (!unvisitedCities[startCity.name]) {
        throw new Error('출발 도시가 등록되어 있지 않습니다.');
      } else {
        for (let cityName in unvisitedCities) {
          mstTable[cityName] = { distance: Infinity, prevCity: null };
        }

        mstTable[startCity.name] = { distance: 0, prevCity: null };
      }

      while (Object.keys(unvisitedCities).length > 0) {
        // 1) 방문하지 않은 도시 중 가장 가까운 도시
        let closestCityName = null;

        for (let cityName in unvisitedCities) {
          if (!closestCityName || mstTable[cityName].distance < mstTable[closestCityName].distance) {
            closestCityName = cityName;
          }
        }

        // 2) 방문한 도시로 update
        visitedCities[closestCityName] = unvisitedCities[closestCityName];
        delete unvisitedCities[closestCityName];

        // 3) 인접 도시 방문
        for (let adCityName in visitedCities[closestCityName].adjacentCities) {
          if (!unvisitedCities[adCityName]) {
            // 이미 방문한 도시일 경우
            continue;
          }

          /** !! 다익스트라와의 차이점 !!
           * let distance =
           *   mstTable[closestCityName] + // 출발 도시에서 현재도시까지의 거리 -> 프림에서는 XXX
           *   visitedCities[closestCityName].adjacentCities[adCityName]; // 현재 도시에서 인접 도시까지의 거리
           */

          let distance = visitedCities[closestCityName].adjacentCities[adCityName];

          // distance가 테이블에 저장된 최단 경로보다 짧을 경우 update
          if (distance < mstTable[adCityName].distance) {
            mstTable[adCityName].distance = distance;
            mstTable[adCityName].prevCity = visitedCities[closestCityName];
          }
        }
      }

      console.log(mstTable);
    }
  }

  /**
   * test
   * */

  const prim = new Prim();

  const seoul = new City('서울');
  const wonju = new City('원주');
  const gangneung = new City('강릉');
  const daejeon = new City('대전');
  const jeonju = new City('전주');
  const daegu = new City('대구');

  prim.registerCity(seoul);
  prim.registerCity(wonju);
  prim.registerCity(gangneung);
  prim.registerCity(daejeon);
  prim.registerCity(jeonju);
  prim.registerCity(daegu);

  // 양방향 연결
  seoul.addAdjacentCity(wonju, 87);
  wonju.addAdjacentCity(seoul, 87);

  seoul.addAdjacentCity(gangneung, 165);
  gangneung.addAdjacentCity(seoul, 165);

  seoul.addAdjacentCity(daejeon, 140);
  daejeon.addAdjacentCity(seoul, 140);

  seoul.addAdjacentCity(jeonju, 187);
  jeonju.addAdjacentCity(seoul, 187);

  wonju.addAdjacentCity(gangneung, 95);
  gangneung.addAdjacentCity(wonju, 95);

  wonju.addAdjacentCity(daejeon, 118);
  daejeon.addAdjacentCity(wonju, 118);

  wonju.addAdjacentCity(daegu, 178);
  daegu.addAdjacentCity(wonju, 178);

  gangneung.addAdjacentCity(daegu, 212);
  daegu.addAdjacentCity(gangneung, 212);

  daejeon.addAdjacentCity(jeonju, 56);
  jeonju.addAdjacentCity(daejeon, 56);

  daejeon.addAdjacentCity(daegu, 122);
  daegu.addAdjacentCity(daejeon, 122);

  jeonju.addAdjacentCity(daegu, 130);
  daegu.addAdjacentCity(jeonju, 130);

  prim.MST(seoul);
}
