import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { ListingService } from './listing.service';


class ResponseObject {
  success: boolean;
  message: string;
  data: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRhbnlhQG1haWwuY29tIiwiaWF0IjoxNTYzNTMzMjg2LCJleHAiOjE1NjM2MTk2ODZ9.Cq9PAEhfRc7FWEEqFroLy7bNY7ubbd8rtW94L_QhhZo";

  constructor(private http: HttpClient, public navCtrl: NavController) { }

  login(email, password) {
    console.log("in login auth service");
    this.http.post('http://localhost:5000/api/auth/login',
    {email: email, password: password}).subscribe((response: ResponseObject) => {
      if (response.success) {
        console.log("http posting was successful");
        this.token = response.data;
       // this.navCtrl.navigateForward('listings');
      }
      console.log(response);
    });
  }

  getToken(): string {
    return this.token
  }

}
