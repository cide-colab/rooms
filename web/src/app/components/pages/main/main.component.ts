import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToolbarService} from '../../../services/toolbar/toolbar.service';


@Component({
  selector: 'component-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

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
