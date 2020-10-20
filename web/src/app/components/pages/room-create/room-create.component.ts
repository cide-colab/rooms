import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToolbarService} from '../../../services/toolbar/toolbar.service';

@Component({
  selector: 'component-room-create',
  templateUrl: './room-create.component.html',
  styleUrls: ['./room-create.component.scss']
})
export class RoomCreateComponent implements OnInit, OnDestroy {

  constructor(
    private readonly toolbarService: ToolbarService
  ) { }

  ngOnInit(): void {
    this.toolbarService.setPageTitle('Neuer Raum');
  }

  ngOnDestroy(): void {
    this.toolbarService.clearPage();
  }

}
