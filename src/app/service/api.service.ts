import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { catchError, Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export default class ApiService {
  baseUri: string = 'http://localhost:3000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) {}
  getTypeRequest(url: any) {
    return this.http.get(`${this.baseUri}${url}`).pipe(
      map((res) => {
        return res;
      })
    );
  }
  postTypeRequest(url: any, payload: any) {
    return this.http.post(`${this.baseUri}${url}`, payload).pipe(
      map((res) => {
        return res;
      })
    );
  }
  // get all employees
  getEmpployee() {
    return this.http.get(`${this.baseUri}/employeelist`);
  }
  deleteemployee(id: any) {
    let url = `${this.baseUri}/employeedelete/${id}`;
    return this.http
      .delete(url, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }
  updateEmployee(empid: any, data: any) {
    var url = `${this.baseUri}/employeeupdate`;
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }
  employeebyid(id: any) {
    let url = `${this.baseUri}/employee/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      //header kiyo set kar rahe hain
      map((res: any) => {
        return res[0] || {}; //yaha kya sence hai
      }),
      catchError(this.errorMgmt)
    );
  }
  employeesmgr() {
    return this.http.get(`${this.baseUri}/employeesmgr`);
  }
  employeesjobs() {
    return this.http.get(`${this.baseUri}/employeesjobs`);
  }
  createEmployee(data: any) {
    return this.http
      .post(`${this.baseUri}/employeeinsert`, data)
      .pipe(catchError(this.errorMgmt));
  }
  getDepartment() {
    return this.http.get(`${this.baseUri}/departments`);
  }
  deletedepartment(id: any): Observable<any> {
    return this.http
      .delete(`${this.baseUri}/departmentdelete/${id}`, {
        headers: this.headers,
      })
      .pipe(catchError(this.errorMgmt));
  }
  departmentById(id: any): Observable<any> {
    return this.http
      .get(`${this.baseUri}/department/${id}`, { headers: this.headers })
      .pipe(
        map((res: any) => {
          return res[0] || {};
        }),
        catchError(this.errorMgmt)
      );
  }
  updatedepartment(deptid: any, data: any): Observable<any> {
    return this.http
      .put(`${this.baseUri}/departmentupdate`, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }
  createdepartment(data: any) {
    return this.http
      .post(`${this.baseUri}/insertdepartment`, data)
      .pipe(catchError(this.errorMgmt));
  }
  location() {
    return this.http.get(`${this.baseUri}/location`);
  }
  // deletedepartment(id: any): Observable<any> {
  //   let url = `${this.baseUri}/departmentdelete/${id}`;
  //   return this.http
  //     .delete(url, { headers: this.headers })
  //     .pipe(catchError(this.errorMgmt));
  // }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code:${error.status}\nMessage:${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
