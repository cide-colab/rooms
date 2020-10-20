export {};
declare global {
  interface Array<T> {
    remove(this: Array<T>, item: T);
  }
}

