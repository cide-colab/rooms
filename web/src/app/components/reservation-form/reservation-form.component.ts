import {Component, Input, OnInit} from '@angular/core';
import {BaseRoom} from '../../models/room.model';
import {BaseUser} from '../../models/user.model';
import {FormComponent} from '../abstracts/form.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RoomService} from '../../services/room/room.service';
import {UserService} from '../../services/user/user.service';
import {SimpleReservation} from '../../models/reservation.model';
import {AppValidators} from '../../app.validator';
import {Observable, Subject} from 'rxjs';
import {debounceTime, map, startWith, tap} from 'rxjs/operators';
import {SessionService} from '../../services/session/session.service';
import {AboService} from '../../services/abo/abo.service';
import {ReservationService} from '../../services/reservation/reservation.service';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {BaseContingent} from '../../models/contingent.model';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {Moment} from 'moment';
import {BaseSlot} from '../../models/slot.model';

@Component({
  selector: 'component-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss']
})
export class ReservationFormComponent extends FormComponent<SimpleReservation> implements OnInit {


  @Input()
  initialRoomId: string;

  @Input()
  initialUserId: string;

  @Input()
  initialStart: Date;

  users: BaseUser[];
  filteredUsers: Observable<BaseUser[]>;

  rooms: BaseRoom[];
  filteredRooms: Observable<BaseRoom[]>;
  contingentsLeft: number[] = [];

  slots = new Subject<BaseSlot[]>();

  // minStart = new Subject<string>();
  // minEnd = new Subject<string>();
  // maxStart = new Subject<string>();
  // maxEnd = new Subject<string>();
  minStart = '07:00';
  minEnd = this.minStart;
  maxStart = '23:00';
  maxEnd = this.maxStart;

  // reservations: SimpleReservation[];
  // abos: SimpleAbo[];

  contingents: BaseContingent[];

  availableContingents = [];

  contingentBefore = 0;
  contingentAfter = 0;
  contingentConsumed = 0;

  contingentError = null;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly roomService: RoomService,
    private readonly userService: UserService,
    private readonly aboService: AboService,
    private readonly reservationService: ReservationService,
    private readonly sessionService: SessionService
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    this.userService.getAll().pipe(
      map(users => users.filter(async user => await this.sessionService.hasPermissionPromise('create:reservation', user.id))),
      tap(users => this.users = users)
    ).subscribe(users => this.setInitialUser());

    this.filteredUsers = this.formControls.user.valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      map(value => typeof value === 'string' ? value : this.displayUser(value)),
      map(value => this.filterUsersBy(value))
    );

    this.filteredRooms = this.formControls.room.valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      tap(value => {
        if (typeof value === 'string') {
          this.onNoRoomSelected();
        }
      }),
      map(value => typeof value === 'string' ? value : this.displayRoom(value)),
      map(value => this.filterRoomBy(value))
    );

    this.formControls.start.valueChanges.subscribe(start => {
      // this.minEnd.next(start);
      this.minEnd = start;
      // console.log('Value: ' + start);
    });

    // TODO das klappt noch nicht
    this.formControls.slot.valueChanges
      .subscribe(slot => {
        this.minStart = new Date(slot.start).toSimpleTimeString();
        this.maxStart = new Date(slot.end).minusMinutes(15).toSimpleTimeString();
        this.maxEnd = new Date(slot.end).toSimpleTimeString();
        this.minEnd = new Date(slot.start).toSimpleTimeString();
        // this.minStart.next(new Date(slot.start).toSimpleTimeString());
        // this.maxStart.next(new Date(slot.end).minusMinutes(15).toSimpleTimeString());
        // this.maxEnd.next(new Date(slot.end).toSimpleTimeString());
        // this.minEnd.next(new Date(slot.start).toSimpleTimeString());
        // this.formControls.start.setValue(new Date(slot.start).toSimpleTimeString());
        // this.formControls.end.setValue(new Date(slot.start).plusMinutes(15).toSimpleTimeString());
      });
    //
    // this.minStart.subscribe(v => console.log('Min Start ' + v));
    // this.maxStart.subscribe(v => console.log('Max Start ' + v));
    // this.maxEnd.subscribe(v => console.log('Max End ' + v));
    // this.minEnd.subscribe(v => console.log('Min End ' + v));
  }

  updateSlots(room?: BaseRoom, date?: Date) {
    date = date ? date : this.formControls.date.value;
    room = room ? room : this.formControls.room.value;

    if (room && room.id && date) {
      this.roomService.getSlots(room.id, date).subscribe(slots => this.slots.next(slots));
    } else {
      this.slots.next([]);
    }
  }

  updateContingents(user?: BaseUser, room?: BaseRoom, date?: Date) {
    date = date ? date : this.formControls.date.value;
    room = room ? room : this.formControls.room.value;
    user = user ? user : this.formControls.user.value;

    if (!user) {
      return;
    }

    this.contingentsLeft = [];
    this.userService.getContingents(user.id, room?.id, date).pipe(
      tap(contingents => {
        this.rooms = contingents.flatMap(c => {
          c.rooms.forEach(r => this.contingentsLeft[r.id] = this.contingentsLeft[r.id] ? (this.contingentsLeft[r.id] + c.left) : c.left);
          return c.rooms;
        }).distinctBy(r => r.id);
        this.updateRoomField();
      })
    ).subscribe(it => this.contingents = it);
  }

  displayUser(user: BaseUser): string {
    return user ? `${user.givenName}` : '';
  }

  filterUsersBy(value: string): BaseUser[] {
    return this.users ? this.users.filter(user => this.displayUser(user).toLowerCase().includes(value.toLowerCase())) : [];
  }

  displayRoom(room: BaseRoom): string {
    return room ? `${room.number} ${room.name}` : '';
  }

  filterRoomBy(value: string): BaseRoom[] {
    return this.rooms ? this.rooms.filter(room => this.displayRoom(room).toLowerCase().includes(value.toLowerCase())) : [];
  }

  getDefaultValue(): SimpleReservation {
    const now = new Date(Date.now());
    return {
      user: null,
      room: null,
      title: '',
      start: now,
      end: now.plusMinutes(45)
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
      slot: [null, Validators.required]
    });
  }

  onNewUserSelected(user: BaseUser) {
    this.updateContingents(user);
    // this.reservationService.getSimpleByUser(user.id).subscribe(reservations => this.reservations = reservations);

    // this.aboService.getSimpleByUser(user.id).pipe(
    // tap(abos => this.abos = abos),
    // tap(abos => this.rooms = abos.flatMap(it => it.rooms).distinctBy(room => room.id)),
    // tap(abos => this.updateRoomField()),
    // tap(users => {
    //   const initialRoom = this.rooms.find(it => it.id === this.initialRoomId);
    //   if (initialRoom) {
    //     this.formControls.room.setValue(initialRoom);
    //   }
    // })
    // ).subscribe(abos => {
    // this.reGenerateContingents();
    // this.recalculateMeta();
    // });
  }

  onNoRoomSelected() {
    this.updateSlots(null, null);
  }

  onNewRoomSelected(event: MatAutocompleteSelectedEvent) {
    // this.updateContingents(null, event.option.value);
    this.updateSlots(event.option.value);
  }

  onNewDateSelected(event: MatDatepickerInputEvent<unknown>) {
    const value = event.value ? (event.value as Moment).toDate() : null;
    this.updateContingents(null, null, value);
    this.updateSlots(null, value);
  }

  getAvailableContingentFor(room: BaseRoom): number {
    return this.contingentsLeft[room.id];
  }

  private setInitialUser() {
    if (!this.users) {
      return;
    }
    const initialUser = this.users.find(it => it.id === this.initialUserId);
    if (initialUser) {
      this.formControls.user.setValue(initialUser);
      this.onNewUserSelected(initialUser);
    }
  }

  // reGenerateContingents() {
  //   this.availableContingents = [];
  //   this.rooms.forEach(room => {
  //     const now = new Date(Date.now());
  //     this.availableContingents[room.id] =
  //       this.getContingentFor(room, now) - this.getUsedContingentFor(room, now);
  //   });
  // }

  // recalculateMeta(startRaw?, endRaw?) {
  //   const room = this.formControls.room.value;
  //   this.contingentBefore = room ? this.getAvailableContingentFor(room) : 0;
  //
  //   startRaw = startRaw ? startRaw : this.formControls.start.value;
  //   endRaw = endRaw ? endRaw : this.formControls.start.value;
  //
  //   const date = new Date(this.formControls.date.value);
  //   const start = new Date(date.setHours(startRaw ? startRaw.split(':')[0] : 0, startRaw ? startRaw.split(':')[1] : 0));
  //   const end = new Date(date.setHours(endRaw ? endRaw.split(':')[0] : 0, endRaw ? endRaw.split(':')[1] : 0));
  //   this.contingentConsumed = start.diffInMinutes(end);
  //
  //   this.contingentAfter = this.contingentBefore - this.contingentConsumed;
  //
  //   if (this.contingentAfter < 0) {
  //     this.formControls.end.setErrors({missing_contingent: true});
  //   } else {
  //     this.formControls.end.setErrors({missing_contingent: false});
  //   }
  // }

  // private getUsedContingentFor(room: BaseRoom, now: Date) {
  //   return this.reservations
  //     ? this.reservations
  //       .filter(it => it.room.id === room.id)
  //       .filter(it => new Date(it.start).isAfter(now.getMonday()) && new Date(it.end).isBefore(now.getSunday()))
  //       .sumBy(it => new Date(it.end).diffInMinutes(it.start))
  //     : 0;
  // }
  //
  // private getContingentFor(room: BaseRoom, now: Date) {
  //   return this.abos
  //     ? this.abos
  //       .filter(it => it.rooms.find(r => r.id === room.id))
  //       .filter(it => new Date(it.start).isBefore(now) && new Date(it.end).isAfter(now))
  //       .sumBy(abo => abo.contingent)
  //     : 0;
  // }

  private updateRoomField() {
    if (!this.formControls.room.value || !this.rooms.find(r => r.id === this.formControls.room.value.id)) {
      const initialRoom = this.rooms.find(it => it.id === this.initialRoomId);
      if (initialRoom) {
        this.formControls.room.setValue(initialRoom);
      } else {
        this.formControls.room.setValue('');
      }
    }
  }

}
