/**
 * 재귀함수
 * - 기저 조건 (탈출 조건)이 반드시 있어야 함
 * - for문보다 많은 메모리 차지
 * - but 복잡한 문제를 쉽게 해결해줌 ex. 팩토리얼
 * - 콜스택 원리 이용!
 * - 하향식 계산에 적합!
 */

/**
 * 1~10 출력하기
 * */
function myFunction(number) {
  console.log(number);

  if (number == 10) {
    return;
  }

  myFunction(number + 1);
}

// myFunction(1);

/**
 * 팩토리얼
 * */
function factorial(number) {
  if (number === 1 || number == 0) {
    return 1; // 기저조건
  }

  return number * factorial(number - 1);
}

// const fac = factorial(3);
// console.log(fac);

/**
 * 배열의 합 (하향식 계산)
 * */
function sumArray(arr) {
  //   if (arr.length === 0) {
  //     return null;
  //   }

  // 기저조건
  if (arr.length === 1) {
    return arr[0];
  }

  // 하위요소 추출
  return arr[arr.length - 1] + sumArray(arr.slice(0, -1));
}

// const arr = [];
// const sum = sumArray(arr);
// console.log(sum);

/**
 * 문자열 길이 추출
 * */
function strLength(str) {
  if (str[0] == null) {
    return 0;
  }
  return 1 + strLength(str.slice(0, -1));
}

// const str = 'hello';
// const len = strLength(str);
// console.log(len);

/**
 * 지수함수
 * */
function power(x, n) {
  if (n === 0) {
    return 1;
  }

  return x * power(x, n - 1);
}

console.log(power(3, 3));
