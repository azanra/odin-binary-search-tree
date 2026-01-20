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
    console.log(`${uniqueAndSortedArray} \n`);

    return this.traverseToBuild(
      uniqueAndSortedArray,
      0,
      uniqueAndSortedArray.length - 1,
    );
  }

  traverseToBuild(array, start, end) {
    if (start > end) return null;

    const middle = Math.floor((start + end) / 2);
    const root = new Node(array[middle]);

    root.leftChildren = this.traverseToBuild(array, start, middle - 1);
    root.rightChildren = this.traverseToBuild(array, middle + 1, end);

    return root;
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) return;

    if (node.rightChildren !== null) {
      this.prettyPrint(
        node.rightChildren,
        `${prefix}${isLeft ? "|   " : "    "}`,
        false,
      );
    }

    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);

    if (node.leftChildren !== null) {
      this.prettyPrint(
        node.leftChildren,
        `${prefix}${isLeft ? "    " : "|    "}`,
        true,
      );
    }
  }

  check(value) {
    if (this.treeArray.includes(value)) {
      throw new Error(
        "Failed to insert because input already exist in the array",
      );
    }
  }

  insert(value) {
    this.check(value);
    this.treeArray = [...this.treeArray, value];
    this.insertTraverse(this.root, value);
  }

  insertTraverse(root, value) {
    if (root === null) return new Node(value);

    if (root.data > value) {
      root.leftChildren = this.insertTraverse(root.leftChildren, value);
    } else if (root.data < value) {
      root.rightChildren = this.insertTraverse(root.rightChildren, value);
    }

    return root;
  }

  getSuccessor(root) {
    let currentNode = root.rightChildren;
    while (currentNode && currentNode.leftChildren) {
      currentNode = currentNode.leftChildren;
    }

    return currentNode;
  }

  deleteTraverse(root, value) {
    if (root === null) return root;

    if (root.data > value) {
      root.leftChildren = this.deleteTraverse(root.leftChildren, value);
    } else if (root.data < value) {
      root.rightChildren = this.deleteTraverse(root.rightChildren, value);
    } else {
      if (root.leftChildren === null) return root.rightChildren;
      if (root.rightChildren === null) return root.leftChildren;

      const successor = this.getSuccessor(root);
      root.data = successor.data;

      root.rightChildren = this.deleteTraverse(
        root.rightChildren,
        successor.data,
      );
    }

    return root;
  }

  deleteItem(value) {
    if (this.treeArray.includes(value)) {
      this.deleteTraverse(this.root, value);
      return;
    }

    throw new Error(`Value don't exist in the array!. \n`);
  }

  find(value) {
    if (this.treeArray.includes(value)) {
      return this.findTraverse(this.root, value);
    }

    throw new Error("Can't find the value!. \n");
  }

  findTraverse(root, value) {
    if (root === null) return root;

    let pointer = root;

    while (pointer.data !== value) {
      if (pointer.data > value) {
        pointer = pointer.leftChildren;
      } else if (pointer.data < value) {
        pointer = pointer.rightChildren;
      }
    }

    return pointer;
  }

  levelOrderForEachIteration(callback) {
    if (callback === null) throw new Error("Callback function is null!. \n");

    const queue = [];
    queue.push(this.root);

    while (queue.length !== 0) {
      const currentNode = queue.shift();
      callback(currentNode);

      if (currentNode.leftChildren) queue.push(currentNode.leftChildren);
      if (currentNode.rightChildren) queue.push(currentNode.rightChildren);
    }
  }

  levelOrderForEachRecursion(callback, queue) {
    if (callback === null) throw new Error("Callback function is null!. \n");
    if (queue.length === 0) return;

    const currentQueue = [...queue];
    const firstNode = currentQueue.shift();

    callback(firstNode);
    if (firstNode.leftChildren) currentQueue.push(firstNode.leftChildren);
    if (firstNode.rightChildren) currentQueue.push(firstNode.rightChildren);

    this.levelOrderForEachRecursion(callback, currentQueue);
  }

  preOrderForEach(callback, root) {
    if (callback === null) throw new Error("Callback function is null!. \n");
    if (root === null) return;

    callback(root);
    this.preOrderForEach(callback, root.leftChildren);
    this.preOrderForEach(callback, root.rightChildren);
  }

  inOrderForEach(callback, root) {
    if (callback === null) throw new Error("Callback function is null!. \n");
    if (root === null) return;

    this.inOrderForEach(callback, root.leftChildren);
    callback(root);
    this.inOrderForEach(callback, root.rightChildren);
  }

  postOrderForEach(callback, root) {
    if (callback === null) throw new Error("Callback function is null!. \n");
    if (root === null) return;

    this.postOrderForEach(callback, root.leftChildren);
    this.postOrderForEach(callback, root.rightChildren);
    callback(root);
  }

  height(value) {
    let pointer = this.root;
    while (pointer !== null && pointer?.data !== value) {
      if (pointer.data > value) {
        pointer = pointer.leftChildren;
      } else if (pointer.data < value) {
        pointer = pointer.rightChildren;
      }
    }

    if (pointer === null) return null;

    const nodeHeight = this.heightTraverse(pointer, value);
    console.log(`Height of the node is ${nodeHeight} \n`);
    return nodeHeight;
  }

  heightTraverse(root, value) {
    if (root === null) return -1;

    const leftHeight = this.heightTraverse(root.leftChildren, value);
    const rightHeight = this.heightTraverse(root.rightChildren, value);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(value) {
    let depthHeight = 0;
    let pointer = this.root;

    while (pointer !== null && pointer.data !== value) {
      if (pointer.data > value) {
        depthHeight++;
        pointer = pointer.leftChildren;
      } else if (pointer.data < value) {
        depthHeight++;
        pointer = pointer.rightChildren;
      }
    }

    if (pointer === null) return null;
    console.log(`Depth of the node is ${depthHeight} \n`);
    return depthHeight;
  }
}

export default Tree;
