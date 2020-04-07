import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {RootPage} from './pages/root/root.page';
import {SidenavComponent} from './components/sidenav/sidenav.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {SidenavService} from './services/sidenav/sidenav.service';
import {MainPage} from './pages/main/main.page';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import {SessionService} from './services/session/session.service';
import {BackendService} from './services/backend/backend.service';
import {UserPreviewComponent} from './components/user-preview/user-preview.component';
import {MatListModule} from '@angular/material/list';
import {keycloakInitializer} from './app.init';
import {DepartmentListPage} from './pages/department-list/department-list.page';
import {CreateDepartmentPage} from './pages/create-department/create-department.page';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {DepartmentFormComponent} from './components/department-form/department-form.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {DepartmentService} from './services/department/department.service';
import {DepartmentPreviewCardComponent} from './components/department-list-item/department-preview-card.component';
import {DateAdapter, MatRippleModule} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {DepartmentDetailPage} from './pages/department-detail/department-detail.page';
import {MatDialogModule} from '@angular/material/dialog';
import {SimpleConfirmDialog} from './dialog/simple-confirm/simple-confirm.dialog';
import {EditDepartmentPage} from './pages/edit-department/edit-department.page';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {SnackbarService} from './services/snackbar/snackbar.service';
import {RoomListPage} from './pages/room-list/room-list.page';
import {EditRoomPage} from './pages/edit-room/edit-room.page';
import {CreateRoomPage} from './pages/create-room/create-room.page';
import {RoomDetailPage} from './pages/room-detail/room-detail.page';
import {RoomFormComponent} from './components/room-form/room-form.component';
import {RoomService} from './services/room/room.service';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {RoomPreviewCardComponent} from './components/room-preview-card/room-preview-card.component';
import {QRCodeModule} from 'angularx-qrcode';
import {QrCodeDialog} from './dialog/qr-code/qr-code.dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {AboListPage} from './pages/abo-list/abo-list.page';
import {CreateAboPage} from './pages/create-abo/create-abo.page';
import {EditAboPage} from './pages/edit-abo/edit-abo.page';
import {AboDetailPage} from './pages/abot-detail/abo-detail.page';
import {AboFormComponent} from './components/abo-form/abo-form.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {RoomPreviewSmallComponent} from './components/room-preview-small/room-preview-small.component';
import {AboPreviewCardComponent} from './components/abo-preview-card/abo-preview-card.component';
import {ReservationListPage} from './pages/reservation-list/reservation-list.page';
import {ReservationDetailPage} from './pages/reservation-detail/reservation-detail.page';
import {CreateReservationPage} from './pages/create-reservation/create-reservation.page';
import {EditReservationPage} from './pages/edit-reservation/edit-reservation.page';
import {AboService} from './services/abo/abo.service';
import {UserService} from './services/user/user.service';
import {ReservationService} from './services/reservation/reservation.service';
import {ReservationFormComponent} from './components/reservation-form/reservation-form.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {MatRadioModule} from '@angular/material/radio';
import {TimeZoneDatePipe, TimezoneService} from './services/timezone.service';

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
    RootPage,
    SidenavComponent,
    MainPage,
    UserPreviewComponent,
    DepartmentListPage,
    CreateDepartmentPage,
    DepartmentFormComponent,
    ToolbarComponent,
    DepartmentPreviewCardComponent,
    DepartmentDetailPage,
    SimpleConfirmDialog,
    EditDepartmentPage,
    RoomListPage,
    EditRoomPage,
    CreateRoomPage,
    RoomDetailPage,
    RoomFormComponent,
    RoomPreviewCardComponent,
    QrCodeDialog,
    AboListPage,
    CreateAboPage,
    EditAboPage,
    AboDetailPage,
    AboFormComponent,
    RoomPreviewSmallComponent,
    AboPreviewCardComponent,
    ReservationListPage,
    ReservationDetailPage,
    CreateReservationPage,
    EditReservationPage,
    ReservationFormComponent,
    TimeZoneDatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
    SidenavService,
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
  bootstrap: [RootPage]
})
export class AppModule {
}