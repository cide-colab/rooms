import {Injectable} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  private drawer: MatDrawer;

  constructor() {
  }

  public setDrawer(drawer: MatDrawer) {
    this.drawer = drawer;
  }

  public openSidenav() {
    this.drawer.open();
  }

  public closeSidenav() {
    this.drawer.close();
  }

  public toggleSidenav() {
    this.drawer.toggle();
  }
}
