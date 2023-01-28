import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import { EmployeeListComponent } from './components/Second-l-component/employees/employee-list/employee-list.component';
import { EmployeeCreateComponent } from './components/Second-l-component/employees/employee-create/employee-create.component';
import { EmployeeEditComponent } from './components/Second-l-component/employees/employee-edit/employee-edit.component';
import { DepartmentCreateComponent } from './components/Second-l-component/department/department-create/department-create.component';
import { DepartmentEditComponent } from './components/Second-l-component/department/department-edit/department-edit.component';
import { DepartmentListComponent } from './components/Second-l-component/department/department-list/department-list.component';
import { DatePipe } from '@angular/common';
// import { RegisterComponent } from './componets/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    EmployeeListComponent,
    EmployeeCreateComponent,
    EmployeeEditComponent,
    DepartmentCreateComponent,
    DepartmentEditComponent,
    DepartmentListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
