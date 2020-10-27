

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
