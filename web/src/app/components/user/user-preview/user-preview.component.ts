import {Component, Input, OnInit} from '@angular/core';
import {SessionUser} from '../../../models/user.model';
import {UserService} from '../../../services/user/user.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'component-user-preview',
  templateUrl: './user-preview.component.html',
  styleUrls: ['./user-preview.component.scss']
})
export class UserPreviewComponent implements OnInit {

  @Input()
  public userId: string;
  public user: Observable<SessionUser>;

  constructor(private readonly userService: UserService) {
  }

  ngOnInit(): void {
    if (this.userId) {
      this.user = this.userService.getBase(this.userId);
    }
  }

}
