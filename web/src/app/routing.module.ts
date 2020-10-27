import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {MainPageComponent} from './components/pages/main/main-page.component';
import {DepartmentsPageComponent} from './components/pages/departments/departments-page.component';
import {RoomsPageComponent} from './components/pages/rooms/rooms-page.component';
import {RoomPageComponent} from './components/pages/room/room-page.component';
import {DepartmentPageComponent} from './components/pages/department/department-page.component';
import {DepartmentUpdatePageComponent} from './components/pages/department-update/department-update-page.component';
import {DepartmentCreatePageComponent} from './components/pages/department-create/department-create-page.component';
import {RoomCreatePageComponent} from './components/pages/room-create/room-create-page.component';
import {RoomUpdatePageComponent} from './components/pages/room-update/room-update-page.component';
import {AclAction, AclClassAlias, RoutingPermission} from './models/acl-entry.model';
import {PermissionGuard} from './guards/permission.guard';
import {AbosPageComponent} from './components/pages/abos-all/abos-page.component';
import {AboCreatePageComponent} from './components/pages/abo-create/abo-create-page.component';
import {AbosMePageComponent} from './components/pages/abos-my/abos-me-page.component';
import {AboPageComponent} from './components/pages/abo/abo-page.component';
import {UserPageComponent} from './components/pages/user/user-page.component';
import {UsersPageComponent} from './components/pages/users/users-page.component';
import {AboUpdatePageComponent} from './components/pages/abo-update/abo-update-page.component';

export interface AppRoute extends Route {
  data?: {
    permission?: RoutingPermission;
  };
}

export declare type AppRoutes = AppRoute[];

const routes: AppRoutes = [
  {
    path: '',
    component: MainPageComponent
  },
  {
    path: 'departments',
    component: DepartmentsPageComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: {
        target: AclClassAlias.department,
        action: AclAction.READ
      }
    }
  },
  {
    path: 'departments/create',
    component: DepartmentCreatePageComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: {
        target: AclClassAlias.department,
        action: AclAction.CREATE,
        context: {
          objectClass: AclClassAlias.application,
          objectIdAttr: ''
        }
      }
    }
  },
  {
    path: 'departments/:id',
    component: DepartmentPageComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: {
        target: AclClassAlias.department,
        action: AclAction.READ,
        context: {
          objectClass: AclClassAlias.department,
          objectIdAttr: 'id'
        }
      }
    }
  },
  {
    path: 'departments/:id/update',
    component: DepartmentUpdatePageComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: {
        target: AclClassAlias.department,
        action: AclAction.UPDATE,
        context: {
          objectClass: AclClassAlias.department,
          objectIdAttr: 'id'
        }
      }
    }
  },
  {
    path: 'rooms',
    component: RoomsPageComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: {
        target: AclClassAlias.room,
        action: AclAction.READ
      }
    }
  },
  {
    path: 'rooms/create',
    component: RoomCreatePageComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: {
        target: AclClassAlias.room,
        action: AclAction.CREATE
      }
    }
  },
  {
    path: 'rooms/:id',
    component: RoomPageComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: {
        target: AclClassAlias.room,
        action: AclAction.READ,
        context: {
          objectClass: AclClassAlias.room,
          objectIdAttr: 'id'
        }
      }
    }
  },
  {
    path: 'rooms/:id/update',
    component: RoomUpdatePageComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: {
        target: AclClassAlias.room,
        action: AclAction.UPDATE,
        context: {
          objectClass: AclClassAlias.room,
          objectIdAttr: 'id'
        }
      }
    }
  },
  {
    path: 'abos',
    component: AbosPageComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: {
        target: AclClassAlias.abo,
        action: AclAction.ADMINISTRATE
      }
    }
  },
  {
    path: 'abos/create',
    component: AboCreatePageComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: {
        target: AclClassAlias.abo,
        action: AclAction.CREATE
      }
    }
  },
  {
    path: 'my/abos',
    component: AbosMePageComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: {
        target: AclClassAlias.abo,
        action: AclAction.READ
      }
    }
  },
  {
    path: 'abos/:id',
    component: AboPageComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: {
        target: AclClassAlias.abo,
        action: AclAction.READ,
        context: {
          objectClass: AclClassAlias.abo,
          objectIdAttr: 'id'
        }
      }
    }
  },
  {
    path: 'abos/:id/update',
    component: AboUpdatePageComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: {
        target: AclClassAlias.abo,
        action: AclAction.UPDATE,
        context: {
          objectClass: AclClassAlias.abo,
          objectIdAttr: 'id'
        }
      }
    }
  },
  {
    path: 'users',
    component: UsersPageComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: {
        target: AclClassAlias.user,
        action: AclAction.ADMINISTRATE
      }
    }
  },
  {
    path: 'users/:id',
    component: UserPageComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: {
        target: AclClassAlias.user,
        action: AclAction.READ,
        context: {
          objectClass: AclClassAlias.user,
          objectIdAttr: 'id'
        }
      }
    }
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
export class RoutingModule {
}
