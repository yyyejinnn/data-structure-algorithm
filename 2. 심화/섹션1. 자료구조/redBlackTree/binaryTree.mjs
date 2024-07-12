const RED = false;
const BLACK = true;

class BinaryTree {
  constructor(data) {
    this.data = data;
    this.leftSubTree = null;
    this.rightSubTree = null;
    this.parentTree = null; // 추가 -> 부모, 자식이 양방향 관계

    this.color = RED; // 삽입되는 노드는 무조건 빨간색
  }

  getData() {
    return this.data;
  }

  setData(data) {
    this.data = data;
  }

  getLeftSubTree() {
    return this.leftSubTree;
  }

  getRightSubTree() {
    return this.rightSubTree;
  }

  setLeftSubTree(tree) {
    this.leftSubTree = tree;
  }

  setRightSubTree(tree) {
    this.rightSubTree = tree;
  }

  preOrderTraversal(tree) {
    if (!tree) {
      return;
    }

    console.log(tree.data);
    this.preOrderTraversal(tree.getLeftSubTree());
    this.preOrderTraversal(tree.getRightSubTree());
  }

  inOrderTraversal(tree) {
    if (!tree) {
      return;
    }

    this.inOrderTraversal(tree.getLeftSubTree());
    console.log(tree.data);
    this.inOrderTraversal(tree.getRightSubTree());
  }

  postOrderTraversal(tree) {
    if (!tree) {
      return;
    }

    this.postOrderTraversal(tree.getLeftSubTree());
    this.postOrderTraversal(tree.getRightSubTree());
    console.log(tree.data);
  }

  removeLeftSubTree() {
    const removed = this.getLeftSubTree();
    this.setLeftSubTree(null);

    return removed;
  }

  removeRightSubTree() {
    const removed = this.getRightSubTree();
    this.setRightSubTree(null);

    return removed;
  }

  /** getter, setter */
  get parent() {
    return this.parentTree;
  }

  set parent(tree) {
    this.parentTree = tree;
  }
}

export { BinaryTree, RED, BLACK };
