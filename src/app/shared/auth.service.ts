import {Injectable, NgZone} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Router} from '@angular/router';
import {AuthHttp, tokenNotExpired} from 'angular2-jwt';
import {Observable} from 'rxjs/Rx';

// Add the RxJS Observable operators we need in this app.
import '../rxjs-operators';

import {environment} from '../environment';

@Injectable()
export class Auth {
  refreshSubscription: any;
  user: Object;
  zoneImpl: NgZone;
  errorMessage: any;

  constructor(private http: Http, private authHttp: AuthHttp, zone: NgZone, private router: Router) {
    let profile = localStorage.getItem('profile');

    this.zoneImpl = zone;
    console.log(localStorage.getItem('id_token'), tokenNotExpired());
    // this.user = profile ? JSON.parse(profile) : {};
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    return tokenNotExpired();
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

  public login(email: string, password: string) {
    // try to login
    let headers = new Headers(
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    );
    let options = new RequestOptions({ headers: headers });
    let body = { email: email, password: password };

    let cold = this.http.post(`${environment.baseUrl}/core/api-token-auth/`, body, options)
      .map(this.extractData)
      .catch(this.handleError)
      .subscribe(
        data => {
              // If authentication is successful, save the items
              // in local storage
              localStorage.setItem('profile', JSON.stringify(data.profile || {}));
              localStorage.setItem('id_token', data.token);

              this.zoneImpl.run(() => this.user = data.profile);
        },
        error =>  this.errorMessage = <any>error
      )
  }

  public logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
    this.zoneImpl.run(() => this.user = null);
    this.router.navigate(['Home']);
  }
}
