import {Injectable} from '@angular/core';
import {BackendService, TokenRequirement} from '../backend/backend.service';
import {BaseDepartment} from '../../models/department.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {BaseRoom, RoomListEntity, SimpleRoom} from '../../models/room.model';
import {removeTemplate} from '../../app.utils';
import {BaseSlot, SlotListEntity} from '../../models/slot.model';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private readonly backendService: BackendService) {
  }

  private static getProtocol(room: SimpleRoom): any {
    return {
      ...room,
      department: removeTemplate(room.department._links.self)
    };
  }

  save(room: SimpleRoom): Observable<BaseRoom> {
    return this.backendService.post('rooms', RoomService.getProtocol(room), TokenRequirement.REQUIRED);
  }

  getAllSimple(): Observable<SimpleRoom[]> {
    return this.backendService.get<RoomListEntity<SimpleRoom>>(
      'rooms?projection=detailed',
      TokenRequirement.IF_LOGGED_IN
    ).pipe(map(value => value._embedded.rooms));
  }

  getWithDepartment(id: string): Observable<SimpleRoom> {
    return this.backendService.get(`rooms/${id}?projection=detailed`, TokenRequirement.IF_LOGGED_IN);
  }

  getBase(id: string): Observable<SimpleRoom> {
    return this.backendService.get(`rooms/${id}`, TokenRequirement.IF_LOGGED_IN);
  }

  delete(room: BaseRoom): Observable<any> {
    return this.backendService.delete(room._links.self.href, TokenRequirement.REQUIRED);
  }

  update(room: SimpleRoom): Observable<BaseRoom> {
    return this.backendService.patch(room._links.self.href, RoomService.getProtocol(room), TokenRequirement.REQUIRED);
  }

  getSlots(roomId: string, date: Date): Observable<BaseSlot[]> {
    return this.backendService.get<SlotListEntity<BaseSlot>>(
      // `rooms/${roomId}/slots?date=${encodeURIComponent(this.datePipe.transform(date, 'yyyy-MM-ddTHH:mm:ss\'Z\''))}`,
      `rooms/${roomId}/slots?date=${encodeURIComponent(moment(date).format())}`,
      // `rooms/${roomId}/slots?date=${date.toISOString()}`,
      TokenRequirement.IF_LOGGED_IN
    ).pipe(map(value => value._embedded.slots));
  }

  getForDepartment(department: BaseDepartment): Observable<SimpleRoom[]> {
    return this.backendService.get<RoomListEntity<SimpleRoom>>(
      `departments/${department.id}/rooms?projection=detailed`,
      TokenRequirement.IF_LOGGED_IN
    ).pipe(map(value => value._embedded.rooms));
  }
}
