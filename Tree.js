import Node from "./Node.js";

class Tree {
  #treeArray;
  #root;

  constructor(array) {
    this.treeArray = array;
    this.root = this.buildTree(array);
  }

  get treeArray() {
    return this.#treeArray;
  }

  set treeArray(treeArray) {
    this.#treeArray = treeArray;
  }

  get root() {
    return this.#root;
  }

  set root(root) {
    this.#root = root;
  }

  buildTree(array) {
    const uniqueAndSortedArray = [...new Set(array)].sort((a, b) => a - b);

    return this.TraverseToBuild(
      uniqueAndSortedArray,
      0,
      uniqueAndSortedArray.length - 1
    );
  }

  TraverseToBuild(array, start, end) {
    if (start > end) return null;

    const middle = Math.floor((start + end) / 2);
    const root = new Node(array[middle]);

    root.leftChildren = this.TraverseToBuild(array, start, middle - 1);
    root.rightChildren = this.TraverseToBuild(array, middle + 1, end);

    return root;
  }
}

export default Tree;
