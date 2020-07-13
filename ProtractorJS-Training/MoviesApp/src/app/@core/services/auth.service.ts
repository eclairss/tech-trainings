import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Auth } from '../models/Auth';
import { Login } from '../models/Login';
import { Register } from '../models/Register';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly auth: BehaviorSubject<Auth> = new BehaviorSubject<Auth>(
    new Auth()
  );
  readonly auth$ = this.auth.asObservable();
  accessTokenKey = 'token';

  constructor(
    private userService: UserService,
    private http: HttpClient) {}

  login(data: Login) {
    return this.http
      .post<Auth>(`${environment.apiConfig.url}/login`, data)
      .pipe(tap(res => this.storeAccessToken(res.accessToken)));
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem(this.accessTokenKey) !== null;
  }

  storeAccessToken(accessToken: string) {
    if (accessToken) {
      sessionStorage.setItem(this.accessTokenKey, accessToken);
    }
  }

  logout(): void {
    sessionStorage.removeItem(this.accessTokenKey);
    this.updateAuth(new Auth());
  }

  register(data: Register) {
    return this.http
      .post<Auth>(`${environment.apiConfig.url}/register`, data)
      .pipe(tap(res => res));
  }

  updateAuth(auth: Auth) {
    this.auth.next(auth);
  }
}
