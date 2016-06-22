import { Component, OnInit } from '@angular/core';
import { OrdersListComponent } from './orders-list';
import { OrderService } from './shared/order.service';

@Component({
  moduleId: module.id,
  selector: 'app-orders',
  templateUrl: 'orders.component.html',
  styleUrls: ['orders.component.css'],
  directives: [
    OrdersListComponent, OrdersListComponent
  ],
  providers: [ OrderService ]
})
export class OrdersComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
