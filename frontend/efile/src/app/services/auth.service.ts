import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api_url = 'http://127.0.0.1:3000/'
  constructor(private http: HttpClient) { }

  login(user: any){
    return this.http.post<any>(this.api_url+'user/login',user)
  }

}
