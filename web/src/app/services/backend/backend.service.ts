import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {KeycloakService} from 'keycloak-angular';
import {from, Observable, of} from 'rxjs';
import {map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {UrlService} from '../url/url.service';

export enum TokenRequirement {
  NAN,
  IF_LOGGED_IN,
  REQUIRED
}

export interface RestResponse<T> {
  value: T;
  links: Map<string, string>;
}

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private backendUrl = environment.backend_url;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly keycloakService: KeycloakService,
    private readonly urlService: UrlService
  ) {
  }

  public get<T>(relativeUrl: string, tokenRequirement: TokenRequirement = TokenRequirement.NAN): Observable<T> {
    return this.createOptions(tokenRequirement).pipe(
      switchMap(options => this.httpClient.get<T>(this.createUrl(relativeUrl), options))
    );
  }

  public getSingle<T>(relativeUrl: string, params: any = {}): Observable<T> {
    return this.httpClient.get<T>(this.urlService.getUrl(relativeUrl, params));
  }

  public getCollection<T>(relativeUrl: string, rel: string, params: any = {}): Observable<T[]> {
    return this.httpClient
      .get<{ _embedded: { [rel: string]: T[] }, _links: Map<string, string> }>(this.urlService.getUrl(relativeUrl, params)).pipe(
      // tap(it => console.log(it)),
      map(v => v._embedded[rel]),
      // tap(it => console.log(it))
    );
  }
  public postSingle<T, R>(relativeUrl: string, body: T, params: any = {}): Observable<R> {
    return this.httpClient.post<R>(this.urlService.getUrl(relativeUrl, params), body);
  }

  public post<T, R>(relativeUrl: string, body: T, tokenRequirement: TokenRequirement = TokenRequirement.NAN): Observable<R> {
    return this.createOptions(tokenRequirement).pipe(
      switchMap(options => this.httpClient.post<R>(this.createUrl(relativeUrl), body, options))
    );
  }

  public deleteSingle<T>(relativeUrl: string, params: any = {}): Observable<T> {
    return this.httpClient.delete<T>(this.urlService.getUrl(relativeUrl, params));
  }

  public delete<T>(relativeUrl: string, tokenRequirement: TokenRequirement = TokenRequirement.NAN): Observable<T> {
    return this.createOptions(tokenRequirement).pipe(
      switchMap(options => this.httpClient.delete<T>(this.createUrl(relativeUrl), options))
    );
  }

  public patchSingle<T, R>(relativeUrl: string, body: T, params: any = {}): Observable<R> {
    return this.httpClient.patch<R>(this.urlService.getUrl(relativeUrl, params), body);
  }

  public patch<T, R>(relativeUrl: string, body: T, tokenRequirement: TokenRequirement = TokenRequirement.NAN): Observable<R> {
    return this.createOptions(tokenRequirement).pipe(
      switchMap(options => this.httpClient.patch<R>(this.createUrl(relativeUrl), body, options))
    );
  }

  private createOptions(tokenRequirement: TokenRequirement): Observable<{ headers?: HttpHeaders, observe: 'body' }> {
    let headers: Observable<HttpHeaders>;
    switch (tokenRequirement) {
      case TokenRequirement.REQUIRED:
        headers = this.keycloakService.addTokenToHeader(new HttpHeaders());
        break;
      case TokenRequirement.IF_LOGGED_IN:
        headers = from(this.keycloakService.isLoggedIn()).pipe(
          mergeMap(loggedIn => loggedIn ? this.keycloakService.addTokenToHeader(new HttpHeaders()) : of(new HttpHeaders()))
        );
        break;
      default:
        of(new HttpHeaders());
    }
    return headers.pipe(map(h => {
      return {headers: h, observe: 'body'};
    }));
  }

  private createUrl(relativeUrl: string) {
    if (relativeUrl.indexOf('http') === 0) {
      return relativeUrl;
    } else {
      return `${this.backendUrl}/${relativeUrl}`;
    }
  }
}
