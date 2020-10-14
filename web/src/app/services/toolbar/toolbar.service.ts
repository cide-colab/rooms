import {Injectable} from '@angular/core';
import {deleteElement} from '../../utils/ArrayUtils';
import {Observable, Subject} from 'rxjs';
import {EagerSubject} from '../../utils/EagerSubject';

export interface ToolbarButton {
  icon: string;
  title: string;
  click: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  private globalButtons = new Map<string, ToolbarButton>();
  private pageButtons = new Map<string, ToolbarButton>();
  private buttons = new EagerSubject<ToolbarButton[]>([]);

  private filterQuery = new EagerSubject<string>('');
  private filterCollapsed = new EagerSubject<boolean>(false);
  private filterEnabled = new EagerSubject<boolean>(false);

  private pageTitle = '';
  private globalTitle = '';
  private title = new EagerSubject<string>('');

  constructor() {
  }

  public enableSearch(flag: boolean) {
    this.filterEnabled.next(flag);
  }

  public collapseSearch(flag: boolean) {
    this.filterCollapsed.next(flag);
  }

  public toggleSearch() {
    this.filterCollapsed.next(!this.filterCollapsed.value);
  }

  public filter(query: string) {
    this.filterQuery.next(query);
  }

  public getFilterQuery(): Observable<string> {
    return this.filterQuery;
  }

  public getFilterCollapsed(): Observable<boolean> {
    return this.filterCollapsed;
  }

  public getFilterEnabled(): Observable<boolean> {
    return this.filterEnabled;
  }

  public setGlobalTitle(title: string) {
    this.globalTitle = title;
    this.notifyTitleChanged();
  }

  public setPageTitle(title: string) {
    this.pageTitle = title;
    this.notifyTitleChanged();
  }

  public clearPageTitle() {
    this.pageTitle = '';
    this.notifyTitleChanged();
  }

  public getTitle(): Observable<string> {
    return this.title;
  }

  public addGlobalButton(key: string, button: ToolbarButton) {
    this.globalButtons.set(key, button);
    this.notifyButtonsChanged();
  }

  public removeGlobalButton(key: string) {
    this.globalButtons.delete(key);
    this.notifyButtonsChanged();
  }

  public removePageButton(key: string) {
    this.pageButtons.delete(key);
    this.notifyButtonsChanged();
  }

  public addPageButton(key: string, button: ToolbarButton) {
    this.pageButtons.set(key, button);
    this.notifyButtonsChanged();
  }

  public clearPageButtons() {
    this.pageButtons.clear();
    this.notifyButtonsChanged();
  }

  public clearGlobalButtons() {
    this.globalButtons.clear();
    this.notifyButtonsChanged();
  }

  public clearPage() {
    this.clearPageButtons();
    this.clearPageTitle();
  }

  getButtons(): Observable<ToolbarButton[]> {
    return this.buttons;
  }

  private notifyButtonsChanged() {
    this.buttons.next([...this.globalButtons.values(), ...this.pageButtons.values()]);
  }

  private notifyTitleChanged() {
    this.title.next(`${this.globalTitle}${this.pageTitle !== '' ? '-' : ''}${this.pageTitle}`);
  }
}
