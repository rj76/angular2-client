/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { OrdersListComponent } from './orders-list.component';

describe('Component: OrdersList', () => {
  it('should create an instance', () => {
    let component = new OrdersListComponent();
    expect(component).toBeTruthy();
  });
});
