import {AbstractControl, FormGroup, ValidatorFn} from '@angular/forms';

// export const NO_JSON_ERROR = 'NOT_AN_OPTION';
// export const INVALID_DATE_RANGE_ERROR = 'INVALID_DATE_RANGE';
// export const MOD_ERROR = 'INVALID_DATE_RANGE';

export class AppValidators {

  static requireSelect(control: AbstractControl) {
    const selection: any = control.value;
    if (typeof selection === 'string') {
      return {requireSelect: true};
    }
    return null;
  }

  // static noString(control: AbstractControl) {
  //   console.log(control);
  //   if (typeof control.value !== 'string') {
  //     return {noString: true};
  //   }
  //   return null;
  // }

  //
  // static json(): ValidatorFn {
  //   return (ctl: AbstractControl): { [key: string]: any } => {
  //     return (!AppValidators.isJSON(ctl.value) || ctl.value === null || ctl.value === '') ? {[NO_JSON_ERROR]: true} : null;
  //   };
  // }
  //
  // static hasType<T>(constructorFn: new () => T): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } => {
  //     return !(control.value instanceof constructorFn) ? {validType: true} : null;
  //   };
  // }
  //
  // static mod<T>(mod: number): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } => {
  //     return !(control.value % mod === 0) ? {[MOD_ERROR]: true} : null;
  //   };
  // }
  //
  // static rangeBoundsToDateInMinutes(
  //   min: number,
  //   max: number,
  //   thisTime: AbstractControl,
  //   otherDate: AbstractControl,
  //   otherTime: AbstractControl
  // ): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } => {
  //     // if(control.value !instanceof Date || other.value !instanceof Date) throw new Error('Date validators only usable with dates');
  //
  //     const current = new Date(control.value);
  //     const ctimeArr = thisTime.value.split(':'); // https://regex101.com/r/H4dMvA/1
  //     const chour = parseInt(ctimeArr[0], 10);
  //     const cmin = parseInt(ctimeArr[1], 10);
  //     current.setUTCHours(chour, cmin, 0, 0);
  //
  //     const other = new Date(otherDate.value);
  //     const otimeArr = otherTime.value.split(':'); // https://regex101.com/r/H4dMvA/1
  //     const ohour = parseInt(otimeArr[0], 10);
  //     const omin = parseInt(otimeArr[1], 10);
  //     other.setUTCHours(ohour, omin, 0, 0);
  //
  //     console.log(current);
  //     console.log(other);
  //
  //     const differenzInMs = current.getTime() - other.getTime();
  //     const differenzInS = differenzInMs / 1000;
  //     return (differenzInS <= max && differenzInS >= min) ? {validType: true} : null;
  //   };
  // }
  //
  // static startEndValidator(startFcName: string, endFcName: string): ValidatorFn | undefined {
  //   return (group: FormGroup) => {
  //     const startControl = group.controls[startFcName];
  //     const endControl = group.controls[endFcName];
  //
  //     if (startControl.value === '' || endControl.value === '') {
  //       return {};
  //     }
  //
  //     if (startControl.value < endControl.value) {
  //       endControl.setErrors(null);
  //       return {};
  //     }
  //
  //     const error = {[INVALID_DATE_RANGE_ERROR]: true};
  //     endControl.setErrors(error);
  //     return error;
  //   };
  // }
}
