import { Customer } from 'src/app/customer';
export class AddCustomer {
  static readonly type = '[Customer] Add';
  constructor(public payload: Customer) {}
}

export class GetCustomers {
  static readonly type = '[Customer] Get';
}

export class SetSelectedCustomer {
    static readonly type = '[Customer] Set';
    constructor(public id:number){}
  
}
export class EditCustomer {
  static readonly type = '[Customer] Edit';
  constructor(public id: number, public payload: Customer) {}
}

export class DeleteCustomer {
  static readonly type = '[Customer] Delete';
  constructor(public id: number) {}
}

export class SetStatusFilter {
  static readonly type = '[Customer] Set Status Filter';
  constructor(public status: string | null) {}
}

export class SetRegistrationDateFilter {
  static readonly type = '[Customer] Set Registration Date Filter';
  constructor(public date: string | null) {}
}

export class SetPageSize {
  static readonly type = '[Customer] Set Page Size';
  constructor(public pageSize: number) {}
}

export class SetSkip {
  static readonly type = '[Customer] Set Skip';
  constructor(public skip: number) {}
}