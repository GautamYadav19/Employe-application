import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {}
  logout() {
    this._auth.clearStroage();
    this._router.navigate(['login']), { relativeTo: this._route };
  }
}
