import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Customer } from 'src/app/customer';
import { SetSelectedCustomer } from 'src/app/store/actions/customer.action';
import { CustomerState } from 'src/app/store/state/customer.state';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit,OnDestroy {
  @Select(CustomerState.selectedCustomer) selectedCustomer$!: Observable<Customer>;
  selectedCustomer!: Subscription;
  customer: Customer|null=null;
  constructor(
    private activatedRoute:ActivatedRoute,
    private store:Store
  ){}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param: Params) => {
      let id = param['get']('id'); 
      this.getCustomerById(id);
    });
   
  }

  getCustomerById(id:number){
    this.store.dispatch(new SetSelectedCustomer(id));  
    this.selectedCustomer=this.selectedCustomer$.subscribe(res=>this.customer=res);
  }

  ngOnDestroy(): void {
      this.selectedCustomer.unsubscribe();
  }
}
