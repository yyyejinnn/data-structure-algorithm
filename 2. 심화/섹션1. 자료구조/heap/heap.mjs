import { HeapBasic } from './heap-basic.mjs';

export class Heap extends HeapBasic {
  isBigPriority(person, comparePerson) {
    return person.priority < comparePerson.priority;
  }
}

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.priority = age;
  }
}

/** test */
// let heap = new Heap();

// heap.insert(new Person('임꺽정', 20));
// heap.insert(new Person('홍길동', 10));
// heap.insert(new Person('이순신', 31));

// console.log(heap.root);
