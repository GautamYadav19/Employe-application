import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import ApiService from 'src/app/service/api.service';

@Component({
  selector: 'app-department-create',
  templateUrl: './department-create.component.html',
  styleUrls: ['./department-create.component.css'],
})
export class DepartmentCreateComponent implements OnInit {
  sumbitted = false;
  mgrs: any = [];
  locations: any = [];

  constructor(public fb: FormBuilder, private apiService: ApiService) {}
  departmentForm = this.fb.group({
    deptid: [''],
    dname: [''],
    mgrid: [''],
    location_id: [''],
  });
  ngOnInit() {
    this.readlocations();
    this.readmgrs();
  }
  readmgrs() {
    this.apiService.employeesmgr().subscribe((data) => {
      this.mgrs = data;
      console.log();
    });
  }
  readlocations() {
    this.apiService.location().subscribe((data) => {
      this.locations = data;
      console.log(data);
    });
  }
  onSubmit() {
    console.log(this.departmentForm.value);
    this.sumbitted = true;
    if (!this.departmentForm.valid) {
      return false;
    } else {
      return this.apiService
        .createdepartment(this.departmentForm.value)
        .subscribe({
          complete: () => {
            alert('depaertment successfully created !');
          },
          error: (e: any) => {
            console.log(e);
          },
        });
    }
  }
}
