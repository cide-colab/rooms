import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SidenavService} from '../../services/sidenav/sidenav.service';
import {MatDrawer} from '@angular/material/sidenav';
import {SessionService} from '../../services/session/session.service';
import {Session} from '../../models/session.model';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {TRANSLATION_KEYS} from '../../../app.translation-tree';
import {take} from 'rxjs/operators';

enum NavEvent {
  LINK,
  LOGIN,
  LOGOUT
}

interface NavItem {
  title: string;
  iconClass: string;
  href: string;
  event: NavEvent;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

@Component({
  selector: 'component-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, AfterViewInit {

  constructor(
    private readonly sidenavService: SidenavService,
    private readonly sessionService: SessionService,
    private readonly router: Router,
    private readonly translate: TranslateService
  ) {
  }

  @ViewChild(MatDrawer)
  public drawer: MatDrawer;
  session: Session;
  nav: NavGroup[];

  async ngOnInit() {
    // this.session = await this.sessionService.getSession(true).pipe(take(1)).toPromise();
    // this.nav = [
    //   await this.getGeneralNavGroup(this.session),
    //   await this.getAdministrationNavGroup(this.session),
    //   await this.getUserNavGroup(this.session),
    //   await this.getOthersNavGroup(this.session)
    // ].filter(group => group && group.items.length > 0);
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
  //       iconClass: 'icon-vpn_key',
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
  //       iconClass: 'icon-timer',
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
  //       iconClass: 'icon-timer',
  //       href: `/my/abos`,
  //       event: NavEvent.LINK
  //     });
  //     itemList.push({
  //       title: await this.translate.get(TRANSLATION_KEYS.nav.link.my_reservations).toPromise(),
  //       iconClass: 'icon-calendar_today',
  //       href: `/my/reservations`,
  //       event: NavEvent.LINK
  //     });
  //     itemList.push({
  //       title: await this.translate.get(TRANSLATION_KEYS.nav.link.logout).toPromise(),
  //       iconClass: 'icon-logout',
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
  //       iconClass: 'icon-help',
  //       href: '#',
  //       event: NavEvent.LINK
  //     },
  //     {
  //       title: await this.translate.get(TRANSLATION_KEYS.nav.link.settings).toPromise(),
  //       iconClass: 'icon-settings',
  //       href: '#',
  //       event: NavEvent.LINK
  //     }
  //   ];
  //
  //   if (!session.userId) {
  //     itemList.push({
  //       title: await this.translate.get(TRANSLATION_KEYS.nav.link.login).toPromise(),
  //       iconClass: 'icon-exit_to_app',
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
  //       iconClass: 'icon-meeting_room',
  //       href: '/rooms',
  //       event: NavEvent.LINK
  //     },
  //     {
  //       title: await this.translate.get(TRANSLATION_KEYS.nav.link.departments).toPromise(),
  //       iconClass: 'icon-home',
  //       href: '/departments',
  //       event: NavEvent.LINK
  //     },
  //   ];
  //   return {
  //     title: await this.translate.get(TRANSLATION_KEYS.nav.group.general).toPromise(),
  //     items: itemList
  //   };
  // }
  //
  ngAfterViewInit(): void {
  //   this.sidenavService.setDrawer(this.drawer);
  }
  //
  // closeSidenav() {
  //   this.drawer.close();
  // }
  //
  // onNavItemClicked(item: NavItem) {
  //   switch (item.event) {
  //     case NavEvent.LOGIN:
  //       this.sessionService.login();
  //       break;
  //     case NavEvent.LINK:
  //       this.router.navigate([item.href]);
  //       break;
  //     case NavEvent.LOGOUT:
  //       this.sessionService.logout();
  //       break;
  //   }
  //   this.closeSidenav();
  // }

}


