import Tree from "./Tree.js";
import util from "./util.js";

const randomNum = util.getRandomInt(25);
const randomArray = util.createRandomNumberOfArray(randomNum, 100);

const tree = new Tree(randomArray);

tree.isBalanced();
tree.levelOrderForEachIteration(util.printTheNodeData);
tree.levelOrderForEachRecursion(util.printTheNodeData, [tree.root]);
tree.preOrderForEach(util.printTheNodeData, tree.root);
tree.inOrderForEach(util.printTheNodeData, tree.root);
tree.postOrderForEach(util.printTheNodeData, tree.root);

tree.insert(112);
tree.insert(119);
tree.insert(213);
tree.insert(222);
tree.insert(240);
tree.isBalanced();
tree.rebalance();
tree.isBalanced();

tree.levelOrderForEachIteration(util.printTheNodeData);
tree.levelOrderForEachRecursion(util.printTheNodeData, [tree.root]);
tree.preOrderForEach(util.printTheNodeData, tree.root);
tree.inOrderForEach(util.printTheNodeData, tree.root);
tree.postOrderForEach(util.printTheNodeData, tree.root);
