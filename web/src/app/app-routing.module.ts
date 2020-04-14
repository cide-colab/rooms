import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainPage} from './pages/main/main.page';
import {DepartmentListPage} from './pages/general/department-list/department-list.page';
import {CreateDepartmentPage} from './pages/detail/create-department/create-department.page';
import {PermissionGuard} from './permission.guard';
import {DepartmentDetailPage} from './pages/detail/department-detail/department-detail.page';
import {EditDepartmentPage} from './pages/detail/edit-department/edit-department.page';
import {CreateRoomPage} from './pages/detail/create-room/create-room.page';
import {RoomListPage} from './pages/general/room-list/room-list.page';
import {RoomDetailPage} from './pages/detail/room-detail/room-detail.page';
import {EditRoomPage} from './pages/detail/edit-room/edit-room.page';
import {AboListPageComponent} from './pages/admin/abo-list/abo-list-page.component';
import {CreateAboPage} from './pages/detail/create-abo/create-abo.page';
import {AboDetailPage} from './pages/detail/abo-detail/abo-detail.page';
import {EditAboPage} from './pages/detail/edit-abo/edit-abo.page';
import {ReservationListPage} from './pages/admin/reservation-list/reservation-list.page';
import {CreateReservationPage} from './pages/detail/create-reservation/create-reservation.page';
import {ReservationDetailPage} from './pages/detail/reservation-detail/reservation-detail.page';
import {EditReservationPage} from './pages/detail/edit-reservation/edit-reservation.page';
import {MyAboListPageComponent} from './pages/user/my-abos/my-abo-list-page.component';
import {MyReservationListPageComponent} from './pages/user/my-reservations/my-reservation-list-page.component';
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
    component: AboListPageComponent,
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
  // {
  //   path: 'users/:id/abos',
  //   component: AboListPageComponent,
  //   canActivate: [PermissionGuard],
  //   data: {
  //     entries: [
  //       {idKey: 'id', permission: 'read'}
  //     ]
  //   }
  // },
  {
    path: 'my',
    canActivate: [PermissionGuard],
    data: { loggedIn: true },
    children: [
      {
        path: 'abos',
        component: MyAboListPageComponent
      },
      {
        path: 'reservations',
        component: MyReservationListPageComponent
      }
    ]
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
