import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToolbarService} from '../../../services/toolbar/toolbar.service';
import {RoomService} from '../../../services/room/room.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Location} from '@angular/common';
import {RichRoom, RoomForm} from '../../../core/models/room.model';
import {ActivatedRoute} from '@angular/router';
import {map, switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'component-room-update',
  templateUrl: './room-update.component.html',
  styleUrls: ['./room-update.component.scss']
})
export class RoomUpdateComponent implements OnInit, OnDestroy {

  room: Observable<RichRoom>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly toolbarService: ToolbarService,
    private readonly roomService: RoomService,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
    private readonly location: Location
  ) {
  }

  ngOnInit(): void {
    this.room = this.route.params.pipe(
      map(params => params.id),
      switchMap(id => this.roomService.get(id)),
      tap(room => this.toolbarService.setPageTitle(`Raum ${room.number} bearbeiten`))
    );
  }

  ngOnDestroy(): void {
    this.toolbarService.clearPage();
  }

  save(form: RoomForm) {
    console.log(form);
    this.roomService.update(form).subscribe(
      next => {
        this.snackBar.open(`Raum ${next.number} wurde erfolgreich aktualisiert`, null, {duration: 3000});
        this.location.back();
      },
      error => {
        console.log(error);
        this.snackBar.open(`Raum ${form.number} konnte nicht aktualisiert werden`, 'Wiederholen', {duration: 3000})
          .onAction().subscribe(next => this.save(form));
      }
    );
  }

}
