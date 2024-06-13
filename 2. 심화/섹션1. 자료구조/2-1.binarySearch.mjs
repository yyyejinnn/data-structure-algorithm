/**
 * * 이진 탐색 알고리즘
 * - 범위를 반으로 줄여가면서 탐색하는 방식
 * - UP & Down 게임 방식과 비슷
 * - 반드시 정렬되어 있어야 함
 *
 * * 구현
 * - 반복문/재귀로 구현 가능
 */

function binarySearch(arr, target, startIdx, endIdx) {
  if (startIdx > endIdx) {
    return null;
  }

  const midIdx = Math.floor((startIdx + endIdx) / 2);

  if (target == arr[midIdx]) {
    return midIdx;
  } else if (target < arr[midIdx]) {
    return binarySearch(arr, target, startIdx, midIdx - 1);
  } else {
    return binarySearch(arr, target, midIdx + 1, endIdx);
  }
}

const arr = [1, 3, 6, 12, 27, 33, 45, 54];

console.log('RESULT INDEX: ', binarySearch(arr, 33, 0, arr.length - 1));
