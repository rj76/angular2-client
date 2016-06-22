import { Component, OnInit } from '@angular/core';
import { OrderModel } from '../shared/order.model';
import { OrderService } from '../shared/order.service';


@Component({
  moduleId: module.id,
  selector: 'app-orders-list',
  templateUrl: 'orders-list.component.html',
  styleUrls: ['orders-list.component.css']
})
export class OrdersListComponent implements OnInit {
  errorMessage: string;
  orders: OrderModel[];
  mode = 'Observable';

  constructor(private orderService: OrderService) {}

  ngOnInit() {
  	this.getOrders();
  }

  getOrders() {
    this.orderService
    	.getOrders()
	    .subscribe(
           orders => this.orders = orders,
           error =>  this.errorMessage = <any>error);
		}
}
