/**
 * 선택 정렬
 * - O(n2)
 * - 이해와 구현이 간단하다.
 * - 성능이 좋지 않음
 */

function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIdx = i;

    // 정렬되지 않은 영역
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }

    let temp;

    temp = arr[i];
    arr[i] = arr[minIdx];
    arr[minIdx] = temp;
  }

  return arr;
}

const array = [8, 9, 4, 6, 2];
console.log(selectionSort(array));
