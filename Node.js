class Node {
  #data;
  #rightChildren;
  #leftChildren;

  constructor() {
    this.#data = null;
    this.#rightChildren = null;
    this.#leftChildren = null;
  }

  get data() {
    return this.#data;
  }

  set data(data) {
    this.#data = data;
  }

  get rightChildren() {
    return this.#rightChildren;
  }

  set rightChildren(rightChildren) {
    this.#rightChildren = rightChildren;
  }

  get leftChildren() {
    return this.#leftChildren;
  }

  set leftChildren(leftChildren) {
    this.#leftChildren = leftChildren;
  }
}

export default Node;
