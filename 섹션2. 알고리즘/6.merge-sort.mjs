/**
 * 병합 정렬
 * - 재귀로 정렬하는 알고리즘!
 */

function finalMerge(arr, leftIdx, midIdx, rightIdx) {
  let tempArr = [];
  let tempIdx = 0;

  let leftAreaIdx = leftIdx;
  let rightAreaIdx = midIdx + 1;

  while (rightAreaIdx < rightIdx + 1) {
    let targetIdx;

    if (leftAreaIdx > midIdx) {
      // 왼쪽 모두 완료
      targetIdx = rightAreaIdx;
      rightAreaIdx++;
    } else {
      if (arr[leftAreaIdx] < arr[rightAreaIdx]) {
        targetIdx = leftAreaIdx;
        leftAreaIdx++;
      } else {
        targetIdx = rightAreaIdx;
        rightAreaIdx++;
      }
    }

    tempArr[tempIdx] = arr[targetIdx];
    tempIdx++;
  }

  return tempArr;
}

function mergeSort(arr, leftIdx, rightIdx) {
  if (leftIdx < rightIdx) {
    let midIdx = parseInt((leftIdx + rightIdx) / 2); // 중간 인덱스 기준으로 나눈다.

    mergeSort(leftIdx, midIdx); // 0 ~ 중간 인덱스까지 분할
    mergeSort(midIdx + 1, rightIdx); // 중간+1 ~ 마지막 인덱스까지 분할

    // 양쪽 각각 정렬 완료

    merge(arr, leftIdx, midIdx, rightIdx); // 전체 정렬
  }
}

const array = [2, 3, 4, 5, 1, 6, 7, 8];
console.log(finalMerge(array, 0, 3, 7));
