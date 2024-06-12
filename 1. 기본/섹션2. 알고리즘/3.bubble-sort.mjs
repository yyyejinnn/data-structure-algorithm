/**
 * 버블 정렬
 * - O(n2)
 * - 이해와 구현이 간단하다.
 * - 성능이 좋지 않음
 */

const array = [8, 9, 4, 6, 2];

function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] < arr[j + 1]) {
        continue;
      }

      let temp;

      temp = arr[j + 1];
      arr[j + 1] = arr[j];
      arr[j] = temp;
    }
  }

  return arr;
}

console.log(bubbleSort(array));
