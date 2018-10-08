import { MinHeap } from '../src/index';
import * as Chance from 'chance';
const chance = new Chance();

describe('[Min Heap] 构造函数  - 默认构造函数', () => {
  test('默认无参，生成空堆', () => {
    const a = new MinHeap();
    expect(a.length).toBe(0);
    expect(a.isEmpty()).toBeTruthy();
    expect(a.peek).toBeUndefined();
  });
});

describe('[Min Heap] 静态方法 - fromArray 方法', () => {
  let a, arr;
  beforeEach(() => {
    arr = [1, 2, 3, chance.integer({ min: 4, max: 10 })]; // 注意最小堆的排序顺序
    a = MinHeap.fromArray(arr);
  });

  test('返回堆的第一个元素（头元素）', () => {
    expect(a.peek).toBe(arr[0]);
    expect(a.length).toBe(arr.length);
    expect(a.isEmpty()).toBeFalsy();
  });
});

describe('[Min Heap] 静态方法 - toString 方法', () => {
  let a,
    arr = [2, 7, 26, 25, 19, 17, 1, 90, 3, 36];
  const expectHeapArray = [1, 3, 2, 7, 19, 26, 17, 90, 25, 36];
  beforeEach(() => {
    a = MinHeap.fromArray(arr);
    // a.heapContainer : [ 1, 3, 2, 7, 19, 26, 17, 90, 25, 36 ]
  });

  test('返回构建完毕后的数组', () => {
    expect(a.peek).toBe(1);
    expect(a.toString()).toBe(expectHeapArray.toString());
  });
});

describe('[Min Heap] - 左侧子节点方法', () => {
  let a,
    arr = [2, 7, 26, 25, 19, 17, 1, 90, 3, 36];
  const expectHeapArray = [1, 3, 2, 7, 19, 26, 17, 90, 25, 36];
  beforeEach(() => {
    a = MinHeap.fromArray(arr);
  });

  test('getLeftChildIndex, 左侧子节点下标为 2i+1', () => {
    const i = chance.integer({ min: 0, max: arr.length });
    expect(a.getLeftChildIndex(i)).toBe(2 * i + 1);
  });

  test('前 5 个节点存在左子节点', () => {
    const i = chance.integer({ min: 0, max: 5 });
    expect(a.leftChild(i)).toBe(expectHeapArray[2 * i + 1]);
  });
  test('后 5 个节点没有左子节点', () => {
    const i = chance.integer({ min: 5, max: arr.length });
    expect(a.hasLeftChild(i)).toBeFalsy();
    expect(a.leftChild(i)).toBeUndefined();
  });
});

describe('[Min Heap] - 右侧子节点方法', () => {
  let a,
    arr = [2, 7, 26, 25, 19, 17, 1, 90, 3, 36];
  const expectHeapArray = [1, 3, 2, 7, 19, 26, 17, 90, 25, 36];
  beforeEach(() => {
    a = MinHeap.fromArray(arr);
  });

  test('右侧子节点下标为 2i+2', () => {
    const i = chance.integer({ min: 0, max: arr.length });
    expect(a.getRightChildIndex(i)).toBe(2 * i + 2);
  });

  test('前 4 个节点存在右子节点', () => {
    const i = chance.integer({ min: 0, max: 4 });
    expect(a.rightChild(i)).toBe(expectHeapArray[2 * i + 2]);
  });
  test('后 6 个节点没有右子节点', () => {
    const i = chance.integer({ min: 4, max: arr.length });
    expect(a.hasRightChild(i)).toBeFalsy();
    expect(a.rightChild(i)).toBeUndefined();
  });
});

describe('[Min Heap] - 父节点方法', () => {
  let a,
    arr = [2, 7, 26, 25, 19, 17, 1, 90, 3, 36];
  const expectHeapArray = [1, 3, 2, 7, 19, 26, 17, 90, 25, 36];
  beforeEach(() => {
    a = MinHeap.fromArray(arr);
  });

  test('父节点下标为 2i+2', () => {
    const i = chance.integer({ min: 0, max: arr.length });
    expect(a.getParentIndex(i)).toBe(Math.floor((i - 1) / 2));
  });

  test('第 1 个节点不存在父节点', () => {
    expect(a.hasParent(0)).toBeFalsy();
    expect(a.parent(0)).toBeUndefined();
  });
  test('后 9 个节点有父节点', () => {
    const i = chance.integer({ min: 1, max: arr.length });
    expect(a.parent(i)).toBe(expectHeapArray[Math.floor((i - 1) / 2)]);
  });
});

describe('[Min Heap] - add 方法', () => {
  let a;
  // const expectHeapArray = [1, 3, 2, 7, 19, 26, 17, 90, 25, 36];
  beforeEach(() => {
    a = new MinHeap();
  });

  test('空 heap 进行 add 操作', () => {
    const num1 = chance.integer();
    const num2 = num1 - 10 * Math.random();

    a.add(num1);
    expect(a.length).toBe(1);
    expect(a.peek).toBe(num1);

    a.add(num2);
    expect(a.length).toBe(2);
    expect(a.peek).toBe(num2);
  });
});

describe('[Min Heap] - poll 方法', () => {
  let a,
    arr = [2, 7, 26, 25, 19, 17, 1, 90, 3, 36];
  // const expectHeapArray = [1, 3, 2, 7, 19, 26, 17, 90, 25, 36];
  beforeEach(() => {
    a = MinHeap.fromArray(arr);
  });

  test('poll 返回顶部元素，下滤', () => {
    expect(a.poll()).toBe(1);
    expect(a.toString()).toBe([2, 3, 17, 7, 19, 26, 36, 90, 25].toString());

    expect(a.poll()).toBe(2);
    expect(a.toString()).toBe([3, 7, 17, 25, 19, 26, 36, 90].toString());
  });

  test('空 heap 进行 poll 操作', () => {
    const emptyHeap = new MinHeap();
    expect(emptyHeap.poll()).toBeUndefined();
    expect(emptyHeap.isEmpty()).toBeTruthy();
  });

  test('对单元素 heap 进行 poll 操作', () => {
    const num = chance.integer();
    const singleHeap = MinHeap.fromArray([num]);
    expect(singleHeap.poll()).toBe(num);
    expect(singleHeap.isEmpty()).toBeTruthy();
  });
});

describe('[Min Heap] - remove 方法', () => {
  let a,
    arr = [1, 3, 2, 7, 25, 19, 7];
  beforeEach(() => {
    a = MinHeap.fromArray(arr);
  });

  test('移除单个元素', () => {
    a.remove(2);
    expect(a.length).toBe(arr.length - 1);
    expect(a.toString()).toBe([1, 3, 7, 7, 25, 19].toString());
  });

  test('移除重复元素', () => {
    a.remove(7);
    expect(a.length).toBe(arr.length - 2);
    expect(a.toString()).toBe([1, 3, 2, 19, 25].toString());
  });
});
