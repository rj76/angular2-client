import {Injectable, NgZone} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {AuthHttp, AuthConfig, AUTH_PROVIDERS} from 'angular2-jwt';

import {Auth} from '../../shared';
import {Order} from './order'

// Add the RxJS Observable operators we need in this app.
import '../rxjs-operators';

import {environment} from '../environment';

@Injectable()
export class OrdersService {
  user: Object;
  zoneImpl: NgZone;
  errorMessage: any;

  constructor(private authHttp: AuthHttp, zone: NgZone, private router: Router) {
  }

  getOrders (): Observable<Order[]> {
    return this.authHttp.get(`${environment.baseUrl}/order/api/`)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();

    return body || { };
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}
