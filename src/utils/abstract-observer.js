export default class AbstractObserver {
  constructor() {
    this._observers = new Set();
  }

  addObserver(observer) {
    this._observers.add(observer);
  }

  removeObserver(observer) {
    this._observers.delete(observer);
  }

  _notify(event, payload1, payload2) {
    this._observers.forEach((observer) => observer(event, payload1, payload2));
  }
}
