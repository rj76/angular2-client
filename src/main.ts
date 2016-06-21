import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, provide, PLATFORM_DIRECTIVES } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { AppComponent, environment, APP_ROUTER_PROVIDERS } from './app/';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  APP_ROUTER_PROVIDERS,
  provide(PLATFORM_DIRECTIVES, {useValue: ROUTER_DIRECTIVES, multi: true}),
  provide(LocationStrategy, {useClass: HashLocationStrategy})

])
.catch(err => console.error(err));
