import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToolbarService} from '../../../services/toolbar/toolbar.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Location} from '@angular/common';
import {RoomService} from '../../../services/room/room.service';
import {RichRoom, RoomForm} from '../../../core/models/room.model';

@Component({
  selector: 'component-room-create',
  templateUrl: './room-create.component.html',
  styleUrls: ['./room-create.component.scss']
})
export class RoomCreateComponent implements OnInit, OnDestroy {

  constructor(
    private readonly toolbarService: ToolbarService,
    private readonly roomService: RoomService,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
    private readonly location: Location,
  ) { }

  ngOnInit(): void {
    this.toolbarService.setPageTitle('Neuer Raum');
  }

  ngOnDestroy(): void {
    this.toolbarService.clearPage();
  }

  save(room: RoomForm) {
    this.roomService.save(room).subscribe(
      next => {
        this.snackBar.open(`Raum ${next.number} wurde erfolgreich erstellt`, null, {duration: 3000});
        this.location.back();
      },
      error => {
        console.log(error);
        this.snackBar.open(`Raum ${room.number} konnte nicht erstellt werden`, 'Wiederholen', {duration: 3000})
          .onAction().subscribe(next => this.save(room));
      }
    );
  }

}
