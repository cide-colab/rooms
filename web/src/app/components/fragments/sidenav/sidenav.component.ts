import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SidenavService} from '../../../services/sidenav/sidenav.service';
import {MatDrawer} from '@angular/material/sidenav';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {PermissionService} from '../../../services/permission/permission.service';
import {AclAction, AclClassAlias} from '../../../models/acl-entry.model';
import {forkJoin, from, Observable, Subject} from 'rxjs';
import {User} from '../../../core/models/user.model';
import {UserService} from '../../../services/user/user.service';
import {KeycloakService} from 'keycloak-angular';
import {build} from '../../../utils/global.extensions';

enum NavEvent {
  LINK,
  LOGIN,
  LOGOUT
}

interface NavItem {
  title: string;
  iconClass: string;
  href: string;
  enabled: boolean;
  event: NavEvent;
}

interface NavGroup {
  title: string;
  items: NavItem[];
  enabled: boolean;
}

@Component({
  selector: 'component-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, AfterViewInit {

  constructor(
    private readonly sidenavService: SidenavService,
    private readonly permissionService: PermissionService,
    private readonly userService: UserService,
    private readonly keycloakService: KeycloakService,
    private readonly router: Router
  ) {
  }

  @ViewChild(MatDrawer)
  public drawer: MatDrawer;

  groups = new Subject<NavGroup[]>();
  user: Observable<User>;

  async ngOnInit() {
    this.user = this.userService.getMe();
    this.updateNavItems();
  }

  private updateNavItems() {
    forkJoin([
      this.getGeneralGroup(),
      this.getAdminGroup(),
      this.getSessionGroup()
    ]).subscribe(groups => this.groups.next(groups));
  }

  private getGeneralGroup(): Observable<NavGroup> {
    return forkJoin([
      this.permissionService
        .hasPermission({target: AclClassAlias.room, action: AclAction.READ})
        .pipe(map(enabled => build({
          title: 'Räume',
          iconClass: 'icon-meeting_room',
          enabled,
          href: '/rooms',
          event: NavEvent.LINK
        }))),
      this.permissionService
        .hasPermission({target: AclClassAlias.department, action: AclAction.READ})
        .pipe(map(enabled => build({
          title: 'Abteilungen',
          iconClass: 'icon-home',
          enabled,
          href: '/departments',
          event: NavEvent.LINK
        })))
    ]).pipe(map(items => build({title: 'Allgemein', items, enabled: items.filter(i => i.enabled).length > 0})));
  }

  private getSessionGroup(): Observable<NavGroup> {
    return from(this.keycloakService.isLoggedIn()).pipe(
      map(loggedIn => build([
        {
          title: 'Meine Abos',
          iconClass: 'icon-timer',
          enabled: loggedIn,
          href: '/my/abos',
          event: NavEvent.LINK
        },
        {
          title: 'Meine Buchungen',
          iconClass: 'icon-calendar_today',
          enabled: loggedIn,
          href: '/my/reservations',
          event: NavEvent.LINK
        },
        {
          title: 'Anmelden',
          iconClass: 'icon-exit_to_app',
          enabled: !loggedIn,
          href: '#',
          event: NavEvent.LOGIN
        },
        {
          title: 'Abmelden',
          iconClass: 'icon-logout',
          enabled: loggedIn,
          href: '#',
          event: NavEvent.LOGOUT
        }
      ])),
      map(items => build({title: 'Nutzer', items, enabled: items.filter(i => i.enabled).length > 0}))
    );
  }

  private getAdminGroup(): Observable<NavGroup> {
    return forkJoin([
      this.permissionService
        .hasPermission({target: AclClassAlias.abo, action: AclAction.ADMINISTRATE})
        .pipe(map(enabled => build({
          title: 'Abos',
          iconClass: 'icon-timer',
          enabled,
          href: '/abos',
          event: NavEvent.LINK
        }))),

      this.permissionService
        .hasPermission({target: AclClassAlias.user, action: AclAction.ADMINISTRATE})
        .pipe(map(enabled => build({
          title: 'Users',
          iconClass: 'icon-person',
          enabled,
          href: '/users',
          event: NavEvent.LINK
        }))),

      this.permissionService
        .hasPermission({target: AclClassAlias.reservation, action: AclAction.ADMINISTRATE})
        .pipe(map(enabled => build({
          title: 'Buchungen',
          iconClass: 'icon-calendar_today',
          enabled,
          href: '/reservations',
          event: NavEvent.LINK
        })))
    ]).pipe(map(items => build({title: 'Administration', items, enabled: items.filter(i => i.enabled).length > 0})));
  }


  // private async getAdministrationNavGroup(session: Session): Promise<NavGroup> {
  //   const itemList = [];
  //   if (session.acl.find(entry =>
  //     entry.permission === 'create:role' ||
  //     (entry.type === 'Role' && entry.permission === 'udapte') ||
  //     (entry.type === 'Role' && entry.permission === 'delete')
  //   )) {
  //     itemList.push({
  //       title: await this.translate.get(TRANSLATION_KEYS.nav.link.roles).toPromise(),
  //       iconClass: 'iconClass-vpn_key',
  //       href: '#',
  //       event: NavEvent.LINK
  //     });
  //   }
  //   if (session.acl.find(entry =>
  //     entry.permission === 'create:abo' ||
  //     (entry.type === 'Abo' && entry.permission === 'update') ||
  //     (entry.type === 'Abo' && entry.permission === 'delete')
  //   )) {
  //     itemList.push({
  //       title: await this.translate.get(TRANSLATION_KEYS.nav.link.abos).toPromise(),
  //       iconClass: 'iconClass-timer',
  //       href: '/abos',
  //       event: NavEvent.LINK
  //     });
  //   }
  //
  //   return {
  //     title: await this.translate.get(TRANSLATION_KEYS.nav.group.administration).toPromise(),
  //     items: itemList
  //   };
  // }
  //
  // private async getUserNavGroup(session: Session): Promise<NavGroup> {
  //   const itemList = [];
  //   if (session.userId) {
  //     itemList.push({
  //       title: await this.translate.get(TRANSLATION_KEYS.nav.link.my_abos).toPromise(),
  //       iconClass: 'iconClass-timer',
  //       href: `/my/abos`,
  //       event: NavEvent.LINK
  //     });
  //     itemList.push({
  //       title: await this.translate.get(TRANSLATION_KEYS.nav.link.my_reservations).toPromise(),
  //       iconClass: 'iconClass-calendar_today',
  //       href: `/my/reservations`,
  //       event: NavEvent.LINK
  //     });
  //     itemList.push({
  //       title: await this.translate.get(TRANSLATION_KEYS.nav.link.logout).toPromise(),
  //       iconClass: 'iconClass-logout',
  //       href: '#',
  //       event: NavEvent.LOGOUT
  //     });
  //   }
  //
  //   return {
  //     title: await this.translate.get(TRANSLATION_KEYS.nav.group.user).toPromise(),
  //     items: itemList
  //   };
  // }
  //
  // private async getOthersNavGroup(session: Session): Promise<NavGroup> {
  //   const itemList = [
  //     {
  //       title: await this.translate.get(TRANSLATION_KEYS.nav.link.help).toPromise(),
  //       iconClass: 'iconClass-help',
  //       href: '#',
  //       event: NavEvent.LINK
  //     },
  //     {
  //       title: await this.translate.get(TRANSLATION_KEYS.nav.link.settings).toPromise(),
  //       iconClass: 'iconClass-settings',
  //       href: '#',
  //       event: NavEvent.LINK
  //     }
  //   ];
  //
  //   if (!session.userId) {
  //     itemList.push({
  //       title: await this.translate.get(TRANSLATION_KEYS.nav.link.login).toPromise(),
  //       iconClass: 'iconClass-exit_to_app',
  //       href: '#',
  //       event: NavEvent.LOGIN
  //     });
  //   }
  //
  //   return {
  //     title: undefined,
  //     items: itemList
  //   };
  // }
  //
  // private async getGeneralNavGroup(session: Session): Promise<NavGroup> {
  //   const itemList = [
  //     {
  //       title: await this.translate.get(TRANSLATION_KEYS.nav.link.rooms).toPromise(),
  //       iconClass: 'iconClass-meeting_room',
  //       href: '/rooms',
  //       event: NavEvent.LINK
  //     },
  //     {
  //       title: await this.translate.get(TRANSLATION_KEYS.nav.link.departments).toPromise(),
  //       iconClass: 'iconClass-home',
  //       href: '/departments',
  //       event: NavEvent.LINK
  //     },
  //   ];
  //   return {
  //     title: await this.translate.get(TRANSLATION_KEYS.nav.group.general).toPromise(),
  //     items: itemList
  //   };
  // }

  ngAfterViewInit(): void {
    this.sidenavService.setDrawer(this.drawer);
  }

  closeSidenav() {
    this.drawer.close().then();
  }

  onNavItemClicked(item: NavItem) {
    switch (item.event) {
      case NavEvent.LOGIN:
        this.keycloakService.login().then(r => console.log(r));
        break;
      case NavEvent.LINK:
        this.router.navigate([item.href]).then();
        break;
      case NavEvent.LOGOUT:
        this.keycloakService.logout().then(r => console.log(r));
        break;
    }
    this.closeSidenav();
  }

}


