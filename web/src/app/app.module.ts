import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {RoutingModule} from './routing.module';
import {AppComponent} from './app.component';
import {SidenavComponent} from './components/fragments/sidenav/sidenav.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {SidenavService} from './services/sidenav/sidenav.service';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import {SessionService} from './services/session/session.service';
import {BackendService} from './services/backend/backend.service';
import {MatListModule} from '@angular/material/list';
import {keycloakInitializer} from './app.init';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {DepartmentService} from './services/department/department.service';
import {DateAdapter, MatRippleModule} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {SnackbarService} from './services/snackbar/snackbar.service';
import {RoomService} from './services/room/room.service';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {QRCodeModule} from 'angularx-qrcode';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {AboService} from './services/abo/abo.service';
import {UserService} from './services/user/user.service';
import {ReservationService} from './services/reservation/reservation.service';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {MatRadioModule} from '@angular/material/radio';
import {TimeZoneDatePipe, TimezoneService} from './services/timezone/timezone.service';
import {MatSliderModule} from '@angular/material/slider';
import { MatGridListModule} from '@angular/material/grid-list';
import {MainMenuComponent} from './components/fragments/main-menu/main-menu.component';
import {ToolbarComponent} from './components/fragments/toolbar/toolbar.component';
import {MatIconModule} from '@angular/material/icon';
import {TokenInterceptor} from './interceptors/token/token.interceptor';
import {RoomListComponent} from './components/fragments/room-list/room-list.component';
import { RoomListItemComponent } from './components/fragments/room-list-item/room-list-item.component';
import { PreviewPipe } from './pipes/preview/preview.pipe';
import { ActionsComponent } from './components/fragments/actions/actions.component';
import {DepartmentListComponent} from './components/fragments/department-list/department-list.component';
import { DepartmentListItemComponent } from './components/fragments/department-list-item/department-list-item.component';
import { DepartmentEditorComponent } from './components/fragments/department-editor/department-editor.component';
import { RoomEditorComponent } from './components/fragments/room-editor/room-editor.component';
import { FormActionsComponent } from './components/fragments/form-actions/form-actions.component';
import {UrlService} from './services/url/url.service';
import {AboListComponent} from './components/fragments/abo-list/abo-list.component';
import { AboListItemComponent } from './components/fragments/abo-list-item/abo-list-item.component';
import { UserListItemComponent } from './components/fragments/user-list-item/user-list-item.component';
import { UserListComponent } from './components/fragments/user-list/user-list.component';
import {AboEditorComponent} from './components/fragments/abo-editor/abo-editor.component';
import {MatChipsModule} from '@angular/material/chips';
import {ConfirmDialog} from './components/dialogs/confirm-dialog/confirm-dialog.component';
import {MainPageComponent} from './components/pages/main-page/main-page.component';
import {QrDialog} from './components/dialogs/qr-dialog/qr-dialog.component';
import {RoomPageComponent} from './components/pages/room-page/room-page.component';
import {DepartmentPageComponent} from './components/pages/department-page/department-page.component';
import {RoomCreatePageComponent} from './components/pages/room-create-page/room-create-page.component';
import {DepartmentUpdatePageComponent} from './components/pages/department-update-page/department-update-page.component';
import {RoomUpdatePageComponent} from './components/pages/room-update-page/room-update-page.component';
import {DepartmentCreatePageComponent} from './components/pages/department-create-page/department-create-page.component';
import {AboCreatePageComponent} from './components/pages/abo-create-page/abo-create-page.component';
import {AboPageComponent} from './components/pages/abo-page/abo-page.component';
import {UserPageComponent} from './components/pages/user-page/user-page.component';
import {AboUpdatePageComponent} from './components/pages/abo-update-page/abo-update-page.component';
import {DepartmentListPageComponent} from './components/pages/department-list-page/department-list-page.component';
import {RoomListPageComponent} from './components/pages/room-list-page/room-list-page.component';
import {AboListPageComponent} from './components/pages/abo-list-page/abo-list-page.component';
import {AboListMePageComponent} from './components/pages/abo-list-me-page/abo-list-me-page.component';
import {UserListPageComponent} from './components/pages/user-list-page/user-list-page.component';
import { ReservationListPageComponent } from './components/pages/reservation-list-page/reservation-list-page.component';
import { ReservationPageComponent } from './components/pages/reservation-page/reservation-page.component';
import { ReservationListMePageComponent } from './components/pages/reservation-list-me-page/reservation-list-me-page.component';
import { ReservationCreatePageComponent } from './components/pages/reservation-create-page/reservation-create-page.component';
import { ReservationUpdatePageComponent } from './components/pages/reservation-update-page/reservation-update-page.component';
import { ReservationListItemComponent } from './components/fragments/reservation-list-item/reservation-list-item.component';
import { ReservationEditorComponent } from './components/fragments/reservation-editor/reservation-editor.component';
import {ReservationListComponent} from './components/fragments/reservation-list/reservation-list.component';

// import localeDe from '@angular/common/locales/de';
// import localeDeExtra from '@angular/common/locales/extra/de';
// import {registerLocaleData} from '@angular/common';
// import {I18n} from '@ngx-translate/i18n-polyfill';
// https://medium.com/i18n-and-l10n-resources-for-developers/angular-translation-a-closer-look-at-angular-8-fdf688f3c44a
// https://blog.angulartraining.com/how-to-internationalize-i18n-your-angular-application-tutorial-dee2c6984bc1

// the second parameter 'fr-FR' is optional
// registerLocaleData(localeDe, 'de-DE', localeDeExtra);

// https://www.codeandweb.com/babeledit/tutorials/how-to-translate-your-angular8-app-with-ngx-translate

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    ToolbarComponent,
    ConfirmDialog,
    QrDialog,
    TimeZoneDatePipe,
    AboListComponent,
    ReservationListComponent,
    DepartmentListComponent,
    RoomListComponent,
    MainPageComponent,
    MainMenuComponent,
    DepartmentListPageComponent,
    RoomListPageComponent,
    RoomListItemComponent,
    PreviewPipe,
    ActionsComponent,
    DepartmentListItemComponent,
    RoomPageComponent,
    DepartmentPageComponent,
    DepartmentCreatePageComponent,
    DepartmentUpdatePageComponent,
    RoomCreatePageComponent,
    RoomUpdatePageComponent,
    DepartmentEditorComponent,
    RoomEditorComponent,
    FormActionsComponent,
    AboListPageComponent,
    AboCreatePageComponent,
    AboPageComponent,
    AboListMePageComponent,
    AboListItemComponent,
    UserListItemComponent,
    UserPageComponent,
    UserListPageComponent,
    UserListComponent,
    AboEditorComponent,
    AboUpdatePageComponent,
    ReservationListPageComponent,
    ReservationPageComponent,
    ReservationListMePageComponent,
    ReservationCreatePageComponent,
    ReservationUpdatePageComponent,
    ReservationListItemComponent,
    ReservationEditorComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    KeycloakAngularModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    QRCodeModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatCardModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSliderModule,
    MatGridListModule,
    MatIconModule,
    MatChipsModule,
    NgxMaterialTimepickerModule.setLocale('de-DE')
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: keycloakInitializer,
      multi: true,
      deps: [KeycloakService]
    },
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    // {provide: MAT_DATE_LOCALE, useValue: 'de-DE'},
    {
      provide: DateAdapter, useClass: TimezoneService
    },
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    // {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    // {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    // I18n,
    // {provide: TRANSLATIONS, useValue: translations},
    // {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'},
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    SidenavService,
    UrlService,
    BackendService,
    SessionService,
    DepartmentService,
    SnackbarService,
    RoomService,
    AboService,
    UserService,
    ReservationService,
    TimeZoneDatePipe,
    TimezoneService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
