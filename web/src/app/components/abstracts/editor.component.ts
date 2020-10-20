import {EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormFieldControlHarness} from '@angular/material/form-field/testing';

export abstract class EditorComponent<T> {

  abstract default: T;

  @Output()
  save: EventEmitter<T> = new EventEmitter<T>();

  abstract formGroup: FormGroup;

  toForm(formGroup: FormGroup): T {
    return this.formGroup.getRawValue();
  }

  reset(key?: string) {
    if (key) {
      return this.formGroup.controls[key].setValue(this.default[key]);
    } else {
      return Object.keys(this.default).find(k => this.reset(k)) !== undefined;
    }
  }

  hasChanges(key?: string): boolean {
    if (key) {
      return this.default[key] !== this.formGroup.value[key];
    } else {
      return Object.keys(this.default).find(k => this.hasChanges(k)) !== undefined;
    }
  }

  hasError(code: string, control?: string) {
    if (control) {
      return this.formGroup.controls[control].hasError(code);
    } else {
      return this.formGroup.hasError(code);
    }
  }

  valid(control?: string): boolean {
    if (control) {
      return this.formGroup.controls[control].valid;
    } else {
      return this.formGroup.valid;
    }
  }

  submit() {
    if (this.valid()) {
      this.save.emit(this.toForm(this.formGroup));
    }
  }

  toHref(object: string | any): string {
    if (typeof object === 'string') {
      return object;
    } else {
      return object._links.self.href;
    }
  }
}
