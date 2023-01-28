import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import ApiService from 'src/app/service/api.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: any = [];
  mgraname: any = [];
  constructor(private apiService: ApiService) {}
  ngOnInit() {
    this.readEmployee();
  }
  readEmployee() {
    this.apiService.getEmpployee().subscribe((data: any) => {
      this.employees = data;
      console.log(this.employees);
    });
  }
  removeEmployee(employee: { empid: any }, index: any) {
    if (window.confirm('Are you sure ?')) {
      this.apiService.deleteemployee(employee.empid).subscribe((data: any) => {
        this.employees.splice(index, 1);
      });
    }
  }
  // readMangers(){
  //   this.apiService.
  // }
}
