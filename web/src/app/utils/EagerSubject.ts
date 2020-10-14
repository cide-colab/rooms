import {Subscriber} from 'rxjs/internal/Subscriber';
import {Observable, Subject, Subscription} from 'rxjs';

export class EagerSubject<T> extends Subject<T> {

  constructor(private value: T) {
    super();
  }

  _subscribe(subscriber: Subscriber<T>): Subscription {
    const subscription = super._subscribe(subscriber);
    subscriber.next(this.value);
    return subscription;
  }

  next(value?: T) {
    this.value = value;
    super.next(value);
  }

  isEmpty(): boolean {
    return !this.value;
  }
}

interface Cache<T> {
  get(): T;

  update(value: T);

  clear();

  hasValue(): boolean;
}

export class ValueCache<T> implements Cache<T> {

  constructor(private readonly key: string) {
  }

  public get(): T {
    return JSON.parse(localStorage.getItem(this.key));
  }

  public update(value: T) {
    localStorage.setItem(this.key, JSON.stringify(value));
  }

  public clear() {
    localStorage.removeItem(this.key);
  }

  public hasValue(): boolean {
    return this.get() !== null;
  }
}
