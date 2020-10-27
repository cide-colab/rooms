import {Component, OnDestroy, OnInit} from '@angular/core';
import {ReservationService} from '../../../services/reservation/reservation.service';
import {PermissionService} from '../../../services/permission/permission.service';
import {ToolbarService} from '../../../services/toolbar/toolbar.service';
import {Router} from '@angular/router';
import {RichReservation} from '../../../core/models/reservation.model';
import {Observable, Subject} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {AclAction, AclClassAlias} from '../../../models/acl-entry.model';
import {build} from '../../../utils/global.extensions';
import {EagerSubject} from '../../../utils/EagerSubject';

@Component({
  selector: 'component-reservation-list-page',
  templateUrl: './reservation-list-page.component.html',
  styleUrls: ['./reservation-list-page.component.scss']
})
export class ReservationListPageComponent implements OnInit, OnDestroy {

  constructor(
    private readonly reservationService: ReservationService,
    private readonly permissionService: PermissionService,
    private readonly toolbarService: ToolbarService,
    private readonly router: Router
  ) {
  }

  filteredItems = new EagerSubject<RichReservation[]>([]);
  canCreate: Observable<boolean>;

  ngOnInit(): void {
    this.reservationService.getAll().pipe(
      switchMap(items => this.toolbarService.getFilterQuery().pipe(
        map(q => build({items, q}))
      ))
    ).subscribe(result => {
      this.filteredItems.next(result.items.filter(item => [
        item.title, item.description, item.room.name, item.room.number, item.user.principal,
        item.user.familyName, item.user.givenName, item.abo.title
      ].join(' ').toLowerCase().includes(result.q.toLowerCase())
      ));
    });

    this.toolbarService.enableSearch(true);
    this.toolbarService.setPageTitle('Buchungen');

    this.canCreate = this.permissionService.hasPermission({
      target: AclClassAlias.reservation,
      action: AclAction.CREATE
    });
  }

  click(item: RichReservation) {
    this.router.navigate(['reservations', item.id]).then();
  }

  create() {
    this.router.navigate(['reservations', 'create']).then();
  }

  ngOnDestroy(): void {
    this.toolbarService.enableSearch(false);
    this.toolbarService.clearPageTitle();
  }

}
