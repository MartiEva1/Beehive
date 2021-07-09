import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Plugins } from '@capacitor/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const { Storage } = Plugins;

const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = 'http://localhost:3000/user/';

  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';

  constructor(private http: HttpClient) {
    this.loadToken();
  }

  async loadToken() {
    const token = await Storage.get({ key: TOKEN_KEY });
    if(token && token.value)
    {
      console.log("Set Token: ", token.value);
      this.token = token.value;
      this.isAuthenticated.next(true);
    }
    else
    {
      this.isAuthenticated.next(false);
    }
  }

  signin(user): Observable<any> {
    return this.http.post(this.url+"user", user);
  }

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post(this.url+"login", credentials).pipe(
      map(async (user: {user: string, message: string}) => {
        let token = user.user;
        this.isAuthenticated.next(true);
        this.token = token;
        await Storage.set({ key: TOKEN_KEY, value: token });
      })
    );
  }

  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    return Storage.remove({ key: TOKEN_KEY });
  }

  async getUserWithToken(): Promise<Observable<any>> {
    const token = await Storage.get({ key: TOKEN_KEY });
    return this.http.get(this.url+"user/"+token.value);
  }

  getUser(): Observable<any> {
    return this.http.get(this.url+"user/"+this.token);
  }

  getUserByUsername(username): Observable<any> {
    return this.http.get(this.url+"user/"+username);
  }

  updateUser(userID, user): Observable<any> {
    return this.http.put(this.url+"update?userID="+userID, user);
  }

  deleteUser(userID): Observable<any> {
    return this.http.delete(this.url+"delete?userID="+userID);
  }

  updatePassword(userID, passwords): Observable<any> {
    return this.http.put(this.url+"updatePassword?userID="+userID, passwords);
  }
}
