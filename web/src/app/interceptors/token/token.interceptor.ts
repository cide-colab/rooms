import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import {from, Observable, of} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {KeycloakService} from 'keycloak-angular';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private readonly keycloakService: KeycloakService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.keycloakService.isLoggedIn()).pipe(
      mergeMap(loggedIn => loggedIn ? this.keycloakService.addTokenToHeader(request.headers) : of(request.headers)),
      map(headers => request.clone({ headers })),
      mergeMap(r => next.handle(r))
    );
  }
}
