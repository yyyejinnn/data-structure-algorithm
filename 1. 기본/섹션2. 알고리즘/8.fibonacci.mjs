/**
 * 재귀 -> 중복 계산 호출 -> 성능 저하.. -> 메모이제이션!
 */
function fibonacci1(n) {
  if (n == 0 || n == 1) return n;
  return fibonacci1(n - 2) + fibonacci1(n - 1);
}

/**
 * 메모이제이션 - 검색 및 저장
 * - 재귀 이용 -> 하향식 계산 방식
 * - 속도가 빠른 대신 메모리 공간 차지
 */
function fibonacci2(n, memo) {
  if (n == 0 || n == 1) return n;

  if (memo[n] == null) {
    memo[n] = fibonacci2(n - 2, memo) + fibonacci2(n - 1, memo);
  }

  return memo[n];
}

/**
 * 타뷸레이션
 * - 상향식 계산 방식
 * - 계산에 필요한 값을 전부 계산 후 테이블에 저장해둠
 */

function fibonacci3(n) {
  if (n <= 1) return n;

  let table = [0, 1];

  // 상향식 계산
  for (let i = 2; i <= n; i++) {
    table[i] = table[i - 2] + table[i - 1];
  }

  return table[n];
}

console.log(fibonacci1(5));
console.log(fibonacci2(5, {}));
console.log(fibonacci3(5));

/** 메모이제이션 vs. 타뷸레이션
 * - 메모이제이션은 재귀를 사용하기때문에 복잡한 문제를 쉽게 해결할 수 있다.
 * - 대신 메모리 공간 차지!
 * --> 재귀가 직관적이면 메모이제이션, 직관적이지 않으면 타뷸레이션 사용하자
 */
