import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public apiUrl: string = environment.dbHostUrl + "/users";

  //#region allUsers: User[] 
  private readonly _allUsers = new BehaviorSubject<User[]>([]);

  readonly allUsers$ = this._allUsers.asObservable();

  public get allUsers(): User[] {
    return this._allUsers.getValue();
  }
  public set allUsers(users: User[]) {
    this._allUsers.next(users);
  }
  //#endregion

  //#region currentUser: User
  private readonly _currentUser = new BehaviorSubject<User>(null);
  readonly currentUser$ = this._currentUser.asObservable();

  public get currentUser(): User {
    return this._currentUser.getValue();
  }
  public set currentUser(user: User) {
    this._currentUser.next(user);
  }
  //#endregion

  constructor(private http: HttpClient) {
    this.currentUser$.subscribe(data => {
      console.log("currentUser$ updated", data);
    });
  }

  public GetAllUsers() {
    return this.http.get<User[]>(this.apiUrl)
      .subscribe(data => {
        console.log("data", data);
        this.allUsers = data;
      });
  }

  public GetAllUserSubscription() {
    return this.http.get<User[]>(this.apiUrl);
  }

  public GetByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}?Username=${username}`);
  }

  public GetByID(id: number) {
    return this.http.get<User>(this.apiUrl + "/" + id);
  }

  public Create(toSave: User) {
    return this.http.post(this.apiUrl, toSave);
  }

  public Update(toSave: User) {
    return this.http.put(this.apiUrl + '/' + toSave.id, toSave);
  }
}

