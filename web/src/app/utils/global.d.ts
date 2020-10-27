export {};
declare global {
  interface Date {

    getMonday(): Date;

    getSunday(): Date;

    diffInMinutes(other: Date): number;

    isBefore(other: Date): boolean;

    isAfter(other: Date): boolean;

    toSimpleTimeString(): string;

    minusDays(days: number): Date;

    minusHours(hours: number): Date;

    minusMinutes(minutes: number): Date;

    minusSeconds(seconds: number): Date;

    minusMilliseconds(millis: number): Date;

    plusDays(days: number): Date;

    plusHours(hours: number): Date;

    plusMinutes(minutes: number): Date;

    plusSeconds(seconds: number): Date;

    plusMilliseconds(millis: number): Date;

    roundUpMillis(millis: number): Date;

    roundDownMillis(millis: number): Date;

    roundUpSeconds(seconds: number): Date;

    roundDownSeconds(seconds: number): Date;

    roundUpMinutes(minutes: number): Date;

    roundDownMinutes(minutes: number): Date;

    roundUpHours(hours: number): Date;

    roundDownHours(hours: number): Date;

    roundUpDays(days: number): Date;

    roundDownDays(days: number): Date;
  }

  interface Array<T> {
    flatMap<R>(transform: (T) => Array<R>): Array<R>;

    distinctBy(c: (T) => any): Array<T>;

    sumBy(c: (T) => number): number;

    removeItem(item: T): Array<T>;

    clone(): Array<T>;

    remove(item: T);
  }
}

