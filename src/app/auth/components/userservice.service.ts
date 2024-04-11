import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { loginModel, userModel } from 'src/app/Models/userModel';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  private url = 'http://localhost:5183/User/';
  constructor(private httpClient: HttpClient) { }

  signupUser(data: userModel): Observable<any> {
    return this.httpClient.post<any>(this.url + 'signup', data);
  }

  loginUser(data: loginModel): Observable<any> {
    return this.httpClient.post(this.url + 'login', data);
  }
}
