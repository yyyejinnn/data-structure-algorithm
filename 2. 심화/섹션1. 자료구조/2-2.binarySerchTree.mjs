/**
 * * 그 전의 알고리즘..
 * - 이진 탐색 알고리즘
 *   - 배열이 정렬되어 있어야 함..
 *   - 배열은 데이서 삽입, 제거가 비효율적
 *
 * - 해시 테이블
 *   - 삽입, 제거, 검색이 빠름
 *   - 성능이 해시 함수에 따라 달라짐
 *   - 메모리 차지
 *
 * -> 이진 탐색 트리는 둘의 장점만 갖고있음!
 *
 * * 이진 탐색 트리
 * - 데이터 삽입, 제거, 검색이 빠름
 * - 메모리도 적게 요구함
 */

/**
 * 구현
 * - 이진 트리 이용
 *
 * 추상 자료형
 * - insert(data)
 * - search(targetData)
 */

import { BinaryTree } from './1.binaryTree.mjs';

class BinarySearchTree {
  constructor(rootNode = null) {
    this.root = rootNode;
  }

  insert(data) {
    if (!this.root) {
      this.root = new BinaryTree(data);
      return;
    }

    let currNode = this.root;
    let parentNode; // 후에 노드 삽입할 때 data를 parentNode의 subTree로 삽입하기 위함

    while (currNode) {
      parentNode = currNode;

      if (data < currNode.getData()) {
        currNode = currNode.getLeftSubTree();
      } else if (data > currNode.getData()) {
        currNode = currNode.getRightSubTree();
      } else {
        return; // 이진탐색트리는 중복을 허용하지 않음
      }
    }

    // 노드 삽입

    const newNode = new BinaryTree(data);

    if (data < parentNode.getData()) {
      parentNode.setLeftSubTree(newNode);
    } else {
      parentNode.setRightSubTree(newNode);
    }
  }

  search(data) {
    let currNode = this.root;

    while (currNode) {
      if (data == currNode.getData()) {
        return currNode.getData();
      }

      if (data < currNode.getData()) {
        currNode = currNode.getLeftSubTree();
      } else {
        currNode = currNode.getRightSubTree();
      }
    }

    return null;
  }
}

/**
 * test
 */
const binarySearchTree = new BinarySearchTree();

binarySearchTree.insert(18);
binarySearchTree.insert(15);
binarySearchTree.insert(10);
binarySearchTree.insert(6);
binarySearchTree.insert(3);
binarySearchTree.insert(8);
binarySearchTree.insert(12);
binarySearchTree.insert(11);
binarySearchTree.insert(31);
binarySearchTree.insert(27);
binarySearchTree.insert(24);
binarySearchTree.insert(20);
binarySearchTree.insert(33);
binarySearchTree.insert(35);
binarySearchTree.insert(37);

// binarySearchTree.root.preOrderTraversal(binarySearchTree.root);
console.log(binarySearchTree.search(24)); // 24
console.log(binarySearchTree.search(99)); // null
