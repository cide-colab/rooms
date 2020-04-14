import {Component, OnInit} from '@angular/core';
import {TRANSLATION_KEYS} from '../../../../app.translation-tree';
import {SessionService} from '../../../services/session/session.service';
import {SimpleRoom} from '../../../models/room.model';
import {RoomService} from '../../../services/room/room.service';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'page-room-list',
  templateUrl: './room-list.page.html',
  styleUrls: ['./room-list.page.scss']
})
export class RoomListPage implements OnInit {

  constructor(
    private readonly sessionService: SessionService,
    private readonly roomService: RoomService
  ) {
  }

  TRANSLATION_KEYS = TRANSLATION_KEYS;
  canCreate = false;
  rooms: Observable<SimpleRoom[]>;
  filteredRooms: SimpleRoom[];

  private static shouldShowRoom(room: SimpleRoom, query: string): boolean {
    return room.name.toLowerCase().includes(query.toLowerCase())
      || room.number.toLowerCase().includes(query.toLowerCase())
      || room.department.name.toLowerCase().includes(query.toLowerCase());
  }

  ngOnInit() {
    this.sessionService.hasPermission('create:room').subscribe(canCreate => this.canCreate = canCreate);
    this.rooms = this.roomService.getAllWithDepartment().pipe(
      tap(rooms => this.onSearch('', rooms))
    );
    // this.onSearch('');
  }

  onSearch(query: string, rooms: SimpleRoom[]) {
    if (!this.rooms) {
      return;
    }
    if (!query || query.length === 0) {
      this.filteredRooms = rooms.slice();
    } else {
      this.filteredRooms = rooms.filter(room => RoomListPage.shouldShowRoom(room, query));
    }
  }

}
