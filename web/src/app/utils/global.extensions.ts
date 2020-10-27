


Date.prototype.getMonday = function() {
  const d = new Date(this);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
};

Date.prototype.getSunday = function() {
  const monday = this.getMonday();
  const friday = monday + 6;
  return new Date(monday.setDate(friday));
};

Date.prototype.diffInMinutes = function(other) {
  const diff = (this.getTime() - new Date(other).getTime()) / 1000;
  return Math.abs(Math.round(diff / 60));
};

Date.prototype.isBefore = function(other) {
  return new Date(this).getTime() <= new Date(other).getTime();
};

Date.prototype.isAfter = function(other) {
  return new Date(this).getTime() >= new Date(other).getTime();
};

Date.prototype.toSimpleTimeString = function() {
  const time = new Date(this);
  return `${time.getHours()}:${time.getMinutes()}`;
};


Date.prototype.minusDays = function(days: number): Date {
  return this.plusDays(-days);
};
Date.prototype.minusHours = function(hours: number): Date {
  return this.plusHours(-hours);
};
Date.prototype.minusMinutes = function(minutes: number): Date {
  return this.plusMinutes(-minutes);
};
Date.prototype.minusSeconds = function(seconds: number): Date {
  return this.plusSeconds(-seconds);
};
Date.prototype.minusMilliseconds = function(millis: number): Date {
  return this.plusMilliseconds(-millis);
};
Date.prototype.plusDays = function(days: number): Date {
  return this.plusHours(days * 24);
};
Date.prototype.plusHours = function(hours: number): Date {
  return this.plusMinutes(hours * 60);
};
Date.prototype.plusMinutes = function(minutes: number): Date {
  return this.plusSeconds(minutes * 60);
};
Date.prototype.plusSeconds = function(seconds: number): Date {
  return this.plusMilliseconds(seconds * 1000);
};
Date.prototype.plusMilliseconds = function(millis: number): Date {
  return new Date(new Date(this).getTime() + millis);
};

Date.prototype.roundUpMillis = function(millis: number): Date {
  return new Date(Math.ceil(this.getTime() / millis) * millis);
};
Date.prototype.roundDownMillis = function(millis: number): Date {
  return new Date(Math.trunc(this.getTime() / millis) * millis);
};

Date.prototype.roundUpSeconds = function(seconds: number): Date {
  return this.roundUpMillis(seconds * 1000);
};
Date.prototype.roundDownSeconds = function(seconds: number): Date {
  return this.roundDownMillis(seconds * 1000);
};

Date.prototype.roundUpMinutes = function(minutes: number): Date {
  return this.roundUpSeconds(minutes * 60);
};
Date.prototype.roundDownMinutes = function(minutes: number): Date {
  return this.roundDownSeconds(minutes * 60);
};

Date.prototype.roundUpHours = function(hours: number): Date {
  return this.roundUpMinutes(hours * 60);
};
Date.prototype.roundDownHours = function(hours: number): Date {
  return this.roundDownMinutes(hours * 60);
};

Date.prototype.roundUpDays = function(days: number): Date {
  return this.roundUpHours(days * 24);
};
Date.prototype.roundDownDays = function(days: number): Date {
  return this.roundDownHours(days * 24);
};


Array.prototype.flatMap = function <R>(transform): Array<R> {
  return flatMap(this, transform);
};

Array.prototype.distinctBy = function <R>(c): Array<R> {
  return distinctBy(this, c);
};

Array.prototype.sumBy = function <R>(c): number {
  return sumBy(this, c);
};

Array.prototype.removeItem = function <T>(item: T): Array<T> {
  return removeItem(this, item);
};

Array.prototype.clone = function <T>(): Array<T> {
  return clone(this);
};

Array.prototype.remove = function <T>(item: T) {
  const index = this.indexOf(item, 0);
  if (index > -1) {
    this.splice(index, 1);
  }
};

export function flatMap<T, R>(array: T[], transform: (T) => R[]) {
  const result = new Array<R>();
  for (const i of array) {
    transform(i).forEach(item => result.push(item));
  }
  return result;
}

export function distinctBy<T>(array: T[], c: (T) => any) {
  const exists = new Array<T>();
  const result = new Array<T>();
  for (const i of array) {
    const key = c(i);
    if (!exists.includes(key)) {
      exists.push(key);
      result.push(i);
    }
  }
  return result;
}

export function sumBy<T>(array: T[], c: (T) => number) {
  let result = 0;
  for (const i of array) {
    result += c(i);
  }
  return result;
}

export function clone<T>(array: T[]) {
  return Object.assign([], array);
}

export function removeItem<T>(array: T[], item: T): T[] {
  const result = array.clone();
  const index = result.indexOf(item, 0);
  if (index > -1) {
    result.splice(index, 1);
  }
  return result;
}

export function build<T>(item: T): T {
  return item;
}
