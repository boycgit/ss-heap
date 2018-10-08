import { BinaryHeap } from './heap';

export class MaxHeap<T> extends BinaryHeap<T> {
  /**
   * Checks if pair of heap elements is in correct order.
   * For MinHeap the first element must be always smaller or equal.
   * For MaxHeap the first element must be always bigger or equal.
   *
   * @param {*} firstElement
   * @param {*} secondElement
   * @return {boolean}
   */
  pairIsInTheCorrectOrder(firstElement, secondElement) {
    return this.compare.greaterThanOrEqual(firstElement, secondElement);
  }

  /**
   * create heap from array
   *
   * @static
   * @template T
   * @param {T[]} arr
   * @returns {MinHeap<T>}
   * @memberof MinHeap
   */
  static fromArray<T>(arr: T[]): MaxHeap<T> {
    const heap = new MaxHeap<T>();
    if (arr && arr.length > 0) {
      arr.forEach(value => {
        heap.add(value);
      });
    }
    return heap;
  }
}
