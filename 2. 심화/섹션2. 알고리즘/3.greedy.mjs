/**
 * * 탐욕 알고리즘?
 * - "최적해"를 구하는데 사용되는 근사적인 방법
 * - 매 선택지에서 현 상황에 가장 좋다고 판단하는 선택을 하는 것
 *
 * * 최적해를 얻을 수 있는 조건?
 * 1. 탐욕스러운 선택 속성 (greedy choice property)
 *  - 앞의 선택이 이후 선택에 영향을 주지 않는다는 뜻
 *
 * 2. 최적 부분 구조 조건 (optimal substructure)
 *  - 문제에 대한 최적해가 부분 문제에 대해서도 역시 최적해라는 뜻
 *
 * => 탐욕스러운 선택 속성 + 최적 부분 구조 조건 = "매트로이드"
 */

/**
 * ex. 거스름돈 문제
 */
class Coin {
  constructor(won) {
    this.won = won;
    this.count = 0;
  }
}

function changeCoin(money) {
  console.log(`${money}원 거슬러주기`);

  const coins = [new Coin(500), new Coin(100), new Coin(50), new Coin(10)];

  for (let c of coins) {
    while (c.won <= money) {
      money -= c.won;
      c.count++;
    }
  }

  console.log(coins);
}

changeCoin(2380);
changeCoin(500);
changeCoin(9870);
