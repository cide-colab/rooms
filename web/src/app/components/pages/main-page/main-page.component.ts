import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToolbarService} from '../../../services/toolbar/toolbar.service';


@Component({
  selector: 'component-main',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {

  constructor(
    protected readonly toolbarService: ToolbarService
  ) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.toolbarService.clearPageButtons();
  }

}
