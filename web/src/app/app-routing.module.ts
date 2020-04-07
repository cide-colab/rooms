import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainPage} from './pages/main/main.page';
import {DepartmentListPage} from './pages/department-list/department-list.page';
import {CreateDepartmentPage} from './pages/create-department/create-department.page';
import {PermissionGuard} from './permission.guard';
import {DepartmentDetailPage} from './pages/department-detail/department-detail.page';
import {EditDepartmentPage} from './pages/edit-department/edit-department.page';
import {CreateRoomPage} from './pages/create-room/create-room.page';
import {RoomListPage} from './pages/room-list/room-list.page';
import {RoomDetailPage} from './pages/room-detail/room-detail.page';
import {EditRoomPage} from './pages/edit-room/edit-room.page';
import {AboListPage} from './pages/abo-list/abo-list.page';
import {CreateAboPage} from './pages/create-abo/create-abo.page';
import {AboDetailPage} from './pages/abot-detail/abo-detail.page';
import {EditAboPage} from './pages/edit-abo/edit-abo.page';
import {ReservationListPage} from './pages/reservation-list/reservation-list.page';
import {CreateReservationPage} from './pages/create-reservation/create-reservation.page';
import {ReservationDetailPage} from './pages/reservation-detail/reservation-detail.page';
import {EditReservationPage} from './pages/edit-reservation/edit-reservation.page';
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
  {
    path: '',
    component: MainPage,
  },
  {
    path: 'departments',
    component: DepartmentListPage
  },
  {
    path: 'departments/create',
    component: CreateDepartmentPage,
    canActivate: [PermissionGuard],
    data: {
      entries: [
        {idKey: null, permission: 'create:department'}
      ]
    }
  },
  {
    path: 'departments/:id',
    component: DepartmentDetailPage,
    canActivate: [PermissionGuard],
    data: {
      entries: [
        {idKey: 'id', permission: 'read'}
      ]
    }
  },
  {
    path: 'departments/:id/edit',
    component: EditDepartmentPage,
    canActivate: [PermissionGuard],
    data: {
      entries: [
        {idKey: 'id', permission: 'update'}
      ]
    }
  },
  {
    path: 'rooms',
    component: RoomListPage
  },
  {
    path: 'rooms/create',
    component: CreateRoomPage,
    canActivate: [PermissionGuard],
    data: {
      entries: [
        {idKey: 'any', permission: 'create:room'}
      ]
    }
  },
  {
    path: 'rooms/:id',
    component: RoomDetailPage,
    canActivate: [PermissionGuard],
    data: {
      entries: [
        {idKey: 'id', permission: 'read'}
      ]
    }
  },
  {
    path: 'rooms/:id/edit',
    component: EditRoomPage,
    canActivate: [PermissionGuard],
    data: {
      entries: [
        {idKey: 'id', permission: 'update'}
      ]
    }
  },


  {
    path: 'abos',
    component: AboListPage,
    canActivate: [PermissionGuard],
    data: {
      entries: [
        {type: 'Abo', permission: 'read'},
        {idKey: null, permission: 'create:abo'}
      ]
    }
  },
  {
    path: 'abos/create',
    component: CreateAboPage,
    canActivate: [PermissionGuard],
    data: {
      entries: [
        {idKey: null, permission: 'create:abo'}
      ]
    }
  },
  {
    path: 'abos/:id',
    component: AboDetailPage,
    canActivate: [PermissionGuard],
    data: {
      entries: [
        {idKey: 'id', permission: 'read'}
      ]
    }
  },
  {
    path: 'abos/:id/edit',
    component: EditAboPage,
    canActivate: [PermissionGuard],
    data: {
      entries: [
        {idKey: 'id', permission: 'update'}
      ]
    }
  },
  {
    path: 'users/:id/abos',
    component: AboListPage,
    canActivate: [PermissionGuard],
    data: {
      entries: [
        {idKey: 'id', permission: 'read'}
      ]
    }
  },


  {
    path: 'reservations',
    component: ReservationListPage,
    canActivate: [PermissionGuard],
    data: {
      entries: [
        {type: 'Reservation', permission: 'read'},
        {idKey: null, permission: 'create:reservation'}
      ]
    }
  },
  {
    path: 'reservations/create',
    component: CreateReservationPage,
    canActivate: [PermissionGuard],
    data: {
      entries: [
        {idKey: null, permission: 'create:reservation'}
      ]
    }
  },
  {
    path: 'reservations/:id',
    component: ReservationDetailPage,
    canActivate: [PermissionGuard],
    data: {
      entries: [
        {idKey: 'id', permission: 'read'}
      ]
    }
  },
  {
    path: 'reservations/:id/edit',
    component: EditReservationPage,
    canActivate: [PermissionGuard],
    data: {
      entries: [
        {idKey: 'id', permission: 'update'}
      ]
    }
  },
  {
    path: 'users/:id/reservations',
    component: ReservationListPage,
    canActivate: [PermissionGuard],
    data: {
      entries: [
        {idKey: 'id', permission: 'read'}
      ]
    }
  },


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
