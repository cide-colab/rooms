import {Component, OnDestroy, OnInit} from '@angular/core';
import {EagerSubject} from '../../../utils/EagerSubject';
import {Observable} from 'rxjs';
import {RichUser} from '../../../core/models/user.model';
import {UserService} from '../../../services/user/user.service';
import {Router} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {build} from '../../../utils/global.extensions';
import {ToolbarService} from '../../../services/toolbar/toolbar.service';

@Component({
  selector: 'component-users',
  templateUrl: './user-list-page.component.html',
  styleUrls: ['./user-list-page.component.scss']
})
export class UserListPageComponent implements OnInit, OnDestroy {

  filteredItems = new EagerSubject<RichUser[]>([]);
  canCreate: Observable<boolean>;

  constructor(
    private readonly userService: UserService,
    private readonly toolbarService: ToolbarService,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    this.userService.getAll().pipe(
      switchMap(items => this.toolbarService.getFilterQuery().pipe(
        map(q => build({items, q}))
      ))
    ).subscribe(result => {
      this.filteredItems.next(result.items.filter(item =>
        `${item.principal} ${item.givenName} ${item.familyName}`
          .toLowerCase()
          .includes(result.q.toLowerCase())
      ));
    });

    this.toolbarService.enableSearch(true);
    this.toolbarService.setPageTitle('Nutzer');
  }

  click(item: RichUser) {
    this.router.navigate(['users', item.id]).then();
  }

  ngOnDestroy(): void {
    this.toolbarService.enableSearch(false);
    this.toolbarService.clearPageTitle();
  }

}
