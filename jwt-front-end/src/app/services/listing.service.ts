import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  httpOptions: {
    headers: HttpHeaders
  };

  constructor(private http: HttpClient, private authenticationService: AuthService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + authenticationService.getToken()
      })
    };
  }

  getListings(): any {
    return this.http.get('http://localhost:5000/api/listings', this.httpOptions);
  }

}
