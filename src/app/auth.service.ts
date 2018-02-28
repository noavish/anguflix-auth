import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  login(user): Observable<any> {
      return this.http.post<any>('/login', user);
  }

  isLoggedIn() {
      if (localStorage.token) {
          return true;
      } else {
          return false;
      }
  }
}
