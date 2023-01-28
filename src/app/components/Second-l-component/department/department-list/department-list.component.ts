import { Component, OnInit } from '@angular/core';
import ApiService from 'src/app/service/api.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css'],
})
export class DepartmentListComponent implements OnInit {
  department: any = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.redDepartment();
  }
  redDepartment() {
    this.apiService.getDepartment().subscribe((data) => {
      this.department = data;
      console.log(data);
    });
  }
  removeDepartment(departments: { deptid: any }, index: any) {
    if (window.confirm('Are you sure ?')) {
      this.apiService.deletedepartment(departments.deptid).subscribe((data) => {
        this.department.splice(index, 1);
      });
    }
  }
}
