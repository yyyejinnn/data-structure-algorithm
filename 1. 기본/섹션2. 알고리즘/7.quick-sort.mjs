/**
 * 퀵 정렬
 * - 마찬가지로 분할정복 알고리즘 -> 재귀 사용
 * - 평균 O(nlogn), 최악 O(n2)
 * - 그러나 보통 pivot을 중앙값으로 정하기 때문에 O(nlogn)
 * - 병합 정렬에 비해 적은 메모리 사용
 */

function swap(arr, idx1, idx2) {
  let temp = arr[idx1];
  arr[idx1] = arr[idx2];
  arr[idx2] = temp;
}

function divide(arr, left, right) {
  let pivot = arr[left];

  let leftStartIdx = left + 1;
  let rightStartIdx = right;

  while (leftStartIdx <= rightStartIdx) {
    // left, right 역전되지 않을 때까지

    while (leftStartIdx <= right && pivot >= arr[leftStartIdx]) {
      leftStartIdx++;
    }

    while (rightStartIdx >= left + 1 && pivot <= arr[rightStartIdx]) {
      rightStartIdx--;
    }

    if (leftStartIdx <= rightStartIdx) {
      swap(arr, leftStartIdx, rightStartIdx);
    }
  }

  // left, right 역전됐을 경우 피벗과 rightStartIdx 교환
  swap(arr, left, rightStartIdx);

  return rightStartIdx;
}

function quickSort(arr, left, right) {
  if (left <= right) {
    let pivotIdx = divide(arr, left, right); // 정렬 후 피벗의 인덱스

    quickSort(arr, left, pivotIdx - 1);
    quickSort(arr, pivotIdx + 1, right);
  }
}

const array = [5, 3, 7, 2, 6, 4, 9, 1, 8];
console.log('========병렬 전========');
console.log(array);
quickSort(array, 0, array.length - 1);
console.log('========병렬 후========');
console.log(array);
