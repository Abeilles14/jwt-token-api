import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';


@Component({
selector: 'app-home',
templateUrl: 'home.page.html',
styleUrls: ['home.page.scss'],
})
export class HomePage {

email: string;
password: string;

constructor(private authenticationService: AuthService) {}

login() {
  console.log("login button clicked");
  this.authenticationService.login(this.email, this.password);
}

}
