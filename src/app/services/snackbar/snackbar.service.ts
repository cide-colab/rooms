import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import {MatSnackBarConfig} from '@angular/material/snack-bar/snack-bar-config';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private readonly translateService: TranslateService,
    private readonly snackBar: MatSnackBar
  ) {
  }

  async openAsync(translationKey: string, interpolateParams?: any, action?: string, options?: MatSnackBarConfig)
    : Promise<MatSnackBarRef<any>> {
    const message = await this.translateService.get(translationKey, interpolateParams).toPromise();
    return this.snackBar.open(message, action, {
      duration: 2000,
      ...options
    });
  }

  open(translationKey: string, interpolateParams?: any, action?: string, options?: MatSnackBarConfig) {
    this.openAsync(translationKey, interpolateParams, action, options).then();
  }
}
