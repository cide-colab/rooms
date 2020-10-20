import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SidenavComponent} from './components/sidenav/sidenav.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {SidenavService} from './services/sidenav/sidenav.service';
import {MainPage} from './pages/main/main.page';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import {SessionService} from './services/session/session.service';
import {BackendService} from './services/backend/backend.service';
import {UserPreviewComponent} from './components/user/user-preview/user-preview.component';
import {MatListModule} from '@angular/material/list';
import {keycloakInitializer} from './app.init';
import {CreateDepartmentPage} from './pages/detail/create-department/create-department.page';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {DepartmentFormComponent} from './components/department/department-form/department-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {DepartmentService} from './services/department/department.service';
import {DateAdapter, MatRippleModule} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {DepartmentDetailPage} from './pages/detail/department-detail/department-detail.page';
import {MatDialogModule} from '@angular/material/dialog';
import {SimpleConfirmDialog} from './dialog/simple-confirm/simple-confirm.dialog';
import {EditDepartmentPage} from './pages/detail/edit-department/edit-department.page';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {SnackbarService} from './services/snackbar/snackbar.service';
import {EditRoomPage} from './pages/detail/edit-room/edit-room.page';
import {CreateRoomPage} from './pages/detail/create-room/create-room.page';
import {RoomFormComponent} from './components/room/room-form/room-form.component';
import {RoomService} from './services/room/room.service';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {RoomPreviewCardComponent} from './components/room/room-preview-card/room-preview-card.component';
import {QRCodeModule} from 'angularx-qrcode';
import {QrCodeDialog} from './dialog/qr-code/qr-code.dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {AboListPageComponent} from './pages/admin/abo-list/abo-list-page.component';
import {CreateAboPage} from './pages/detail/create-abo/create-abo.page';
import {EditAboPage} from './pages/detail/edit-abo/edit-abo.page';
import {AboDetailPage} from './pages/detail/abo-detail/abo-detail.page';
import {AboFormComponent} from './components/abo/abo-form/abo-form.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {RoomPreviewSmallComponent} from './components/room/room-preview-small/room-preview-small.component';
import {AboPreviewCardComponent} from './components/abo/abo-preview-card/abo-preview-card.component';
import {ReservationListPage} from './pages/admin/reservation-list/reservation-list.page';
import {ReservationDetailPage} from './pages/detail/reservation-detail/reservation-detail.page';
import {CreateReservationPage} from './pages/detail/create-reservation/create-reservation.page';
import {EditReservationPage} from './pages/detail/edit-reservation/edit-reservation.page';
import {AboService} from './services/abo/abo.service';
import {UserService} from './services/user/user.service';
import {ReservationService} from './services/reservation/reservation.service';
import {ReservationFormComponent} from './components/reservation/reservation-form/reservation-form.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {MatRadioModule} from '@angular/material/radio';
import {TimeZoneDatePipe, TimezoneService} from './services/timezone.service';
import {MatSliderModule} from '@angular/material/slider';
import {MyReservationListPageComponent} from './pages/user/my-reservations/my-reservation-list-page.component';
import {MyAboListPageComponent} from './pages/user/my-abos/my-abo-list-page.component';
import {AboListComponent} from './components/abo/abo-list/abo-list.component';
import {ReservationListComponent} from './components/reservation/reservation-list/reservation-list.component';
import {ReservationPreviewCardComponent} from './components/reservation/reservation-preview-card/reservation-preview-card.component';
import {MainComponent} from './components/pages/main/main.component';
import { MatGridListModule} from '@angular/material/grid-list';
import {MainMenuComponent} from './components/fragments/main-menu/main-menu.component';
import { RoomsComponent } from './components/pages/rooms/rooms.component';
import {ToolbarComponent} from './components/fragments/toolbar/toolbar.component';
import {MatIconModule} from '@angular/material/icon';
import {TokenInterceptor} from './interceptors/token/token.interceptor';
import {RoomListComponent} from './components/fragments/room-list/room-list.component';
import { RoomListItemComponent } from './components/fragments/room-list-item/room-list-item.component';
import { PreviewPipe } from './pipes/preview/preview.pipe';
import { ActionsComponent } from './components/fragments/actions/actions.component';
import {DepartmentsComponent} from './components/pages/departments/departments.component';
import {DepartmentListComponent} from './components/fragments/department-list/department-list.component';
import { DepartmentListItemComponent } from './components/fragments/department-list-item/department-list-item.component';
import { RoomComponent } from './components/pages/room/room.component';
import { DepartmentComponent } from './components/pages/department/department.component';

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
    MainPage,
    UserPreviewComponent,
    CreateDepartmentPage,
    DepartmentFormComponent,
    ToolbarComponent,
    DepartmentDetailPage,
    SimpleConfirmDialog,
    EditDepartmentPage,
    EditRoomPage,
    CreateRoomPage,
    RoomFormComponent,
    RoomPreviewCardComponent,
    QrCodeDialog,
    AboListPageComponent,
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
    TimeZoneDatePipe,
    MyReservationListPageComponent,
    MyAboListPageComponent,
    AboListComponent,
    ReservationListComponent,
    ReservationPreviewCardComponent,
    DepartmentListComponent,
    RoomListComponent,
    MainComponent,
    MainMenuComponent,
    DepartmentsComponent,
    RoomsComponent,
    RoomListItemComponent,
    PreviewPipe,
    ActionsComponent,
    DepartmentListItemComponent,
    RoomComponent,
    DepartmentComponent
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
    MatSliderModule,
    MatGridListModule,
    MatIconModule,
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
