import {Component, Input, OnInit} from '@angular/core';
import {BaseRoom} from '../../../models/room.model';
import {BaseUser} from '../../../models/user.model';
import {FormComponent} from '../../abstracts/form.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RoomService} from '../../../services/room/room.service';
import {UserService} from '../../../services/user/user.service';
import {SimpleReservation} from '../../../models/reservation.model';
import {AppValidators} from '../../../app.validator';
import {Subject} from 'rxjs';
import {debounceTime, map, startWith, tap} from 'rxjs/operators';
import {SessionService} from '../../../services/session/session.service';
import {AboService} from '../../../services/abo/abo.service';
import {ReservationService} from '../../../services/reservation/reservation.service';
import {BaseSlot} from '../../../models/slot.model';
import {BaseAbo, SimpleAbo} from '../../../models/abo.model';
import {TranslateService} from '@ngx-translate/core';
import {BaseContingent} from '../../../models/contingent.model';
import {TRANSLATION_KEYS} from '../../../../app.translation-tree';

@Component({
  selector: 'component-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss']
})
export class ReservationFormComponent extends FormComponent<SimpleReservation> implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly roomService: RoomService,
    private readonly userService: UserService,
    private readonly aboService: AboService,
    private readonly reservationService: ReservationService,
    private readonly sessionService: SessionService,
    private readonly translateService: TranslateService
  ) {
    super();
  }


  @Input()
  initialRoomId: string;

  @Input()
  initialUserId: string;

  @Input()
  initialStart: Date;

  users: BaseUser[];
  filteredUsers = new Subject<BaseUser[]>();

  abos: SimpleAbo[];
  filteredAbos = new Subject<SimpleAbo[]>();

  contingent: BaseContingent;

  rooms: BaseRoom[];
  filteredRooms = new Subject<BaseRoom[]>();

  minDate: Date;
  maxDate: Date;

  slots = new Subject<BaseSlot[]>();

  minStart = '07:00';
  minEnd = this.minStart;
  maxStart = '23:00';
  maxEnd = this.maxStart;

  contingentError = new Subject<string>();


  ngOnInit() {
    super.ngOnInit();

    // this.userService.getAll().pipe(
    //   map(users => users.filter(async user => await this.sessionService.hasPermissionPromise('create:reservation', user.id)))
    // ).subscribe(users => this.onUsersFetched(users));

    this.formControls.user.valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      tap(value => this.onUserSelected(value)),
      map(value => this.displayUser(value)),
      map(value => this.filterUsersBy(value))
    ).subscribe(value => this.filteredUsers.next(value));

    this.formControls.abo.valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      tap(value => this.onAboSelected(value)),
      map(value => this.displayAbo(value)),
      map(value => this.filterAbosBy(value))
    ).subscribe(value => this.filteredAbos.next(value));

    this.formControls.room.valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      tap(value => this.onRoomSelected(value)),
      map(value => this.displayRoom(value)),
      map(value => this.filterRoomBy(value))
    ).subscribe(value => this.filteredRooms.next(value));

    this.formControls.date.valueChanges.subscribe(value => this.onDateSelected(value));

    this.formControls.start.valueChanges.subscribe(start => this.onStartSelected(start));
    this.formControls.end.valueChanges.subscribe(end => this.onEndSelected(end));
    this.formControls.slot.valueChanges.subscribe(slot => this.onSlotSelected(slot));
  }

  fetchSlots(room?: BaseRoom, date?: Date) {
    date = date ? date : this.formControls.date.value;
    room = room ? room : this.formControls.room.value;

    if (room && room.id && date) {
      this.roomService.getSlots(room.id, date).subscribe(slots => this.onSlotsFetched(slots));
    } else {
      this.slots.next([]);
    }
  }

  displayUser(user: BaseUser | string): string {
    return (!user || typeof user === 'string') ? '' : `${user.givenName}`;
  }

  filterUsersBy(value: string): BaseUser[] {
    return this.users ? this.users.filter(user => this.displayUser(user).toLowerCase().includes(value.toLowerCase())) : [];
  }

  displayRoom(room: BaseRoom | string): string {
    return (!room || typeof room === 'string') ? '' : `${room.number} ${room.name}`;
  }

  filterRoomBy(value: string): BaseRoom[] {
    return this.rooms ? this.rooms.filter(room => this.displayRoom(room).toLowerCase().includes(value.toLowerCase())) : [];
  }

  displayAbo(abo: SimpleAbo) {
    return (!abo || typeof abo === 'string') ? '' : `${abo.title}`;
  }

  filterAbosBy(value: string): SimpleAbo[] {
    return this.abos ? this.abos.filter(abo => this.displayAbo(abo).toLowerCase().includes(value.toLowerCase())) : [];
  }

  getDefaultValue(): SimpleReservation {
    const now = new Date(Date.now());
    return {
      user: null,
      room: null,
      title: '',
      start: now,
      end: now.plusMinutes(45),
      abo: null
    };
  }

  getFormGroup(value: SimpleReservation): FormGroup {
    return this.formBuilder.group({
      title: [value.title, [Validators.required]],
      description: [value.description, [Validators.required, Validators.maxLength(100)]],
      date: [value.start, Validators.required],
      start: [`${value.start.getHours()}:${value.start.getMinutes()}`, [Validators.required]],
      end: [`${value.end.getHours()}:${value.end.getMinutes()}`, [Validators.required]],
      user: [value.user, [Validators.required, AppValidators.requireSelect]],
      room: [value.room, [Validators.required, AppValidators.requireSelect]],
      slot: [null, Validators.required],
      abo: [value.abo, [Validators.required, AppValidators.requireSelect]]
    });
  }

  onRoomSelected(room: BaseRoom | string) {
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

  onSlotSelected(slot: BaseSlot) {
    // TODO das klappt noch nicht
    this.minStart = new Date(slot.start).toSimpleTimeString();
    this.maxStart = new Date(slot.end).minusMinutes(15).toSimpleTimeString();
    this.maxEnd = new Date(slot.end).toSimpleTimeString();
    this.minEnd = new Date(slot.start).toSimpleTimeString();

    this.checkContingent();
  }

  private onUsersFetched(users: BaseUser[]) {
    this.users = users;
    this.formControls.user.setValue(users.find(it => it.id === this.initialUserId));
  }

  private onUserSelected(value: BaseUser) {
    if (value && typeof value !== 'string') {
      this.aboService.getSimpleByUser(value.id).subscribe(abos => this.onAbosFetched(abos));
    }
  }

  private onAbosFetched(abos: SimpleAbo[]) {
    this.abos = abos;
    this.filteredAbos.next(abos);
  }

  private onAboSelected(value: SimpleAbo) {
    if (typeof value !== 'string') {
      this.onRoomsFetched(value.rooms);
      this.minDate = value.start;
      this.maxDate = value.end;
      this.fetchContingent(value);

      // const currentTitle = this.formControls.title.value;
      // if (!currentTitle || currentTitle.trim().length <= 0) {
      this.formControls.title.setValue(value.title);
      // }

      // const currentDescription = this.formControls.description.value;
      // if (!currentDescription || currentDescription.trim().length <= 0) {
      this.formControls.description.setValue(value.description);
      // }
    }
  }

  private onRoomsFetched(rooms: BaseRoom[]) {
    this.rooms = rooms;
    this.filteredRooms.next(rooms);
    const currentRoom = this.formControls.room.value;
    if (currentRoom) {
      this.formControls.room.setValue(rooms.find(it => it.id === currentRoom.id));
    }
  }

  private onDateSelected(date?: Date) {
    this.fetchSlots(null, date);
    this.fetchContingent(null, date);
  }

  private onSlotsFetched(slots: BaseSlot[]) {
    this.slots.next(slots);
    if (slots.length === 1) {
      this.formControls.slot.setValue(slots[0]);
    } else {
      const currentSlot = this.formControls.slot.value;
      if (currentSlot) {
        this.formControls.slot.setValue(slots.find(it => it.start === currentSlot.start && it.end === currentSlot.end));
      }
    }
    this.checkContingent();
  }

  private getDate(date?: Date) {
    date = date ? date : this.formControls.date.value;
    return date ? new Date(this.formControls.date.value) : null;
  }

  private getStartDate(date?: Date, start?: string) {
    date = this.getDate(date);
    start = start ? start : this.formControls.start.value;
    return (date && start) ? new Date(date.setHours(+start.split(':')[0], +start.split(':')[1])) : null;
  }

  private getEndDate(date?: Date, end?: string) {
    date = this.getDate(date);
    end = end ? end : this.formControls.end.value;
    return (date && end) ? new Date(date.setHours(+end.split(':')[0], +end.split(':')[1])) : null;
  }

  private checkContingent(date?: Date, start?: string, end?: string) {
    const startDate = this.getStartDate(date, start);
    const endDate = this.getEndDate(date, end);
    if (startDate && endDate) {
      const alreadyConsideredContingent = this.editing ? this.value.start.diffInMinutes(this.value.end) : 0;
      const error = startDate.diffInMinutes(endDate) - this.contingent.left + alreadyConsideredContingent;
      if (!this.contingent || error > 0) {
        this.translateService.get(TRANSLATION_KEYS.component.reservation_form.contingent.error, {error})
          .subscribe(value => {
            console.log(value);
            this.contingentError.next(value);
          });
      } else {
        this.contingentError.next(null);
      }
    } else {
      this.contingentError.next(null);
    }
  }

  private fetchContingent(abo?: BaseAbo, date ?: Date) {
    abo = abo ? abo : this.formControls.abo.value;
    date = date ? date : this.formControls.date.value;
    if (abo && typeof abo !== 'string' && date) {
      this.aboService.getContingentOnDate(abo.id, date).subscribe(value => this.onContingentFetched(value));
    }
  }

  private onContingentFetched(value: BaseContingent) {
    this.contingent = value;
  }

  prepareValueForSubmit(defaultValue: SimpleReservation, formGroup: FormGroup): SimpleReservation {
    return {
      ...defaultValue,
      ...formGroup.value,
      start: this.getStartDate(),
      end: this.getEndDate()
    };
  }
}
