import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  private backendUrl = environment.backend_url;

  constructor() { }

  getUrl(relativeUrl: string, params: any = {}): string {
    return this.createUrl(relativeUrl) + this.buildQueryParams(params);
  }

  private buildQueryParams(params: any): string {
    const keys = Object.keys(params);
    if (params.length <= 0) {
      return '';
    }
    return '?' + keys.map(k => `${k}=${params[k]}`).join('&');
  }

  private createUrl(relativeUrl: string) {
    if (relativeUrl.indexOf('http') === 0) {
      return relativeUrl;
    } else {
      return `${this.backendUrl}/${relativeUrl}`;
    }
  }
}
