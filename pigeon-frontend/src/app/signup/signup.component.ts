import { HttpClient } from '@angular/common/http';
import { Customer } from './../shared/sdk/models/Customer';

import { CustomerService } from './../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from '../common/Loader';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private customerService: CustomerService,
    public loaderService: LoaderService,
    public http: HttpClient
    ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  async register() {
    const payload = this.registerForm.value;
    payload.name = this.getCustomer();
    /* const data = await this.http.post('/api/Customers', payload).toPromise();
    console.log(data); */
    this.customerService.createNewCustomer(payload)
    .then((c: Customer) => {
      console.log(c);
    })
    .catch((e) => {
      console.log(e);
    });
  }

  getCustomer() {
    const email = this.email.value;
    const customer = email.substring(email.indexOf('@') + 1, email.indexOf('.'));
    return customer.replace(/^\w/, c => c.toUpperCase());
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('passwordHash');
  }

  get rePassword() {
    return this.registerForm.get('rePassword');
  }

  togglePasswordViz(el) {
    el.type === 'password' ? el.type = 'text' : el.type = 'password';
  }

}
