/**
 * 병합 정렬
 * - 재귀로 정렬하는 알고리즘!
 * - O(nlogn)
 * - 앞서 본 정렬들에 비해 성능이 좋음
 * - 이해와 구현이 어려움
 */

function finalMerge(arr, leftIdx, midIdx, rightIdx) {
  // 배열 초기화
  let tempArr = [];
  tempArr.length = rightIdx + 1;
  tempArr.fill(0, 0, rightIdx + 1);

  let tempIdx = leftIdx;

  let leftAreaIdx = leftIdx;
  let rightAreaIdx = midIdx + 1;

  while (leftAreaIdx < midIdx + 1 && rightAreaIdx < rightIdx + 1) {
    if (arr[leftAreaIdx] < arr[rightAreaIdx]) {
      tempArr[tempIdx++] = arr[leftAreaIdx++];
    } else {
      tempArr[tempIdx++] = arr[rightAreaIdx++];
    }
  }

  // 한쪽 정렬 끝났을 때
  if (leftAreaIdx < midIdx + 1) {
    // 왼쪽이 남은 경우
    while (leftAreaIdx < midIdx + 1) {
      tempArr[tempIdx++] = arr[leftAreaIdx++];
    }
  } else {
    // 오른쪽이 남은 경우
    while (rightAreaIdx < rightIdx + 1) {
      tempArr[tempIdx++] = arr[rightAreaIdx++];
    }
  }

  //   console.log(tempArr);

  for (let i = leftIdx; i < rightIdx + 1; i++) {
    arr[i] = tempArr[i];
  }

  /**
   * 내 풀이
   */
  //   while (rightAreaIdx < rightIdx + 1) {
  //     let targetIdx;

  //     if (leftAreaIdx > midIdx) {
  //       // 왼쪽 모두 완료
  //       targetIdx = rightAreaIdx;
  //       rightAreaIdx++;
  //     } else {
  //       if (arr[leftAreaIdx] < arr[rightAreaIdx]) {
  //         targetIdx = leftAreaIdx;
  //         leftAreaIdx++;
  //       } else {
  //         targetIdx = rightAreaIdx;
  //         rightAreaIdx++;
  //       }
  //     }

  //     tempArr[tempIdx] = arr[targetIdx];
  //     tempIdx++;
  //   }

  //   return tempArr;
}

function mergeSort(arr, leftIdx, rightIdx) {
  if (leftIdx < rightIdx) {
    let midIdx = parseInt((leftIdx + rightIdx) / 2); // 중간 인덱스 기준으로 나눈다.

    mergeSort(arr, leftIdx, midIdx); // 0 ~ 중간 인덱스까지 분할
    mergeSort(arr, midIdx + 1, rightIdx); // 중간+1 ~ 마지막 인덱스까지 분할

    // 양쪽 각각 정렬 완료

    finalMerge(arr, leftIdx, midIdx, rightIdx); // 전체 정렬
  }
}

const array = [2, 7, 9, 5, 13, 6, 10, 8];

console.log('========병렬 전========');
console.log(array);
mergeSort(array, 0, array.length - 1);
console.log('========병렬 후========');
console.log(array);
