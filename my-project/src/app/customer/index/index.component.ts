import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Customer } from 'src/app/customer';
import { CustomerState } from 'src/app/store/state/customer.state';
import { CustomerService } from '../customer.service';
import { Select, Store } from '@ngxs/store';
import { AddCustomer, DeleteCustomer, EditCustomer, GetCustomers, SetPageSize, SetSkip } from 'src/app/store/actions/customer.action';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {
  title = 'my-project';
  customers: Customer[] = [];

  @Select(CustomerState.getCustomerList)
  customers$!: Observable<Customer[]>;

  @Select(CustomerState.customerLoaded)
  customerLoaded$!: Observable<boolean>;
  cusLoadedSub!: Subscription;
  form = new FormGroup({});
  model: Customer = {} as Customer; 
  @ViewChild('exampleModal') modal: any;
  customerFormTitle:string="Add Customer";

  public gridData:any;
  public pageSize = 10;
  public skip = 0;
  public filterForm = new FormGroup({});
  public filterModel: any = {};
  public filterFields: FormlyFieldConfig[] = [
    {
      key: 'status',
      type: 'select',
      templateOptions: {
        label: 'Status',
        options: [
          { label: 'All', value: '' },
          { label: 'Active', value: 'active' },
          { label: 'Inactive', value: 'inactive' }
        ],
      },
    },
    {
      key: 'registrationDate',
      type: 'input',
      templateOptions: {
        label: 'Registration Date',
        type: 'date',
      },
    },
  ];
  public filterOptions: FormlyFormOptions = {};

  constructor(
    private store: Store,
    private router: Router,
    private toastr: ToastrService 
  ) {}

  ngOnInit(): void {
    this.getCustomers();
    this.customers$.subscribe(res=>{
      this.gridData=res;
    })
  }

  getCustomers() {
    this.cusLoadedSub = this.customerLoaded$.subscribe(res => {
      if (!res) {
        this.store.dispatch(new GetCustomers());
        
      }
    });
  }

  ngOnDestroy(): void {
    this.cusLoadedSub.unsubscribe();
  }

  navigateToView(id: number): void {
    this.router.navigate(['/customer/view', id]);
  }

  fields: FormlyFieldConfig[] = [
    {
      key: 'id',
      type: 'input',
      templateOptions: {
        label: 'ID',
        type: 'string',
        required: true,
      },
    },
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        label: 'Name',
        type: 'text',
        required: true,
      },
    },
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Email',
        type: 'email',
        required: true,
      },
    },
    {
      key: 'registrationDate',
      type: 'input',
      templateOptions: {
        label: 'Registration Date',
        type: 'date',
        required: true,
        
      },
    },
    {
      key: 'username',
      type: 'input',
      templateOptions: {
        label: 'Username',
        type: 'text',
        required: true,
      },
    },
    {
      key: 'phone',
      type: 'input',
      templateOptions: {
        label: 'Phone',
        type: 'tel',
        required: true,
      },
    },
    {
      key: 'status',
      type: 'select',
      templateOptions: {
        label: 'Status',
        options: [
          { label: 'Active', value: 'active' },
          { label: 'Inactive', value: 'inactive' }
        ],
        required: true,
      },
    },
  ];

  editMode:boolean=false;
  editingCustomer!: Customer;
  toBeDeleteItem:Customer|null=null;
  openEditModal(dataItem: any) {
    this.editMode = true;
    this.customerFormTitle="Edit Customer";
    this.editingCustomer = dataItem;
    const formattedDate = dataItem.registrationDate ? new Date(dataItem.registrationDate).toISOString().substring(0, 10) : '';
    this.model = { 
      ...dataItem,
      registrationDate: formattedDate 
    };
  
  }
  openAddMOdal(){
    this.editMode=false;
    this.model = {} as Customer;
    this.customerFormTitle="Add Customer";
  }
  openDeleteModal(dataItem:any){
    this.toBeDeleteItem=dataItem;
  }
  submit() {
    if (this.form.valid) {
      if (this.editMode) {
        this.store.dispatch(new EditCustomer(this.editingCustomer.id, this.model));
        this.toastr.success('Customer updated successfully.');
   
      } else {
        this.store.dispatch(new AddCustomer(this.model));
        this.toastr.success('Customer added successfully.');
   
      }
    }
  }

 

  deleteCustomer(id?: number) {
    if(id){
      this.store.dispatch(new DeleteCustomer(id));
    }
      this.toastr.success('Customer deleted successfully.');
  }

  public pageChange(event: PageChangeEvent): void {
    this.store.dispatch(new SetPageSize(event.take));
    this.store.dispatch(new SetSkip(event.skip));
  }
}
