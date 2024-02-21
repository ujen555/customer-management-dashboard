import { Component, OnDestroy } from '@angular/core';
import { Customer } from './customer';
import { CustomerService } from './customer/customer.service';
import { Select, Store } from '@ngxs/store';
import { GetCustomers } from './store/actions/customer.action';
import { Observable, Subscription } from 'rxjs';
import { CustomerState } from './store/state/customer.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'my-project';
  

  





  
}
