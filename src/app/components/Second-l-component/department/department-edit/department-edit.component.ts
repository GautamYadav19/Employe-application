import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ApiService from 'src/app/service/api.service';

@Component({
  selector: 'app-department-edit',
  templateUrl: './department-edit.component.html',
  styleUrls: ['./department-edit.component.css'],
})
export class DepartmentEditComponent implements OnInit {
  submitted = false;
  locations: any = [];
  mgrs: any = [];
  editForm!: FormGroup;
  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.readlocations();
    this.readmgr();

    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getdepartment(id);
    this.editForm = this.fb.group({
      deptid: [''],
      dname: [''],
      mgrid: [''],
      location_id: [''],
    });
  }
  getdepartment(id: any) {
    this.apiService.departmentById(id).subscribe((data) => {
      this.editForm.patchValue({
        deptid: data['deptid'],
        dname: data['dname'],
        mgrid: data['mgrid'],
        location_id: data['location_id'],
      });
    });
  }
  readmgr() {
    this.apiService.employeesmgr().subscribe((data: any) => {
      this.mgrs = data;
      console.log(this.mgrs);
    });
  }
  readlocations() {
    this.apiService.location().subscribe((data: any) => {
      this.locations = data;
      console.log(this.locations);
    });
  }
  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else if (window.confirm('Are you sure')) {
      let id = this.actRoute.snapshot.paramMap.get('deptid');
      this.apiService.updatedepartment(id, this.editForm.value).subscribe({
        complete: () => {
          this.router.navigateByUrl('/departments');
          console.log('Content updated successfully!');
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
    return true;
  }
}
