import { BinaryHeap } from './heap';

export class MinHeap<T> extends BinaryHeap<T> {
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

  /**
   * create heap from array
   *
   * @static
   * @template T
   * @param {T[]} arr
   * @returns {MinHeap<T>}
   * @memberof MinHeap
   */
  static fromArray<T>(arr: T[]): MinHeap<T> {
    const heap = new MinHeap<T>();
    if (arr && arr.length > 0) {
      arr.forEach(value => {
        heap.add(value);
      });
    }
    return heap;
  }
}
