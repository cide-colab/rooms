import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DetailedAbo, SimpleAbo} from '../../models/abo.model';
import {AppValidators} from '../../app.validator';
import {UserService} from '../../services/user/user.service';
import {Observable, Subject} from 'rxjs';
import {BaseUser} from '../../models/user.model';
import {SimpleRoom} from '../../models/room.model';
import {RoomService} from '../../services/room/room.service';
import {debounceTime, map, tap} from 'rxjs/operators';
import {SessionService} from '../../services/session/session.service';
import {TRANSLATION_KEYS} from '../../../app.translation-tree';
import {Semester} from '../../app.utils';

@Component({
  selector: 'component-abo-form',
  templateUrl: './abo-form.component.html',
  styleUrls: ['./abo-form.component.scss']
})
export class AboFormComponent implements OnInit {

  @Input()
  value: DetailedAbo = this.getDefaultValue();

  TRANSLATION_KEYS = TRANSLATION_KEYS;

  @Output()
  onSubmit: EventEmitter<DetailedAbo> = new EventEmitter<DetailedAbo>();

  formGroup: FormGroup;
  isLocked = false;

  users: BaseUser[];
  filteredUsers: Observable<BaseUser[]>;

  rooms: SimpleRoom[];
  filteredRooms = new Subject<SimpleRoom[]>();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly roomService: RoomService,
    private readonly sessionService: SessionService
  ) {
  }

  get formControls() {
    return this.formGroup.controls;
  }

  ngOnInit(): void {
    this.reset();
    this.userService.getAll().subscribe(users => this.users = users);

    this.filteredUsers = this.formControls.detailGroup.get('user').valueChanges.pipe(
      debounceTime(200),
      map(value => typeof value === 'string' ? value : this.displayUser(value)),
      map(value => this.filterUsersBy(value))
    );

    this.formControls.roomsGroup.get('query').valueChanges.pipe(
      debounceTime(200)
    ).subscribe(value => this.filterRooms(value));

    this.roomService.getAllWithDepartment().pipe(
      tap(rooms => this.filteredRooms.next(rooms))
    ).subscribe(rooms => this.rooms = rooms);
  }

  isSelected(room: SimpleRoom): boolean {
    return this.formControls.roomsGroup.get('rooms').value?.find(fRoom => fRoom.id === room.id) !== undefined;
  }

  selectRoom(room: SimpleRoom, select: boolean) {
    let values = this.formControls.roomsGroup.get('rooms').value;
    if (select) {
      values = [...values, room];
    } else {
      const index = values?.indexOf(room, 0);
      if (index > -1) {
        values?.splice(index, 1);
      }
    }
    this.formControls.roomsGroup.get('rooms').setValue(values);
  }

  getSelectedRooms(): SimpleRoom[] {
    return this.formControls.roomsGroup.get('rooms').value;
  }

  filterRooms(text: string) {
    this.filteredRooms.next(
      this.rooms
        ? this.rooms.filter(room => this.getRoomFilterString(room).toLowerCase().indexOf(text.toLowerCase()) !== -1)
        : []
    );
  }

  selectAll(rooms: SimpleRoom[], flag: boolean) {
    const selected = this.getSelectedRooms();
    for (const room of rooms) {
      if (flag && selected.indexOf(room) === -1) {
        this.selectRoom(room, true);
      } else if (!flag && selected.indexOf(room) !== -1) {
        this.selectRoom(room, false);
      }
    }
  }

  allSelected(rooms: SimpleRoom[]): boolean {
    const selected = this.getSelectedRooms();
    for (const room of rooms) {
      if (!selected.includes(room)) {
        return false;
      }
    }
    return true;
  }

  getRoomFilterString(room: SimpleRoom): string {
    return `${room.name} ${room.number} ${room.department.name}`;
  }

  displayUser(user: BaseUser): string {
    return user ? `${user.givenName}` : '';
  }

  filterUsersBy(value: string): BaseUser[] {
    return this.users ? this.users.filter(user => this.displayUser(user).toLowerCase().includes(value.toLowerCase())) : [];
  }

  getFormGroup(value: SimpleAbo): FormGroup {
    return this.formBuilder.group({
      detailGroup: this.formBuilder.group({
        start: [value.start, Validators.required],
        end: [value.end],
        contingent: [value.contingent],
        unlimited_end: [value.unlimited_end],
        unlimited_contingent: [value.unlimited_contingent],
        description: [value.description, Validators.maxLength(500)],
        user: [value.user, [Validators.required, AppValidators.requireSelect]],
        title: [value.title, [Validators.required, Validators.maxLength(25)]]
      }),
      roomsGroup: this.formBuilder.group({
        query: [''],
        rooms: [value.rooms ? value.rooms : [], Validators.required]
      })
    });
  }

  getDefaultValue(): DetailedAbo {
    return {
      start: new Date(Date.now()),
      end: Semester.current().getEndOfSemester(),
      contingent: 120,
      unlimited_end: false,
      unlimited_contingent: false,
      description: '',
      user: null,
      rooms: [],
      reservations: [],
      title: ''
    };
  }

  lock() {
    this.isLocked = true;
  }

  unlock() {
    this.isLocked = false;
  }

  reset() {
    this.formGroup = this.getFormGroup(this.value);
  }

  hasChanges(): boolean {
    return JSON.stringify(this.formGroup.value) !== JSON.stringify(this.getFormGroup(this.value).value);
  }

  submit() {
    if (this.isLocked) {
      return;
    }
    this.lock();
    if (this.formGroup.invalid) {
      this.unlock();
      return;
    }
    const mergedValue = {
      ...this.value,
      ...this.formControls.detailGroup.value,
      ...this.formControls.roomsGroup.value,
    };

    this.onSubmit.emit(mergedValue);
    this.unlock();
  }

}
