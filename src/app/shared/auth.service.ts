import {Injectable, NgZone} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Router} from '@angular/router';
import {AuthHttp, tokenNotExpired} from 'angular2-jwt';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Rx';

import {environment} from '../environment';
console.log('environment', environment);

@Injectable()
export class Auth {
  refreshSubscription: any;
  user: Object;
  zoneImpl: NgZone;
  API_URL: string = 'http://localhost:3001';

  constructor(private http: Http, private authHttp: AuthHttp, zone: NgZone, private router: Router) {
    this.zoneImpl = zone;
    this.user = JSON.parse(localStorage.getItem('profile'));
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    return tokenNotExpired();
  }

  private extractData(res: Response) {
    // If authentication is successful, save the items
    // in local storage
    let body = res.json();
    let profile = {};

    localStorage.setItem('profile', JSON.stringify(profile));
    localStorage.setItem('id_token', body.token);

    this.zoneImpl.run(() => this.user = profile);
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  public login(email: string, password: string) {
    // try to login
    let body = { email: email, password: password };

    this.http.post(`${environment.baseUrl}/core/api-token-auth/`, body)
      .map(this.extractData)
      .catch(this.handleError);
    
  }

  public logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
    this.zoneImpl.run(() => this.user = null);
    this.router.navigate(['Home']);
  }
}
