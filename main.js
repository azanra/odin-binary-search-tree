import Tree from "./Tree.js";

const array = [4, 2, 1, 4, 3, 5, 7, 23, 656, 31];

const binaryTree = new Tree(array);
binaryTree.prettyPrint(binaryTree.root);

binaryTree.insert(32);
binaryTree.prettyPrint(binaryTree.root);

binaryTree.deleteItem(32);
binaryTree.prettyPrint(binaryTree.root);

binaryTree.find(7);

const printTheNodeData = (node) => {
  if (node === null) return;
  console.log(node.data);
};

console.log("level order iteration \n");
binaryTree.levelOrderForEachIteration(printTheNodeData);
console.log("level order recursion \n");
binaryTree.levelOrderForEachRecursion(printTheNodeData, [binaryTree.root]);
