import {Login} from './login.interface.model';

export class LoginImpl implements Login {

  email: string;
  password: string;
  username: string;

  constructor(email: string, password: string, username: string) {
    this.email = email;
    this.password = password;
    this.username = username;
  }
}
