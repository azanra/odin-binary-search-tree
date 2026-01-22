import Tree from "./Tree.js";
import util from "./util.js";

const randomNum = util.getRandomInt(25);
const randomArray = util.createRandomNumberOfArray(randomNum, 100);

const tree = new Tree(randomArray);
tree.prettyPrint(tree.root);
