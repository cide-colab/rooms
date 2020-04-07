import {Link} from './models/rest-entity.model';

export function cut(value: string, maxChars = 60, suffix = '...'): string {
  if (value?.length > maxChars) {
    return value.substring(0, maxChars) + '...';
  }
  return value;
}

export function removeTemplate(link: Link): string {
  return link.href.split('{')[0];
}

export class Semester {

  // JavaScript counts months from 0 to 11
  private static WINTER_SEMESTER_END_MONTH_INDEX = 1;
  private static SUMMER_SEMESTER_END_MONTH_INDEX = 7;

  private constructor(private anyDateInSemester: Date) {
  }

  public static current(): Semester {
    const now = new Date();
    return Semester.fromDate(now);
  }

  public static fromDate(anyDateInSemester: Date): Semester {
    return new Semester(anyDateInSemester);
  }

  public getEndOfSemester(): Date {
    if (this.isWinterSemesterBeforeNewYear()) {
      return this.winterSemesterEndOfNextYear();
    } else if (this.isWinterSemesterAfterNewYear()) {
      return this.winterSemesterEndOfCurrentYear();
    } else {
      return this.summerSemesterEndOfCurrentYear();
    }
  }

  private winterSemesterEndOfCurrentYear(): Date {
    return this.lastDayOfMonthDate(Semester.WINTER_SEMESTER_END_MONTH_INDEX, this.anyDateInSemester.getFullYear());
  }

  private winterSemesterEndOfNextYear(): Date {
    return this.lastDayOfMonthDate(Semester.WINTER_SEMESTER_END_MONTH_INDEX, this.anyDateInSemester.getFullYear() + 1);
  }

  private summerSemesterEndOfCurrentYear(): Date {
    return this.lastDayOfMonthDate(Semester.SUMMER_SEMESTER_END_MONTH_INDEX);
  }

  private lastDayOfMonthDate(month: number, year: number = this.anyDateInSemester.getFullYear()) {
    // month + 1 and day = 0 means last day of month. This is required because of February with 28 or 29 days
    return new Date(year, month + 1, 0, 23, 59, 59);
  }

  private isWinterSemesterAfterNewYear(): boolean {
    return this.anyDateInSemester.getMonth() <= Semester.WINTER_SEMESTER_END_MONTH_INDEX;
  }

  private isWinterSemesterBeforeNewYear(): boolean {
    return this.anyDateInSemester.getMonth() > Semester.SUMMER_SEMESTER_END_MONTH_INDEX;
  }
}

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
  }

  interface Array<T> {
    flatMap<R>(transform: (T) => Array<R>): Array<R>;

    distinctBy<T>(c: (T) => any): Array<T>;

    sumBy(c: (T) => number): number;
  }
}

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


Array.prototype.flatMap = function <R>(transform): Array<R> {
  return flatMap(this, transform);
};

Array.prototype.distinctBy = function <R>(c): Array<R> {
  return distinctBy(this, c);
};

Array.prototype.sumBy = function <R>(c): number {
  return sumBy(this, c);
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
