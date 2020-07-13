import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly user: BehaviorSubject<User> = new BehaviorSubject<User>(
    new User()
  );
  readonly user$ = this.user.asObservable();

  constructor(private http: HttpClient) {}

  get(id: number) {
    return this.http
      .get<User>(`${environment.apiConfig.url}/users/${id}`)
      .pipe(tap(res => res));
  }

  getByEmail(email: string) {
    return this.http
      .get<User[]>(`${environment.apiConfig.url}/users?email=${email}`)
      .pipe(map(res => (!res || !res.length ? undefined : res[0])));
  }

  updateUser(user: User) {
    this.user.next(user);
  }
}
