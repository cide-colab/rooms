import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {AclAction, AclClassAlias, RoutingPermission} from './models/acl-entry.model';
import {PermissionGuard} from './guards/permission.guard';
import {MainPageComponent} from './components/pages/main-page/main-page.component';
import {DepartmentCreatePageComponent} from './components/pages/department-create-page/department-create-page.component';
import {DepartmentListPageComponent} from './components/pages/department-list-page/department-list-page.component';
import {DepartmentPageComponent} from './components/pages/department-page/department-page.component';
import {DepartmentUpdatePageComponent} from './components/pages/department-update-page/department-update-page.component';
import {RoomListPageComponent} from './components/pages/room-list-page/room-list-page.component';
import {RoomCreatePageComponent} from './components/pages/room-create-page/room-create-page.component';
import {RoomPageComponent} from './components/pages/room-page/room-page.component';
import {RoomUpdatePageComponent} from './components/pages/room-update-page/room-update-page.component';
import {AboListPageComponent} from './components/pages/abo-list-page/abo-list-page.component';
import {AboCreatePageComponent} from './components/pages/abo-create-page/abo-create-page.component';
import {AboListMePageComponent} from './components/pages/abo-list-me-page/abo-list-me-page.component';
import {AboPageComponent} from './components/pages/abo-page/abo-page.component';
import {AboUpdatePageComponent} from './components/pages/abo-update-page/abo-update-page.component';
import {UserListPageComponent} from './components/pages/user-list-page/user-list-page.component';
import {UserPageComponent} from './components/pages/user-page/user-page.component';
import {ReservationUpdatePageComponent} from './components/pages/reservation-update-page/reservation-update-page.component';
import {ReservationPageComponent} from './components/pages/reservation-page/reservation-page.component';
import {ReservationListMePageComponent} from './components/pages/reservation-list-me-page/reservation-list-me-page.component';
import {ReservationCreatePageComponent} from './components/pages/reservation-create-page/reservation-create-page.component';
import {ReservationListComponent} from './components/reservation/reservation-list/reservation-list.component';

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
    component: DepartmentListPageComponent,
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
    component: RoomListPageComponent,
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
    component: AboListPageComponent,
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
    component: AboListMePageComponent
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
    component: UserListPageComponent,
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
  {
    path: 'reservations',
    component: ReservationListComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: {
        target: AclClassAlias.reservation,
        action: AclAction.ADMINISTRATE
      }
    }
  },
  {
    path: 'reservations/create',
    component: ReservationCreatePageComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: {
        target: AclClassAlias.reservation,
        action: AclAction.CREATE
      }
    }
  },
  {
    path: 'my/reservations',
    component: ReservationListMePageComponent,
  },
  {
    path: 'reservations/:id',
    component: ReservationPageComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: {
        target: AclClassAlias.reservation,
        action: AclAction.READ,
        context: {
          objectClass: AclClassAlias.reservation,
          objectIdAttr: 'id'
        }
      }
    }
  },
  {
    path: 'reservations/:id/update',
    component: ReservationUpdatePageComponent,
    canActivate: [PermissionGuard],
    data: {
      permission: {
        target: AclClassAlias.reservation,
        action: AclAction.UPDATE,
        context: {
          objectClass: AclClassAlias.reservation,
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
