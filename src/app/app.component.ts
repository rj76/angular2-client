import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';

import { Auth } from './shared';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  providers: [ AUTH_PROVIDERS, Auth, HTTP_PROVIDERS ],
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})

export class AppComponent {
	title: 'Angular2 client'

	constructor(private auth: Auth) {}

}
