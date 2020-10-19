import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToolbarButton, ToolbarService} from '../../../services/toolbar/toolbar.service';
import {SessionService} from '../../../services/session/session.service';
import {Observable} from 'rxjs';
import {KeycloakService} from 'keycloak-angular';
import {SidenavService} from '../../../services/sidenav/sidenav.service';

@Component({
  selector: 'component-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(
    private readonly toolbarService: ToolbarService,
    private readonly keycloakService: KeycloakService,
    private readonly navService: SidenavService
  ) {
  }

  ngOnInit(): void {
    this.toolbarService.setGlobalTitle('Rooms');
    this.keycloakService.isLoggedIn().then(loggedIn => {
      if (loggedIn) {
        this.toolbarService.removeGlobalButton('login');
        this.toolbarService.addGlobalButton('logout', {title: 'logout', icon: 'logout', click: () => this.logout()});
      } else {
        this.toolbarService.removeGlobalButton('logout');
        this.toolbarService.addGlobalButton('login', {title: 'login', icon: 'exit_to_app', click: () => this.login()});
      }
    });
  }

  getFilterEnabled(): Observable<boolean> {
    return this.toolbarService.getFilterEnabled();
  }

  getFilterCollapsed(): Observable<boolean> {
    return this.toolbarService.getFilterCollapsed();
  }

  filter(value: string) {
    return this.toolbarService.filter(value);
  }

  getButtons(): Observable<ToolbarButton[]> {
    return this.toolbarService.getButtons();
  }

  getTitle(): Observable<string> {
    return this.toolbarService.getTitle();
  }

  login() {
    this.keycloakService.login().then();
  }

  logout() {
    this.keycloakService.logout().then();
  }

  toggleFilter() {
    this.toolbarService.toggleSearch();
  }

  openNav() {
    this.navService.openSidenav();
  }

}
