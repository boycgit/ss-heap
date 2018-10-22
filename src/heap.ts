import Comparator, { compareFunction } from 'ss-comparator';

/**
 * A Binary Heap is a Binary Tree with following properties.
 *  1) It’s a complete tree (All levels are completely filled except possibly the last level and the last level has all keys as left as possible). This property of Binary Heap makes them suitable to be stored in an array.
 *
 *  2) A Binary Heap is either Min Heap or Max Heap. In a Min Binary Heap, the key at root must be minimum among all keys present in Binary Heap. The same property must be recursively true for all nodes in Binary Tree. Max Binary Heap is similar to MinHeap.
 *
 * @export
 * @abstract
 * @class BinaryHeap
 * @template T
 * @example
 *
 * Examples of Min Heap:
 * ```sh
 *              10                      10
 *          /      \               /       \
 *        20        100          15         30
 *       /                      /  \        /  \
 *     30                     40    50    100   40
 * ```
 */
export class BinaryHeap<T> {
  heapContainer: T[];
  compare: Comparator;

  /**
   * Creates an instance of BinaryHeap.
   * @param {compareFunction} comparatorFunction - function that implement compare operation
   * @memberof BinaryHeap
   */
  constructor(comparatorFunction?: compareFunction) {
    // Array representation of the heap.
    this.heapContainer = [];
    this.compare = new Comparator(comparatorFunction);
  }

  get length(): number {
    return this.heapContainer.length;
  }

  /**
   * get root element of heap
   *
   * @readonly
   * @type {(T | undefined)}
   * @memberof BinaryHeap
   */
  get peek(): T | undefined {
    if (this.heapContainer.length === 0) {
      return void 0;
    }

    return this.heapContainer[0];
  }

  /**
   * check heap if is empty or not
   *
   * @readonly
   * @type {boolean}
   * @memberof BinaryHeap
   */
  isEmpty(): boolean {
    return !this.heapContainer.length;
  }

  /**
   * string representing the specified heap and its elements, call Array.toString inside
   *
   * @returns {string}
   * @memberof BinaryHeap
   */
  toString(): string {
    return this.heapContainer.toString();
  }

  /**
   * get left child index of the specified item
   *
   * @param {number} parentIndex
   * @returns {number}
   * @memberof BinaryHeap
   */
  getLeftChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 1;
  }

  /**
   * get right child index of the specified item
   *
   * @param {number} parentIndex
   * @returns {number}
   * @memberof BinaryHeap
   */
  getRightChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 2;
  }

  /**
   * get parent index of the specified item
   *
   * @param {number} childIndex
   * @returns {number}
   * @memberof BinaryHeap
   */
  getParentIndex(childIndex: number): number {
    return Math.floor((childIndex - 1) / 2);
  }

  /**
   * check if has parent item
   *
   * @param {number} childIndex
   * @returns {boolean}
   * @memberof BinaryHeap
   */
  hasParent(childIndex: number): boolean {
    return this.getParentIndex(childIndex) >= 0;
  }

  /**
   * check if has left child item
   *
   * @param {number} parentIndex
   * @returns {boolean}
   * @memberof BinaryHeap
   */
  hasLeftChild(parentIndex: number): boolean {
    return this.getLeftChildIndex(parentIndex) < this.heapContainer.length;
  }

  /**
   * check if has right child item
   *
   * @param {number} parentIndex
   * @returns {boolean}
   * @memberof BinaryHeap
   */
  hasRightChild(parentIndex: number): boolean {
    return this.getRightChildIndex(parentIndex) < this.heapContainer.length;
  }

  /**
   * get left child item
   *
   * @param {number} parentIndex
   * @returns {T}
   * @memberof BinaryHeap
   */
  leftChild(parentIndex: number): T {
    return this.heapContainer[this.getLeftChildIndex(parentIndex)];
  }

  /**
   * get right child item
   *
   * @param {number} parentIndex
   * @returns {T}
   * @memberof BinaryHeap
   */
  rightChild(parentIndex: number): T {
    return this.heapContainer[this.getRightChildIndex(parentIndex)];
  }

  /**
   * get parent item
   *
   * @param {number} childIndex
   * @returns {T}
   * @memberof BinaryHeap
   */
  parent(childIndex: number): T {
    return this.heapContainer[this.getParentIndex(childIndex)];
  }

  /**
   * swap two items
   *
   * @param {number} indexOne
   * @param {number} indexTwo
   * @memberof BinaryHeap
   */
  swap(indexOne: number, indexTwo: number): void {
    const tmp = this.heapContainer[indexTwo];
    this.heapContainer[indexTwo] = this.heapContainer[indexOne];
    this.heapContainer[indexOne] = tmp;
  }

  /**
   * remove and return the root item of current heap
   * it seems like 'dequeue' method of Queue
   *
   *
   * @returns {(T | void)}
   * @memberof BinaryHeap
   */
  poll(): T | void {
    if (this.heapContainer.length === 0) {
      return;
    }

    if (this.heapContainer.length === 1) {
      return this.heapContainer.pop();
    }

    const item = this.heapContainer[0];

    // Move the last element from the end to the head.
    this.heapContainer[0] = <T>this.heapContainer.pop();
    this.heapifyDown();

    return item;
  }

  /**
   * add item to current heap
   * it seems like 'enqueu' method of Queue
   *
   * @param {T} item
   * @returns {BinaryHeap<T>}
   * @memberof BinaryHeap
   */
  add(item: T): BinaryHeap<T> {
    this.heapContainer.push(item);
    this.heapifyUp();
    return this;
  }

  /**
   * remove the specified item in heap
   * this operator cost maybe expensive
   *
   * @param {T} item
   * @param {*} [comparator=this.compare]
   * @returns
   * @memberof BinaryHeap
   */
  remove(item: T, comparator = this.compare) {
    // Find number of items to remove.
    const numberOfItemsToRemove = this.find(item, comparator).length;

    for (let iteration = 0; iteration < numberOfItemsToRemove; iteration += 1) {
      // We need to find item index to remove each time after removal since
      // indices are being changed after each heapify process.
      const indexToRemove = <number>this.find(item, comparator).pop();

      // If we need to remove last child in the heap then just remove it.
      // There is no need to heapify the heap afterwards.
      if (indexToRemove === this.heapContainer.length - 1) {
        this.heapContainer.pop();
      } else {
        // Move last element in heap to the vacant (removed) position.
        this.heapContainer[indexToRemove] = <T>this.heapContainer.pop();

        // Get parent.
        const parentItem = this.parent(indexToRemove);

        // If there is no parent or parent is in correct order with the node
        // we're going to delete then heapify down. Otherwise heapify up.
        if (
          this.hasLeftChild(indexToRemove) &&
          (!parentItem ||
            this.pairIsInTheCorrectOrder(
              parentItem,
              this.heapContainer[indexToRemove]
            ))
        ) {
          this.heapifyDown(indexToRemove);
        } else {
          this.heapifyUp(indexToRemove);
        }
      }
    }

    return this;
  }

  /**
   * known as “percolate up”, this operator is applied after add new item, to maintain the heap property
   * Time Complexity of this Operation is O(Logn).
   * @param {number} [customStartIndex]
   * @memberof BinaryHeap
   */
  heapifyUp(customStartIndex?: number): void {
    // Take the last element (last in array or the bottom left in a tree)
    // in the heap container and lift it up until it is in the correct
    // order with respect to its parent element.
    let currentIndex = customStartIndex || this.heapContainer.length - 1;

    while (
      this.hasParent(currentIndex) &&
      !this.pairIsInTheCorrectOrder(
        this.parent(currentIndex),
        this.heapContainer[currentIndex]
      )
    ) {
      this.swap(currentIndex, this.getParentIndex(currentIndex));
      currentIndex = this.getParentIndex(currentIndex);
    }
  }

  /**
   * Known as “percolate down", this operator is applied after removing root, to maintain the heap property
   * Time Complexity of this Operation is O(Logn).
   * @param {number} [customStartIndex=0]
   * @memberof BinaryHeap
   */
  heapifyDown(customStartIndex = 0): void {
    // Compare the parent element to its children and swap parent with the appropriate
    // child (smallest child for MinHeap, largest child for MaxHeap).
    // Do the same for next children after swap.
    let currentIndex = customStartIndex;
    let nextIndex: number | null = null;

    while (this.hasLeftChild(currentIndex)) {
      // get right child first
      if (
        this.hasRightChild(currentIndex) &&
        this.pairIsInTheCorrectOrder(
          this.rightChild(currentIndex),
          this.leftChild(currentIndex)
        )
      ) {
        nextIndex = this.getRightChildIndex(currentIndex);
      } else {
        nextIndex = this.getLeftChildIndex(currentIndex);
      }

      if (
        this.pairIsInTheCorrectOrder(
          this.heapContainer[currentIndex],
          this.heapContainer[nextIndex]
        )
      ) {
        break;
      }

      this.swap(currentIndex, nextIndex);
      currentIndex = nextIndex;
    }
  }

  /**
   * find the specified item in heap;
   *
   * @param {*} item
   * @param {*} [comparator=this.compare]
   * @returns
   * @memberof BinaryHeap
   */
  find(item, comparator = this.compare) {
    const foundItemIndices: number[] = [];

    for (
      let itemIndex = 0;
      itemIndex < this.heapContainer.length;
      itemIndex += 1
    ) {
      if (comparator.equal(item, this.heapContainer[itemIndex])) {
        foundItemIndices.push(itemIndex);
      }
    }

    return foundItemIndices;
  }

  pairIsInTheCorrectOrder(firstElement, secondElement): boolean{
    throw new Error(`
      You have to implement heap pair comparision method
      for ${firstElement} and ${secondElement} values.
    `);
  }
}
