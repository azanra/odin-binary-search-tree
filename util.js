const util = (function () {
  const printTheNodeData = (node) => {
    if (node === null) return;
    console.log(node.data);
  };

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };

  const createRandomNumberOfArray = (length, max) => {
    const randomNum = [];
    for (let i = 0; i < length; i++) {
      randomNum.push(getRandomInt(max));
    }

    return randomNum;
  };

  return {
    printTheNodeData,
    getRandomInt,
    createRandomNumberOfArray,
  };
})();

export default util;
