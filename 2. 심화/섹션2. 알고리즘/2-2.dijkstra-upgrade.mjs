/**
 * 경로까지 출력하도록 수정하기
 */

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

class Dijkstra {
  constructor() {
    this.allCities = {};
  }

  registerCity(city) {
    this.allCities[city.name] = city;
  }

  shortestPath(startCity, endCity) {
    let visitedCities = {};
    let unvisitedCities = {};
    let shortestPathTable = {};

    // unvisitedCities 초기화
    for (let cityName in this.allCities) {
      unvisitedCities[cityName] = this.allCities[cityName];
    }

    // shortestPathTable 초기화
    if (!unvisitedCities[startCity.name]) {
      throw new Error('출발 도시가 등록되어 있지 않습니다.');
    } else {
      for (let cityName in unvisitedCities) {
        shortestPathTable[cityName] = { distance: Infinity, prevCity: null };
      }

      shortestPathTable[startCity.name] = { distance: 0, prevCity: null };
    }

    // 최단 경로
    while (Object.keys(unvisitedCities).length > 0) {
      // 1) 방문하지 않은 도시 중 가장 가까운 도시
      let closestCityName = null;

      for (let cityName in unvisitedCities) {
        if (!closestCityName || shortestPathTable[cityName].distance < shortestPathTable[closestCityName].distance) {
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

        let distance =
          shortestPathTable[closestCityName].distance + // 출발 도시에서 현재도시까지의 거리
          visitedCities[closestCityName].adjacentCities[adCityName]; // 현재 도시에서 인접 도시까지의 거리

        // distance가 테이블에 저장된 최단 경로보다 짧을 경우 update
        if (distance < shortestPathTable[adCityName].distance) {
          // shortestPathTable[adCityName] = { distance, prevCity: visitedCities[closestCityName] };
          shortestPathTable[adCityName].distance = distance;
          shortestPathTable[adCityName].prevCity = visitedCities[closestCityName];
        }
      }
    }

    // console.log(shortestPathTable);
    const pathStrig = this.showShortestPathRecursively(endCity.name, shortestPathTable);
    console.log(pathStrig);
  }

  /** 콜스택(재귀) 이용해서 출발지 -> 목적지까지 출력하는 메서드 */
  showShortestPathRecursively(destinationCityName, shortestPathTable) {
    if (!shortestPathTable[destinationCityName].prevCity) {
      return destinationCityName;
    }

    const prevCityName = this.showShortestPathRecursively(
      shortestPathTable[destinationCityName].prevCity.name,
      shortestPathTable
    );

    return prevCityName + ' -> ' + destinationCityName;
  }
}

/**
 * test
 * */

const dijkstra = new Dijkstra();

const seoul = new City('서울');
const wonju = new City('원주');
const gangneung = new City('강릉');
const daejeon = new City('대전');
const jeonju = new City('전주');
const daegu = new City('대구');

dijkstra.registerCity(seoul);
dijkstra.registerCity(wonju);
dijkstra.registerCity(gangneung);
dijkstra.registerCity(daejeon);
dijkstra.registerCity(jeonju);
dijkstra.registerCity(daegu);

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

dijkstra.shortestPath(seoul, daegu);
