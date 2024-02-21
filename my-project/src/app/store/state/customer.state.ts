import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Customer } from 'src/app/customer';
import { AddCustomer, DeleteCustomer, EditCustomer, GetCustomers, SetPageSize, SetRegistrationDateFilter, SetSelectedCustomer, SetSkip, SetStatusFilter } from '../actions/customer.action';
import { CustomerService } from 'src/app/customer/customer.service';
import { tap } from 'rxjs';

// state model
export class CustomerStateModel {
  customers: Customer[] = [];
  customersLoaded: boolean = false;
  selectedCustomer: Customer | null = null;
}
// state
@State<CustomerStateModel>({
  name: 'customers',
  defaults: {
    customers: [],
    customersLoaded: false,
    selectedCustomer: null,
  },
})
@Injectable()
export class CustomerState {
  constructor(private _customerService: CustomerService) {}
  // selectors has logic to get state data
  // get customer list from state
  @Selector()
  static getCustomerList(state: CustomerStateModel) {
    return state.customers;
  }

  @Selector()
  static customerLoaded(state: CustomerStateModel) {
    return state.customersLoaded;
  }

  // getSelected customer from state
  @Selector()
  static selectedCustomer(state: CustomerStateModel) {
    return state.selectedCustomer;
  }

  @Action(GetCustomers)
  getCustomers({ getState, setState }: StateContext<CustomerStateModel>) {
    console.log('state action');

    return this._customerService.getAll().pipe(
      tap((res) => {
        console.log('tap res', res);

        const state = getState();
        setState({
          ...state,
          customers: res,
          customersLoaded: true,
        });
      })
    );
  }

  @Action(AddCustomer)
  AddCustomer({ getState, patchState }: StateContext<CustomerStateModel>,{payload}:AddCustomer) {
   return this._customerService.create(payload).pipe(tap((res:Customer)=>{
    const state=getState();
    patchState({
        customers:[...state.customers,res]
    })
   }))
  }

  @Action(SetSelectedCustomer)
  setSelectedCustomer(
    { getState, setState }: StateContext<CustomerStateModel>,
    { id }: SetSelectedCustomer
  ) {
    const state = getState();
    const customerList = state.customers;
    const index = customerList.findIndex((customer) => customer.id === id);
    if (customerList.length > 0) {
      setState({
        ...state,
        selectedCustomer: customerList[index],
      });
      return;
    }

    return this._customerService.getCustomerById(id).pipe(
      tap((res: Customer) => {
        const state = getState();
        const customerList = [res];

        setState({
          ...state,
          customers: customerList,
          selectedCustomer: customerList[0],
        });
      })
    );
  }

  @Action(EditCustomer)
  editCustomer(
    { getState, setState }: StateContext<CustomerStateModel>,
    { id, payload }: EditCustomer
  ) {
    return this._customerService.update(id, payload).pipe(
      tap((res: Customer) => {
        const state = getState();
        const updatedCustomers = state.customers.map(customer =>
          customer.id === id ? { ...customer, ...res } : customer
        );

        setState({
          ...state,
          customers: updatedCustomers,
          selectedCustomer: res,
        });
      })
    );
  }

  @Action(DeleteCustomer)
  deleteCustomer(
    { getState, setState }: StateContext<CustomerStateModel>,
    { id }: DeleteCustomer
  ) {
    return this._customerService.delete(id).pipe(
      tap(() => {
        const state = getState();
        const filteredCustomers = state.customers.filter(customer => customer.id !== id);

        setState({
          ...state,
          customers: filteredCustomers,
          selectedCustomer: null, // Clear selected customer if it's deleted
        });
      })
    );
  }


 


}
