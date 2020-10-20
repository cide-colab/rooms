export {};

Array.prototype.remove = function <T>(this: Array<T>, item: T) {
  const index = this.indexOf(item, 0);
  if (index > -1) {
    this.splice(index, 1);
  }
};
