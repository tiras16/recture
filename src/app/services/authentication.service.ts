import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/User';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private baseUrl = 'http://3.10.154.164';
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    user : User = new User();

    constructor(private http: HttpClient,private router: Router) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
    public set setCurrentUser(user : any) {
        this.currentUserSubject.next(user);
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${this.baseUrl}/sign_in`, { username, password })
            .pipe(map(user => {
                if (user && !user['error']) {

                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);

                    }
                else{
                    return user;
                }

            }));
    }

    getUser(id: number){
      return this.http.post<any>(`${this.baseUrl}/getUser`, id)
            .pipe(map(user => {

                if (user && !user['error']) {
                    console.log("getuser error",user)
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);

                    }
                else{
                    console.log("getuser",user)
                    return user;
                }

            }));
    }

    forgot(code: number, password: string, email: string) {
      return this.http.post(`${this.baseUrl}/forgot`, { code, password, email});
    }

    postEmail(email: string) {
      return this.http.post(`${this.baseUrl}/forgot2`, {email})
    }


    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);

        setTimeout (() => {
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
       }, 300);
    }

    delete(id: number) {
        return this.http.post(`${this.baseUrl}/delete`, {id})
      }

}
