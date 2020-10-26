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
import {AclAction} from '../../models/acl-entry.model';
import {User} from '../../core/models/user.model';

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

  getAllByPermission(action: AclAction): Observable<RichRoom[]> {
    return this.backendService.getCollection(`rooms/search/byPermission`, 'rooms', {
      action,
      projection: Projection.RICH
    });
  }

  get(id: number): Observable<RichRoom> {
    return this.backendService.getSingle(`rooms/${id}`, {
      projection: Projection.RICH
    });
  }

  getAll(): Observable<RichRoom[]> {
    return this.backendService.getCollection(`rooms`, 'rooms', {
      projection: Projection.RICH
    });
  }

  save(room: RoomForm): Observable<Room> {
    return this.backendService.postSingle('rooms', {
      ...room,
      department: `/departments/${room.department.id}`
    });
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
    return this.backendService.patchSingle(`rooms/${room.id}`, {
      ...room,
      department: `/departments/${room.department.id}`
    });
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
    return this.backendService.getCollection(`departments/${id}/rooms`, 'rooms', {
      projection: Projection.RICH
    });
  }

  getByAbo(id: number): Observable<RichRoom[]> {
    return this.backendService.getCollection<RichRoom>(`abos/${id}/rooms`, 'rooms', {
      projection: Projection.RICH
    });
  }
}
