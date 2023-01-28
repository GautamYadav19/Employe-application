import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ApiService from 'src/app/service/api.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css'],
})
export class EmployeeEditComponent implements OnInit {
  submitted = false;
  editForm!: FormGroup;
  mgrs: any = [];
  jobs: any = [];
  departments: any = [];
  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private router: Router,
    private dataPipe: DatePipe
  ) {}

  ngOnInit() {
    let id = this.actRoute.snapshot.paramMap.get('id');

    this.getEmployee(id);
    this.readjobs();
    this.readmgr();
    this.readDepartments();

    this.editForm = this.fb.group({
      empid: [id], //esa karne se kya huya
      ename: [''],
      jobid: [''],
      mgrid: [''],
      hiredate: [''],
      salary: [''],
      comission: [''],
      deptid: [''],
    });
  }

  getEmployee(id: any) {
    this.apiService.employeebyid(id).subscribe((data) => {
      this.editForm.patchValue({
        ename: data['ename'],
        jobid: data['jobid'],
        mgrid: data['mgrid'],
        hiredate: this.dataPipe.transform(data['hiredate'], 'yyyy-MM-dd'),
        salary: data['salary'],
        comission: data['comission'],
        deptid: data['deptid'],
      });
    });
  }

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
  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else if (window.confirm('Are you sure ?')) {
      let id = this.actRoute.snapshot.paramMap.get('empid'); //mere Q yeh hain ki yeh empid kiyo le raha hain mai toh id pass kar raha hu
      this.apiService.updateEmployee(id, this.editForm.value).subscribe({
        complete: () => {
          this.router.navigateByUrl('/employee-list');
          console.log('Content update successfully!');
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
    return true;
  }
}
