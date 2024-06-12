/**
 * 삽입 정렬
 * - O(n2)
 * - 이해와 구현이 간단하다.
 * - 성능이 좋지 않음
 */

function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const insertingData = arr[i];

    let insertIdx; // 삽입할 인덱스

    for (let j = i - 1; j > -1; j--) {
      if (arr[j] > insertingData) {
        arr[j + 1] = arr[j];
      } else {
        insertIdx = j + 1;
        break;
      }
    }
    arr[insertIdx] = insertingData;
  }

  return arr;
}

const array = [2, 7, 3, 6, 5];

console.log(insertionSort(array));
