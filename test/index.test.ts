import Queue from '../src/index';
import { SinglyList } from 'ss-linked-list';
import * as Chance from 'chance';
const chance = new Chance();

describe('队列 - 构造函数', () => {
  test('默认无参，生成空队列', () => {
    const a = new Queue();
    expect(a.length).toBe(0);
    expect(a.isEmpty()).toBeTruthy();
  });

  test('默认接受多个参数，用于初始化生成队列', () => {
    const arr = chance.n(chance.integer, chance.integer({ min: 1, max: 10 }));
    const a = new Queue(...arr);
    expect(a.length).toBe(arr.length);
    expect(a.peek).toBe(arr[0]);
    expect(a.queue).toBeInstanceOf(SinglyList);
    expect(a.isEmpty()).toBeFalsy();
  });
});

describe('队列 - peek 属性', () => {
  let a, arr;
  beforeEach(() => {
    arr = chance.n(chance.integer, chance.integer({ min: 1, max: 10 }));
    a = new Queue(...arr);
  });

  test('返回队列的第一个元素（头元素）', () => {
    expect(a.peek).toBe(arr[0]);
  });

  test('访问空对队列的时候，返回 null', () => {
    const emptyQueue = new Queue();
    expect(emptyQueue.peek).toBeUndefined();
  });
});

describe('队列 - enqueue 方法', () => {
  let a, arr;
  beforeEach(() => {
    arr = chance.n(chance.integer, chance.integer({ min: 1, max: 10 }));
    a = new Queue(...arr);
  });

  test('入队操作', () => {
    const data = chance.integer();
    expect(a.enqueue(data)).toBeTruthy();
    expect(a.length).toBe(arr.length + 1);
    expect(a.peek).toBe(arr[0]);
  });

  test('空对队列也支持 enqueue ', () => {
    const data = chance.integer();
    const emptyQueue = new Queue();
    expect(emptyQueue.enqueue(data)).toBeTruthy();
    expect(emptyQueue.length).toBe(1);
    expect(emptyQueue.peek).toBe(data);
  });
});

describe('队列 - dequeue 方法', () => {
  let a, arr;
  beforeEach(() => {
    arr = chance.n(chance.integer, chance.integer({ min: 2, max: 10 }));
    a = new Queue(...arr);
  });

  test('出队操作', () => {
    const data = chance.integer();
    expect(a.dequeue()).toBe(arr[0]);
    expect(a.length).toBe(arr.length - 1);
    expect(a.peek).toBe(arr[1]);
  });

  test('空对队列也支持 dequeue ', () => {
    const data = chance.integer();
    const emptyQueue = new Queue();
    expect(emptyQueue.dequeue()).toBeUndefined();
    expect(emptyQueue.length).toBe(0);
    expect(emptyQueue.peek).toBeUndefined();
  });
});
