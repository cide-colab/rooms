import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {MainComponent} from './components/pages/main/main.component';
import {DepartmentsComponent} from './components/pages/departments/departments.component';
import {RoomsComponent} from './components/pages/rooms/rooms.component';
import {RoomComponent} from './components/pages/room/room.component';
import {DepartmentComponent} from './components/pages/department/department.component';
import {DepartmentUpdateComponent} from './components/pages/department-update/department-update.component';
import {DepartmentCreateComponent} from './components/pages/department-create/department-create.component';
import {RoomCreateComponent} from './components/pages/room-create/room-create.component';
import {RoomUpdateComponent} from './components/pages/room-update/room-update.component';
import {AclAction, AclClassAlias, RoutingPermission} from './models/acl-entry.model';
import {PermissionGuard} from './guards/permission.guard';
import {AbosAllComponent} from './components/pages/abos-all/abos-all.component';
import {AboCreateComponent} from './components/pages/abo-create/abo-create.component';
import {AbosMyComponent} from './components/pages/abos-my/abos-my.component';
import {AboComponent} from './components/pages/abo/abo.component';
import {UserComponent} from './components/pages/user/user.component';
import {UsersComponent} from './components/pages/users/users.component';

export interface AppRoute extends Route {
  data?: {
    permission?: RoutingPermission;
  };
}

export declare type AppRoutes = AppRoute[];

const routes: AppRoutes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'departments',
    component: DepartmentsComponent,
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
    component: DepartmentCreateComponent,
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
    component: DepartmentComponent,
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
    component: DepartmentUpdateComponent,
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
    component: RoomsComponent,
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
    component: RoomCreateComponent,
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
    component: RoomComponent,
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
    component: RoomUpdateComponent,
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
    component: AbosAllComponent,
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
    component: AboCreateComponent,
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
    component: AbosMyComponent,
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
    component: AboComponent,
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
    path: 'users',
    component: UsersComponent,
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
    component: UserComponent,
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
