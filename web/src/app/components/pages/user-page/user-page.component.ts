import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../../services/user/user.service';
import {ToolbarService} from '../../../services/toolbar/toolbar.service';
import {map, switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {RichUser} from '../../../core/models/user.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'component-user',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit, OnDestroy {

  user: Observable<RichUser>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly userService: UserService,
    private readonly toolbarService: ToolbarService
  ) { }

  ngOnInit(): void {
    this.user = this.route.params.pipe(
      map(params => params.id),
      switchMap(id => this.userService.get(id)),
      tap( department => this.toolbarService.setPageTitle(`Nutzer ${department.principal}`))
    );
  }

  ngOnDestroy(): void {
    this.toolbarService.clearPage();
  }

}
