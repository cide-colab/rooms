// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  backend_url: 'http://localhost:8080',
  frontend_url: 'http://localhost:4200',
  keycloak: {
    auth_url: 'https://auth.gm.fh-koeln.de/auth',
    realm: 'Rooms',
    client_id: 'rooms_web_dev',
    client_secret: '120f9752-c00b-4be6-9669-3994e0e09636'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
