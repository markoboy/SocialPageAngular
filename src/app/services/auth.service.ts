import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/IUser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment.serverUrl + '/auth';
  private _rememberUser: boolean;

  constructor(private http: HttpClient) {
    // Check if the user has checked the remember me
    !!localStorage.getItem(environment.TOKEN_KEY) ?
      this.rememberUser = true :
      this.rememberUser = false;
  }

  get token(): string {
    return this.rememberUser ?
      localStorage.getItem(environment.TOKEN_KEY) :
      sessionStorage.getItem(environment.TOKEN_KEY);
  }

  get isAuthenticated(): boolean {
    return this.rememberUser ?
      !!localStorage.getItem(environment.TOKEN_KEY) :
      !!sessionStorage.getItem(environment.TOKEN_KEY);
  }

  set rememberUser(value: boolean) {
    this._rememberUser = value;
  }

  get rememberUser(): boolean {
    return this._rememberUser;
  }

  logout() {
    // Remove both the session and local storage
    localStorage.removeItem(environment.TOKEN_KEY);
    sessionStorage.removeItem(environment.TOKEN_KEY);
  }

  registerUser(registerData: IUser): Observable<any> {
    return this.http.post<string>(this.url + '/register', registerData);
  }

  loginUser(loginData: IUser): Observable<any> {
    return this.http.post<string>(this.url + '/login', loginData);
  }

  saveToken(token: string) {
    this.rememberUser ?
      localStorage.setItem(environment.TOKEN_KEY, token) :
      sessionStorage.setItem(environment.TOKEN_KEY, token);
  }

}
