import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import ApiService from 'src/app/service/api.service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css'],
})
export class EmployeeCreateComponent implements OnInit {
  submitted = false;
  departments: any = [];
  jobs: any = [];
  mgrs: any = [];
  employeeForm = this.fb.group({
    ename: [''],
    jobid: [''],
    mgrid: [''],
    hiredate: [''],
    salary: [''],
    comission: [''],
    deptid: [''],
  });
  constructor(private apiService: ApiService, public fb: FormBuilder) {}

  readmgr() {
    this.apiService.employeesmgr().subscribe((data) => {
      this.mgrs = data;
      console.log('managers', data);
    });
  }
  readjobs() {
    this.apiService.employeesjobs().subscribe((data) => {
      this.jobs = data;
      console.log('jobs', data);
    });
  }
  readDepartments() {
    this.apiService.getDepartment().subscribe((data) => {
      this.departments = data;
      console.log('departments', data);
    });
  }

  ngOnInit() {
    this.readjobs();
    this.readmgr();
    this.readDepartments();
  }
  onSubmit() {
    console.log(this.employeeForm.value);
    this.submitted = true;
    if (!this.employeeForm.valid) {
      return false;
    } else {
      return this.apiService.createEmployee(this.employeeForm.value).subscribe({
        complete: () => {
          alert('Employee successfully created!');
        },
        error(e) {
          console.log(e);
        },
      });
      return false;
    }
  }
}
