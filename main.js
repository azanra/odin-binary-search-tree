import Tree from "./Tree.js";

const array = [4, 2, 1, 4, 3, 5, 7, 23, 656, 31];

const binaryTree = new Tree(array);
binaryTree.prettyPrint(binaryTree.root);
