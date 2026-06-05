import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {

   private apiUrl =
    environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  // ======================
  // REGISTER
  // ======================

  register(
    data: any
  ): Observable<any> {

    return this.http.post(

      `${this.apiUrl}/register`,

      data

    );

  }

  // ======================
  // LOGIN
  // ======================

  login(
    data: any
  ): Observable<any> {

    return this.http.post(

      `${this.apiUrl}/login`,

      data

    );

  }

  // ======================
  // FORGOT PASSWORD
  // ======================

  forgotPassword(
    email: string
  ): Observable<any> {

    return this.http.post(

      `${this.apiUrl}/forgot-password`,

      {
        email
      }

    );

  }

  // ======================
  // RESET PASSWORD
  // ======================

  resetPassword(
    token: string,
    password: string
  ): Observable<any> {

    return this.http.post(

      `${this.apiUrl}/reset-password`,

      {
        token,
        password
      }

    );

  }

  // ======================
  // LOGOUT
  // ======================

  logout(): void {

    localStorage.removeItem(
      'token'
    );

    localStorage.removeItem(
      'user'
    );

  }

  // ======================
  // IS LOGGED IN
  // ======================

  isLoggedIn(): boolean {

    return !!localStorage.getItem(
      'token'
    );

  }

  // ======================
  // GET TOKEN
  // ======================

  getToken(): string | null {

    return localStorage.getItem(
      'token'
    );

  }


}
