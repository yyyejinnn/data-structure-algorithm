/**
 * 재귀 -> 중복 계산 호출 -> 성능 저하.. -> 메모이제이션!
 */
function fibonacci1(n) {
  if (n == 0 || n == 1) return n;
  return fibonacci1(n - 2) + fibonacci1(n - 1);
}

/**
 * 메모이제이션 - 검색 및 저장
 * - 속도가 빠른 대신 메모리 공간 차지
 */
function fibonacci2(n, memo) {
  if (n == 0 || n == 1) return n;

  if (memo[n] == null) {
    memo[n] = fibonacci2(n - 2, memo) + fibonacci2(n - 1, memo);
  }

  return memo[n];
}

console.log(fibonacci1(5));
console.log(fibonacci2(5, {}));
