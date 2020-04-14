import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {SidenavService} from '../../services/sidenav/sidenav.service';
import {TRANSLATION_KEYS} from '../../../app.translation-tree';
import {FilterableComponent} from '../abstracts/filterable.component';

@Component({
  selector: 'component-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input()
  title: string;

  TRANSLATION_KEYS = TRANSLATION_KEYS;

  searchOpened = false;

  @Input()
  searchEnabled = false;

  @Output()
  search: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  filterableComponents: FilterableComponent[] = [];

  @ViewChild('search')
  searchElement: ElementRef;

  constructor(
    private readonly sidenavService: SidenavService
  ) {
  }

  ngOnInit(): void {
  }

  public openSidenav() {
    this.sidenavService.openSidenav();
  }

  onChange(query: string) {
    this.search.emit(query);
    this.filterableComponents.forEach(it => it.filter(query));
  }
}
