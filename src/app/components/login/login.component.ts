import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import ApiService from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  // encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  isLogin: boolean = false;
  errorMessage: any;
  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _router: Router
  ) {}

  ngOnInit() {
    // this.isUserLogin();
  }
  onSubmit(form: NgForm) {
    console.log('Your form data : ', form.value);
    this._api.postTypeRequest('/login', form.value).subscribe((res: any) => {
      console.log(res.data[0]);
      if (res.data == res.data[0]) {
        console.log('email is correct but password is not');
        this.errorMessage = res.data;
        console.log(this.errorMessage);
      } else if (res.data == res.data[1]) {
        this.errorMessage = res.data;
      }

      if (res.status) {
        this._auth.setDataInLocalStorage('userData', JSON.stringify(res.data));
        this._auth.setDataInLocalStorage('token', res.token);
        this._router.navigate(['']);
      }
    });
  }
  // errormsg = (errMsg: any) => {
  //   switch (errMsg) {
  //     case 'Incorrect_password':
  //       this.errorMessage = 'Please enter the coorect passowrd';
  //       break;
  //   }
  // };
  // isUserLogin() {
  //   if (this._auth.getUserDetails() != null) {
  //     this.isLogin = true;
  //   }
  // }
}
