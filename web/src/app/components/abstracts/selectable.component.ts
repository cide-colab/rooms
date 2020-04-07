import {EventEmitter, Input, Output} from '@angular/core';

export class SelectableComponent {

  @Input()
  selectable = true;

  @Input()
  selected = false;

  @Output()
  selectionChange = new EventEmitter<boolean>();

  isSelected(): boolean {
    return this.selectable && this.selected;
  }

  select(flag: boolean) {
    if (!this.selectable) {
      return;
    }
    this.selected = flag;
    this.selectionChange.emit(this.selected);
  }

  toggleSelect() {
    this.select(!this.selected);
  }

}
