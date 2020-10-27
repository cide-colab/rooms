import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {EditorComponent} from '../../abstracts/editor.component';
import {RichRoom} from '../../../core/models/room.model';
import {AboForm} from '../../../core/models/abo.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {RichUser} from '../../../core/models/user.model';
import {UserService} from '../../../services/user/user.service';
import {RoomService} from '../../../services/room/room.service';
import {AclAction} from '../../../models/acl-entry.model';
import {debounceTime, map, switchMap} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {Semester} from '../../../models/semester.model';

@Component({
  selector: 'component-abo-editor',
  templateUrl: './abo-editor.component.html',
  styleUrls: ['./abo-editor.component.scss']
})
export class AboEditorComponent extends EditorComponent<AboForm> implements OnInit {

  @Input()
  default: AboForm = {
    user: undefined,
    id: undefined,
    title: '',
    description: '',
    contingent: 120,
    start: new Date(Date.now()).toISOString(),
    end: Semester.current().getEndOfSemester().toISOString(),
    rooms: [],
    unlimited_contingent: false,
    unlimited_end: false
  };

  @ViewChild('roomInput') roomInput: ElementRef<HTMLInputElement>;

  formGroup: FormGroup;

  roomQuery: FormControl;

  filteredUsers: Observable<RichUser[]>;
  filteredRooms: Observable<RichRoom[]>;

  constructor(
    private readonly builder: FormBuilder,
    private readonly userService: UserService,
    private readonly roomService: RoomService,
  ) {
    super();
  }

  ngOnInit(): void {

    this.roomQuery = this.builder.control('');

    this.formGroup = this.builder.group({
      id: [{value: this.default.id, disabled: true}],
      start: [this.default.start, Validators.required],
      end: [this.default.end],
      title: [this.default.title, Validators.required],
      user: [this.default.user, Validators.required],
      rooms: [this.default.rooms],
      description: [this.default.description, Validators.maxLength(512)],
      unlimited_end: [this.default.unlimited_end],
      unlimited_contingent: [this.default.unlimited_contingent],
      contingent: [this.default.contingent, Validators.min(0)]
    });

    this.filteredUsers = this.userService.getAllByAclAction(AclAction.ADMINISTRATE).pipe(
      switchMap(users => this.formGroup.controls.user.valueChanges.pipe(
        debounceTime(200),
        map(value => typeof value === 'string' ? value : this.displayUser(value)),
        map(query => users.filter(user => this.filterUser(user, query)))
      ))
    );

    this.filteredRooms = this.roomService.getAllByAclAction(AclAction.UPDATE).pipe(
      switchMap(rooms => this.roomQuery.valueChanges.pipe(
        debounceTime(200),
        map(value => typeof value === 'string' ? value : this.displayRoom(value)),
        map(query => rooms.filter(room => this.filterRoom(room, query)))
      ))
    );
  }

  displayUser(user: RichUser): string {
    return user ? `${user.givenName}` : '';
  }

  private filterUser(user: RichUser, query: string) {
    return this.displayUser(user).toLowerCase().includes(query.toLowerCase());
  }

  displayRoom(room: RichRoom): string {
    if (!room) {
      return '';
    }
    return `${room.name} ${room.number} ${room.department.name}`;
  }

  private filterRoom(room: RichRoom, query: string) {
    return this.displayRoom(room).toLowerCase().includes(query.toLowerCase());
  }

  selectRoom(event: MatAutocompleteSelectedEvent) {
    this.formGroup.get('rooms').value.push(event.option.value);
    this.roomInput.nativeElement.value = '';
  }

  removeRoom(room: RichRoom) {
    const index = this.formGroup.get('rooms').value.indexOf(room, 0);
    if (index > -1) {
      this.formGroup.get('rooms').value.splice(index, 1);
    }
  }
}
