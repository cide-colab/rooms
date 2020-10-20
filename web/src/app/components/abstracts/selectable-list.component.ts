import {EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';

export class SelectableListComponent<T> {

  private selections: T[] = [];

  @Input()
  selected = false;

  @Output()
  selectionChange = new EventEmitter<T[]>();

  @Input()
  selectionMode: 'none' | 'single' | 'multi' = 'none';

  select(item: T, select: boolean = true) {
    if (select && this.selectionMode !== 'none') {
      switch (this.selectionMode) {
        case 'single': this.selections = [item]; break;
        case 'multi': this.selections.push(item); break;
      }
    } else {
      this.selections.remove(item);
    }
    this.selectionChange.emit(this.selections);
  }

  deselect(item: T) {
    this.select(item, false);
  }

  clear() {
    this.selections = [];
  }

}
