import {Injectable} from '@angular/core';
import {BackendService, TokenRequirement} from '../backend/backend.service';
import {BaseDepartment} from '../../models/department.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {BaseRoom, RoomListEntity, SimpleRoom} from '../../models/room.model';
import {removeTemplate} from '../../app.utils';
import {BaseSlot, SlotListEntity} from '../../models/slot.model';
import * as moment from 'moment';
import {RichRoom, Room, RoomForm} from '../../core/models/room.model';
import {Projection} from '../../core/projections.model';
import {RichDepartment} from '../../core/models/department.model';

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

  get(id: number): Observable<RichRoom> {
    return this.backendService.getSingle(`rooms/${id}?projection=${Projection.RICH}`);
  }

  getAll(): Observable<RichRoom[]> {
    return this.backendService.getCollection(`rooms?projection=${Projection.RICH}`, 'rooms');
  }

  save(room: RoomForm): Observable<BaseRoom> {
    return this.backendService.postSingle('rooms', room);
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

  delete(id: number): Observable<any> {
    return this.backendService.deleteSingle(`rooms/${id}`);
  }

  update(room: RoomForm): Observable<BaseRoom> {
    return this.backendService.patchSingle(`rooms/${room.id}`, room);
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

  getByDepartmentId(id: number): Observable<RichRoom[]> {
    return this.backendService.getCollection(`departments/${id}/rooms?projection=${Projection.RICH}`, 'rooms');
  }
}
