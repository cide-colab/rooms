import {KeycloakService} from 'keycloak-angular';
import {environment} from '../environments/environment';

export function keycloakInitializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => keycloak.init({
    config: {
      url: environment.keycloak.auth_url,
      realm: environment.keycloak.realm,
      clientId: environment.keycloak.client_id,
      credentials: {
        secret: environment.keycloak.client_secret
      }
    },
    initOptions: {
      /*onLoad: 'login-required',*/
      onLoad: 'check-sso',
      checkLoginIframe: false
    },
    enableBearerInterceptor: false
  });
}
