import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Employe-application';
  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}
  // logout() {
  //   this._auth.clearStroage();
  //   this._router.navigate(['login']), { relativeTo: this._route };
  // }
}
