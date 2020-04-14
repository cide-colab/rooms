import {EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Subject} from 'rxjs';
import {FilterableComponent} from './filterable.component';
import {ReservationPreviewCardMode} from '../reservation-preview-card/reservation-preview-card.component';

export abstract class ListComponent<T> implements FilterableComponent, OnChanges {

  @Input()
  items: T[];

  @Output()
  itemClicked = new EventEmitter<T>();

  filteredItems = new Subject<T[]>();

  @Input()
  mode: ReservationPreviewCardMode;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.items) {
      this.filter('');
    }
  }

  filter(query: string) {
    this.filteredItems.next(this.items ? this.items.filter(it => this.filterItem(it, query)) : []);
  }

  abstract filterItem(item: T, query: string): boolean;

  emitItemClick(item: T) {
    this.itemClicked.emit(item);
  }

}
