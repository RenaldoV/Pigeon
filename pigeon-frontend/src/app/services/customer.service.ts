import { Customer } from './../shared/sdk/models/Customer';
import { CustomerApi } from './../shared/sdk/services/custom/Customer';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private customerApi: CustomerApi
  ) { }

  createNewCustomer(customer) {
    const data = new Customer(customer);
    return this.customerApi.create<Customer>(data)
      .toPromise();
  }
}
