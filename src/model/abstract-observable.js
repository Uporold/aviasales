export default class AbstractObservable {
  observers = new Set();

  addObserver(observer) {
    this.observers.add(observer);
  }

  notify(event) {
    this.observers.forEach((observer) => observer(event));
  }
}
