import {Component, Input, OnInit} from '@angular/core';
import {EditorComponent} from '../../abstracts/editor.component';
import {ReservationForm, RichReservation} from '../../../core/models/reservation.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {RichUser} from '../../../core/models/user.model';
import {Room} from '../../../core/models/room.model';
import {RichAbo} from '../../../core/models/abo.model';
import {UserService} from '../../../services/user/user.service';
import {RoomService} from '../../../services/room/room.service';
import {AboService} from '../../../services/abo/abo.service';
import {debounceTime, map, startWith, tap} from 'rxjs/operators';
import {EagerSubject} from '../../../utils/EagerSubject';
import {Contingent} from '../../../core/models/contingent.model';
import {Slot} from '../../../core/models/slot.model';
import {SimpleReservation} from '../../../models/reservation.model';
import {AclAction, AclClassAlias} from '../../../models/acl-entry.model';

@Component({
  selector: 'component-reservation-editor',
  templateUrl: './reservation-editor.component.html',
  styleUrls: ['./reservation-editor.component.scss']
})
export class ReservationEditorComponent extends EditorComponent<ReservationForm> implements OnInit {

  @Input()
  default: ReservationForm = {
    id: undefined,
    title: '',
    description: '',
    start: new Date(Date.now()).roundUpMinutes(15).toISOString(),
    end: new Date(Date.now()).plusHours(1).roundUpMinutes(15).toISOString(),
    room: undefined,
    abo: undefined,
    user: undefined
  };

  formGroup: FormGroup;

  contingent: Contingent;

  minDate: Date;
  maxDate: Date;

  minStart = '07:00';
  minEnd = this.minStart;
  maxStart = '23:00';
  maxEnd = this.maxStart;

  users: RichUser[];
  filteredUsers = new EagerSubject<RichUser[]>([]);

  rooms: Room[];
  filteredRooms = new EagerSubject<Room[]>([]);

  abos: RichAbo[];
  filteredAbos = new EagerSubject<RichAbo[]>([]);

  slots = new EagerSubject<Slot[]>([]);

  contingentError = new Subject<string>();

  constructor(
    private readonly builder: FormBuilder,
    private readonly userService: UserService,
    private readonly roomService: RoomService,
    private readonly aboService: AboService
  ) {
    super();
  }

  ngOnInit(): void {

    this.userService.getAllByAclPermission(AclClassAlias.reservation, AclAction.CREATE)
      .subscribe(users => this.onUsersFetched(users));

    this.formGroup = this.builder.group({
      id: [{value: this.default.id, disabled: true}],
      date: [this.default.start, Validators.required],
      start: [`${new Date(this.default.start).getHours()}:${new Date(this.default.start).getMinutes()}`, [Validators.required]],
      end: [`${new Date(this.default.end).getHours()}:${new Date(this.default.end).getMinutes()}`, [Validators.required]],
      title: [this.default.title, Validators.required],
      description: [this.default.description, Validators.maxLength(512)],
      user: [this.default.user, Validators.required],
      room: [this.default.room, Validators.required],
      abo: [this.default.abo, Validators.required],
      slot: [null, Validators.required],
    });

    this.formGroup.get('user').valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      tap(value => this.onUserSelected(value)),
      map(value => this.displayUser(value)),
      map(value => this.filterUsersBy(value))
    ).subscribe(value => this.filteredUsers.next(value));

    this.formGroup.get('abo').valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      tap(value => this.onAboSelected(value)),
      map(value => this.displayAbo(value)),
      map(value => this.filterAbosBy(value))
    ).subscribe(value => this.filteredAbos.next(value));

    this.formGroup.get('room').valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      tap(value => this.onRoomSelected(value)),
      map(value => this.displayRoom(value)),
      map(value => this.filterRoomBy(value))
    ).subscribe(value => this.filteredRooms.next(value));

    this.formGroup.get('date').valueChanges.subscribe(value => this.onDateSelected(value));
    this.formGroup.get('start').valueChanges.subscribe(start => this.onStartSelected(start));
    this.formGroup.get('end').valueChanges.subscribe(end => this.onEndSelected(end));
    this.formGroup.get('slot').valueChanges.subscribe(slot => this.onSlotSelected(slot));
  }

  fetchSlots(room?: Room, date?: Date) {
    date = date ? date : this.formGroup.get('date').value;
    room = room ? room : this.formGroup.get('room').value;

    if (room && room.id && date) {
      this.roomService.getSlots(room.id, date).subscribe(slots => this.onSlotsFetched(slots));
    } else {
      this.slots.next([]);
    }
  }

  displayUser(user: RichUser | string): string {
    return (!user || typeof user === 'string') ? '' : `${user.givenName}`;
  }

  filterUsersBy(value: string): RichUser[] {
    return this.users ? this.users.filter(user => this.displayUser(user).toLowerCase().includes(value.toLowerCase())) : [];
  }

  displayRoom(room: Room | string): string {
    return (!room || typeof room === 'string') ? '' : `${room.number} ${room.name}`;
  }

  filterRoomBy(value: string): Room[] {
    return this.rooms ? this.rooms.filter(room => this.displayRoom(room).toLowerCase().includes(value.toLowerCase())) : [];
  }

  displayAbo(abo: RichAbo) {
    return (!abo || typeof abo === 'string') ? '' : `${abo.title}`;
  }

  filterAbosBy(value: string): RichAbo[] {
    return this.abos ? this.abos.filter(abo => this.displayAbo(abo).toLowerCase().includes(value.toLowerCase())) : [];
  }

  onRoomSelected(room: Room | string) {
    if (typeof room !== 'string') {
      this.fetchSlots(room);
    } else {
      this.fetchSlots(null);
    }
  }

  onStartSelected(start: string) {
    this.minEnd = start;
    this.checkContingent(null, start);
  }

  onEndSelected(end: string) {
    this.checkContingent(null, null, end);
  }

  onSlotSelected(slot: Slot) {
    // TODO das klappt noch nicht
    this.minStart = new Date(slot.start).toSimpleTimeString();
    this.maxStart = new Date(slot.end).minusMinutes(15).toSimpleTimeString();
    this.maxEnd = new Date(slot.end).toSimpleTimeString();
    this.minEnd = new Date(slot.start).toSimpleTimeString();

    this.checkContingent();
  }

  private onUsersFetched(users: RichUser[]) {
    this.users = users;
  }

  private onUserSelected(value: RichUser) {
    if (value && typeof value !== 'string') {
      this.aboService.getAllByUser(value.id).subscribe(abos => this.onAbosFetched(abos));
    }
  }

  private onAbosFetched(abos: RichAbo[]) {
    this.abos = abos;
    this.filteredAbos.next(abos);
  }

  private onAboSelected(value: RichAbo) {
    if (typeof value !== 'string') {
      this.onRoomsFetched(value.rooms);
      this.minDate = new Date(value.start);
      this.maxDate = new Date(value.end);
      this.fetchContingent(value);

      // const currentTitle = this.formControls.title.value;
      // if (!currentTitle || currentTitle.trim().length <= 0) {
      this.formGroup.get('title').setValue(value.title);
      // }

      // const currentDescription = this.formControls.description.value;
      // if (!currentDescription || currentDescription.trim().length <= 0) {
      this.formGroup.get('description').setValue(value.description);
      // }
    }
  }

  private onRoomsFetched(rooms: Room[]) {
    this.rooms = rooms;
    this.filteredRooms.next(rooms);
    const currentRoom = this.formGroup.get('room').value;
    if (currentRoom) {
      this.formGroup.get('room').setValue(rooms.find(it => it.id === currentRoom.id));
    }
  }

  private onDateSelected(date?: Date) {
    this.fetchSlots(null, date);
    this.fetchContingent(null, date);
  }

  private onSlotsFetched(slots: Slot[]) {
    this.slots.next(slots);
    if (slots.length === 1) {
      this.formGroup.get('slot').setValue(slots[0]);
    } else {
      const currentSlot = this.formGroup.get('slot').value;
      if (currentSlot) {
        this.formGroup.get('slot').setValue(slots.find(it => it.start === currentSlot.start && it.end === currentSlot.end));
      }
    }
    this.checkContingent();
  }

  private getDate(date?: Date) {
    date = date ? date : this.formGroup.get('date').value;
    return date ? new Date(this.formGroup.get('date').value) : null;
  }

  private getStartDate(date?: Date, start?: string) {
    date = this.getDate(date);
    start = start ? start : this.formGroup.get('start').value;
    return (date && start) ? new Date(date.setHours(+start.split(':')[0], +start.split(':')[1])) : null;
  }

  private getEndDate(date?: Date, end?: string) {
    date = this.getDate(date);
    end = end ? end : this.formGroup.get('end').value;
    return (date && end) ? new Date(date.setHours(+end.split(':')[0], +end.split(':')[1])) : null;
  }

  private checkContingent(date?: Date, start?: string, end?: string) {
    const startDate = this.getStartDate(date, start);
    const endDate = this.getEndDate(date, end);
    if (startDate && endDate) {
      const alreadyConsideredContingent = this.default.id ? new Date(this.default.start).diffInMinutes(new Date(this.default.end)) : 0;
      const error = startDate.diffInMinutes(endDate) - this.contingent.left + alreadyConsideredContingent;
      if (!this.contingent || error > 0) {
        this.contingentError.next(`Das Kontingent wurde um ${error} Minuten überschritten.`);
      } else {
        this.contingentError.next(null);
      }
    } else {
      this.contingentError.next(null);
    }
  }

  private fetchContingent(abo?: RichAbo, date ?: Date) {
    abo = abo ? abo : this.formGroup.get('abo').value;
    date = date ? date : this.formGroup.get('date').value;
    if (abo && typeof abo !== 'string' && date) {
      this.aboService.getContingentOnDate(abo.id, date).subscribe(value => this.onContingentFetched(value));
    }
  }

  private onContingentFetched(value: Contingent) {
    this.contingent = value;
  }

  prepareValueForSubmit(defaultValue: RichReservation, formGroup: FormGroup): SimpleReservation {
    return {
      ...defaultValue,
      ...formGroup.value,
      start: this.getStartDate(),
      end: this.getEndDate()
    };
  }
  toForm(formGroup: FormGroup): ReservationForm {
    return {
      ...super.toForm(formGroup),
      start: this.getStartDate().toISOString(),
      end: this.getEndDate().toISOString()
    };
  }
}
