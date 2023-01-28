import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DepartmentCreateComponent } from './components/Second-l-component/department/department-create/department-create.component';
import { DepartmentEditComponent } from './components/Second-l-component/department/department-edit/department-edit.component';
import { DepartmentListComponent } from './components/Second-l-component/department/department-list/department-list.component';
import { EmployeeCreateComponent } from './components/Second-l-component/employees/employee-create/employee-create.component';
import { EmployeeEditComponent } from './components/Second-l-component/employees/employee-edit/employee-edit.component';
import { EmployeeListComponent } from './components/Second-l-component/employees/employee-list/employee-list.component';
import { AuthGuardService } from './service/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: 'employees', component: EmployeeListComponent, children: [] },
      { path: 'employee/edit/:id', component: EmployeeEditComponent },
      { path: 'employee/add', component: EmployeeCreateComponent },
      { path: 'departments', component: DepartmentListComponent },
      { path: 'department/add', component: DepartmentCreateComponent },
      { path: 'department/edit/:id', component: DepartmentEditComponent },
    ],
  },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', pathMatch: 'full', redirectTo: 'employee' },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
