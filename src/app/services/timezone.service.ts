import {Inject, Injectable, Optional, Pipe, PipeTransform} from '@angular/core';
import 'moment/locale/pt-br';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import * as moment from 'moment-timezone';
import {MAT_DATE_LOCALE} from '@angular/material/core';

@Injectable({
  providedIn: 'root'
})
export class TimezoneService extends MomentDateAdapter {

  private defaultTimeZone = 'Europe/Berlin';
  private defaultLocale = 'de_DE';

  // private defaultTimeZone = 'America/Toronto';

  constructor(@Optional() @Inject(MAT_DATE_LOCALE) dateLocale: string) {
    super(dateLocale);
    this.setDefaultTimezone();
    this.setDefaultLocale();
  }

  setDefaultTimezone() {
    this.setTimezone(this.defaultTimeZone);
  }

  setDefaultLocale() {
    this.setLocale(this.defaultLocale);
  }

  setTimezone(timezone: string) {
    moment.tz.setDefault(timezone);
  }

  setLocale(locale: string) {
    super.setLocale(locale);
  }

}

@Pipe({name: 'timezone-date'})
export class TimeZoneDatePipe implements PipeTransform {

  constructor(private readonly timezoneService: TimezoneService) {
  }


  transform(date: Date | string, day: number, format: string = 'yyyy-MM-dd'): string {
    return moment.tz(date).format(format);
  }
}
