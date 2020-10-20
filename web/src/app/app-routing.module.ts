import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './components/pages/main/main.component';
import {DepartmentsComponent} from './components/pages/departments/departments.component';
import {RoomsComponent} from './components/pages/rooms/rooms.component';
import {RoomComponent} from './components/pages/room/room.component';
import {DepartmentComponent} from './components/pages/department/department.component';
import {DepartmentUpdateComponent} from './components/pages/department-update/department-update.component';
import {DepartmentCreateComponent} from './components/pages/department-create/department-create.component';
import {RoomCreateComponent} from './components/pages/room-create/room-create.component';
import {RoomUpdateComponent} from './components/pages/room-update/room-update.component';
/*

    data: {
      // Permission && Permission
      entries: [
        {
          idKey: null,
          // Role || Role
          permissions: ['create:department']
        }
      ]
    }

 */

const routes: Routes = [
  // {
  //   path: '',
  //   component: MainPage,
  // },
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'departments',
    component: DepartmentsComponent
  },
  {
    path: 'departments/create',
    component: DepartmentCreateComponent
  },
  {
    path: 'departments/:id',
    component: DepartmentComponent
  },
  {
    path: 'departments/:id/update',
    component: DepartmentUpdateComponent
  },
  {
    path: 'rooms',
    component: RoomsComponent
  },
  {
    path: 'rooms/create',
    component: RoomCreateComponent
  },
  {
    path: 'rooms/:id',
    component: RoomComponent
  },
  {
    path: 'rooms/:id/update',
    component: RoomUpdateComponent
  },
  // {
  //   path: 'departments',
  //   component: DepartmentListPage
  // },
  // {
  //   path: 'departments/create',
  //   component: CreateDepartmentPage,
  //   canActivate: [PermissionGuard],
  //   data: {
  //     entries: [
  //       {idKey: null, permission: 'create:department'}
  //     ]
  //   }
  // },
  // {
  //   path: 'departments/:id',
  //   component: DepartmentDetailPage,
  //   canActivate: [PermissionGuard],
  //   data: {
  //     entries: [
  //       {idKey: 'id', permission: 'read'}
  //     ]
  //   }
  // },
  // {
  //   path: 'departments/:id/edit',
  //   component: EditDepartmentPage,
  //   canActivate: [PermissionGuard],
  //   data: {
  //     entries: [
  //       {idKey: 'id', permission: 'update'}
  //     ]
  //   }
  // },
  // {
  //   path: 'rooms',
  //   component: RoomListPage
  // },
  // {
  //   path: 'rooms/create',
  //   component: CreateRoomPage,
  //   canActivate: [PermissionGuard],
  //   data: {
  //     entries: [
  //       {idKey: 'any', permission: 'create:room'}
  //     ]
  //   }
  // },
  // {
  //   path: 'rooms/:id',
  //   component: RoomDetailPage,
  //   canActivate: [PermissionGuard],
  //   data: {
  //     entries: [
  //       {idKey: 'id', permission: 'read'}
  //     ]
  //   }
  // },
  // {
  //   path: 'rooms/:id/edit',
  //   component: EditRoomPage,
  //   canActivate: [PermissionGuard],
  //   data: {
  //     entries: [
  //       {idKey: 'id', permission: 'update'}
  //     ]
  //   }
  // },
  //
  //
  // {
  //   path: 'abos',
  //   component: AboListPageComponent,
  //   canActivate: [PermissionGuard],
  //   data: {
  //     entries: [
  //       {type: 'Abo', permission: 'read'},
  //       {idKey: null, permission: 'create:abo'}
  //     ]
  //   }
  // },
  // {
  //   path: 'abos/create',
  //   component: CreateAboPage,
  //   canActivate: [PermissionGuard],
  //   data: {
  //     entries: [
  //       {idKey: null, permission: 'create:abo'}
  //     ]
  //   }
  // },
  // {
  //   path: 'abos/:id',
  //   component: AboDetailPage,
  //   canActivate: [PermissionGuard],
  //   data: {
  //     entries: [
  //       {idKey: 'id', permission: 'read'}
  //     ]
  //   }
  // },
  // {
  //   path: 'abos/:id/edit',
  //   component: EditAboPage,
  //   canActivate: [PermissionGuard],
  //   data: {
  //     entries: [
  //       {idKey: 'id', permission: 'update'}
  //     ]
  //   }
  // },
  // // {
  // //   path: 'users/:id/abos',
  // //   component: AboListPageComponent,
  // //   canActivate: [PermissionGuard],
  // //   data: {
  // //     entries: [
  // //       {idKey: 'id', permission: 'read'}
  // //     ]
  // //   }
  // // },
  // {
  //   path: 'my',
  //   canActivate: [PermissionGuard],
  //   data: { loggedIn: true },
  //   children: [
  //     {
  //       path: 'abos',
  //       component: MyAboListPageComponent
  //     },
  //     {
  //       path: 'reservations',
  //       component: MyReservationListPageComponent
  //     }
  //   ]
  // },
  //
  // {
  //   path: 'reservations',
  //   component: ReservationListPage,
  //   canActivate: [PermissionGuard],
  //   data: {
  //     entries: [
  //       {type: 'Reservation', permission: 'read'},
  //       {idKey: null, permission: 'create:reservation'}
  //     ]
  //   }
  // },
  // {
  //   path: 'reservations/create',
  //   component: CreateReservationPage,
  //   canActivate: [PermissionGuard],
  //   data: {
  //     entries: [
  //       {idKey: null, permission: 'create:reservation'}
  //     ]
  //   }
  // },
  // {
  //   path: 'reservations/:id',
  //   component: ReservationDetailPage,
  //   canActivate: [PermissionGuard],
  //   data: {
  //     entries: [
  //       {idKey: 'id', permission: 'read'}
  //     ]
  //   }
  // },
  // {
  //   path: 'reservations/:id/edit',
  //   component: EditReservationPage,
  //   canActivate: [PermissionGuard],
  //   data: {
  //     entries: [
  //       {idKey: 'id', permission: 'update'}
  //     ]
  //   }
  // },
  // {
  //   path: 'users/:id/reservations',
  //   component: ReservationListPage,
  //   canActivate: [PermissionGuard],
  //   data: {
  //     entries: [
  //       {idKey: 'id', permission: 'read'}
  //     ]
  //   }
  // },
  //

  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
