import {EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {TRANSLATION_KEYS} from '../../../app.translation-tree';

// export abstract class Form2Component<T> {
//
//   @Input()
//   value: T = this.getDefaultValue();
//
//   @Output()
//   onSubmit: EventEmitter<T> = new EventEmitter<T>();
//
//   isLocked = false;
//
//   TRANSLATION_KEYS = TRANSLATION_KEYS;
//
//   abstract getDefaultValue(): T;
//
//   lock() {
//     this.isLocked = true;
//   }
//
//   unlock() {
//     this.isLocked = false;
//   }
//
//   hasChanges(): boolean {
//     return JSON.stringify(this.value) !== JSON.stringify(this.getDefaultValue());
//   }
//
//   reset() {
//     this.value = this.getDefaultValue();
//   }
//
//   submit() {
//     if (this.isLocked) {
//       return;
//     }
//     this.lock();
//     if (this.formGroup.invalid) {
//       this.unlock();
//       return;
//     }
//     const mergedValue = {
//       ...this.value,
//       ...this.formGroup.value
//     };
//     this.onSubmit.emit(mergedValue);
//     this.unlock();
//   }
//
// }

export abstract class FormComponent<T> implements OnInit {

  @Input()
  value: T;

  TRANSLATION_KEYS = TRANSLATION_KEYS;

  @Output()
  onSubmit: EventEmitter<T> = new EventEmitter<T>();

  formGroup: FormGroup;
  isLocked = false;
  creating = true;

  ngOnInit(): void {
    this.getInitValue();
    this.reset();
  }

  get formControls() {
    return this.formGroup.controls;
  }

  lock() {
    this.isLocked = true;
  }

  unlock() {
    this.isLocked = false;
  }


  reset() {
    this.formGroup = this.getFormGroup(this.value);
  }

  private getInitValue() {
    if (!this.value) {
      this.creating = false;
      this.value = this.getDefaultValue();
    }
  }

  get editing(): boolean {
    return !this.creating;
  }

  abstract getDefaultValue(): T;

  hasChanges(): boolean {
    return JSON.stringify(this.formGroup.value) !== JSON.stringify(this.getFormGroup(this.value).value);
  }

  abstract getFormGroup(value: T): FormGroup;

  prepareValueForSubmit(defaultValue: T, formGroup: FormGroup): T {
    return {
      ...defaultValue,
      ...formGroup.value
    };
  }

  validate(defaultValue: T, formGroup: FormGroup): boolean {
    return formGroup.invalid;
  }

  submit() {
    if (this.isLocked) {
      return;
    }
    this.lock();
    if (this.validate(this.value, this.formGroup)) {
      this.unlock();
      return;
    }
    const mergedValue = this.prepareValueForSubmit(this.value, this.formGroup);
    this.onSubmit.emit(mergedValue);
    this.unlock();
  }
}
