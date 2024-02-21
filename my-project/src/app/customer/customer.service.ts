import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Customer } from '../customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiURL = "http://localhost:3000";
  
  // Optional httpOptions for API request headers 
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  // getAllMethods
  getAll(): Observable<any> {
    return this.httpClient.get(this.apiURL + '/customers/').pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  // create
  create(customer: Customer): Observable<any> {
    return this.httpClient.post(this.apiURL + '/customers/', JSON.stringify(customer), this.httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  // get data by id  
  getCustomerById(id: number): Observable<any> {
    return this.httpClient.get(this.apiURL + '/customers/' + id, this.httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  // update customer
  update(id: number, customer: Customer): Observable<any> {
    return this.httpClient.put(this.apiURL + '/customers/' + id, JSON.stringify(customer), this.httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  // delete customer
  delete(id: number): Observable<any> {
    return this.httpClient.delete(this.apiURL + '/customers/' + id, this.httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }
}
