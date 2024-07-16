import { Heap } from './heap.mjs';

class PriorityQueue {
  constructor() {
    this.heap = new Heap();
  }

  enqueue(data) {
    this.heap.insert(data);
  }

  dequeue() {
    return this.heap.remove();
  }
}

class Monster {
  constructor(name, health) {
    this.name = name;
    this.health = health;
    this.priority = health;
  }
}

let priorityQueue = new PriorityQueue();
priorityQueue.enqueue(new Monster('주황버섯', 87));
priorityQueue.enqueue(new Monster('초록달팽이', 30));
priorityQueue.enqueue(new Monster('슬라임', 51));
priorityQueue.enqueue(new Monster('리본돼지', 100));
priorityQueue.enqueue(new Monster('주니어발록', 200));

console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());
console.log(priorityQueue.dequeue());
