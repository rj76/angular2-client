import { provideRouter, RouterConfig } from '@angular/router';

import {HomeComponent} from './home';
import {OrdersComponent} from './orders'

export const routes: RouterConfig = [
  { path: 'home', component: HomeComponent, index : true },
  { path: 'orders', component: OrdersComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
