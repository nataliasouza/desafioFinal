import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ProviderService } from '../provider.service';
import jwt_decode from "jwt-decode";

import { map } from 'rxjs/operators'
import { Auth } from '../../model/auth';
import { UserLogged } from '../../model/userLogged';
import { UserLogin } from '../../model/userLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends ProviderService {
private http: HttpClient;
private currentUserSubject: BehaviorSubject<Auth>;
public currentUser: Observable<Auth>;

  constructor(_http: HttpClient) 
  {
    super("Login");
    this.http = _http;
    this.currentUserSubject = new BehaviorSubject<Auth>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser= this.currentUserSubject.asObservable();
  }

  public get currentUserValue() : Auth {
    return this.currentUserSubject.value;
  }

  public get userInformations(): any{
    try {
      return jwt_decode(this.currentUserValue.accessToken);
    } catch(Error)
    {
      return null;
    }
  }

  login(username: string, password: string)
  {
    var userLogin = new UserLogin(username, password);
    var data = JSON.stringify(userLogin);

    return this.http.post<any>(`${this.url}`, JSON.parse(data),{})
            .pipe(map(user => {
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
              return user;
            }))
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
