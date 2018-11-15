import { Component, OnInit } from '@angular/core';
import { Login } from '../../models/login/login.interface.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: Login = { email: sessionStorage.getItem('sessionEmail') || 's.timmers@student.han.nl', username: '', password: '' };
  loggedIn = false;

  onSubmit() {
    sessionStorage.setItem('sessionEmail', this.login.email);
    this.loggedIn = true;
  }

  logout() {
    sessionStorage.removeItem('sessionEmail');
    this.loggedIn = false;
  }

  constructor() { }

  ngOnInit() {
    if (sessionStorage.getItem('sessionEmail')) {
      this.loggedIn = true;
    }
  }
}
