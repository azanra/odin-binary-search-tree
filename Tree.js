class Tree {
  #treeArray;
  #root;

  constructor(array) {
    this.#treeArray = array;
    this.#root = null;
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
}

export default Tree;
