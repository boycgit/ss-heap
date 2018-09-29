import BinaryHeap from './heap';

export default class MinHeap<T> extends BinaryHeap<T> {
  /**
   * Checks if pair of heap elements is in correct order.
   * For MinHeap the first element must be always smaller or equal.
   * For MaxHeap the first element must be always bigger or equal.
   *
   * @param {*} firstElement
   * @param {*} secondElement
   * @return {boolean}
   */
  pairIsInTheCorrectOrder(firstElement: T, secondElement: T) {
    return this.compare.lessThanOrEqual(firstElement, secondElement);
  }
}
