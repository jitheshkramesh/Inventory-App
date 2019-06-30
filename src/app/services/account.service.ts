import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/Operators';
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";
import { decode } from 'punycode';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient, private router: Router) { }

  private baseUrl: string = "https://localhost:44390/api/";

  private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
  private Username = new BehaviorSubject<string>(localStorage.getItem('username'));
  private UserRole = new BehaviorSubject<string>(localStorage.getItem('userRole'));

  register(username: string, password: string, email: string) {
    return this.http.post<any>(this.baseUrl + "Account/Register", { username, password, email }).pipe(
      map(result => {
        //registration was successful
        return result;
      }, error => {
        return error;
      })
    );
  }

  login(username: string, password: string) {
    return this.http.post<any>(this.baseUrl + "Account/Login", { username, password }).pipe(
      map(result => {
        if (result && result.token) {
          this.loginStatus.next(true);
          localStorage.setItem('loginStatus', '1');
          localStorage.setItem('jwt', result.token);
          localStorage.setItem('username', result.username);
          localStorage.setItem('expiration', result.expiration);
          localStorage.setItem('userRole', result.userRole);
          this.Username.next(localStorage.getItem('username'));
          this.UserRole.next(localStorage.getItem('userRole'));
        }
        return result;
      })
    );
  }

  logout() {
    this.loginStatus.next(false);
    localStorage.setItem('loginStatus', '0');
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userRole');
    this.router.navigate(['/login']);
    console.log('logged out successfully');
  }

  checkLoginStatus(): boolean {

    var loginCookie = localStorage.getItem('loginStatus');

    if (loginCookie == "1") {

      if (localStorage.getItem('jwt') === null || localStorage.getItem('jwt') === undefined) {
        return false;
      }
      
      // Get and Decode the Token
      const token = localStorage.getItem('jwt');
      const decoded = jwt_decode(token);
      // Check if the cookie is valid

      // if (decoded.exp === undefined) {
      //   return false;
      // }

      // Get Current Date Time
      const date = new Date(0);

      // Convert EXp Time to UTC
      // let tokenExpDate = date.setUTCSeconds(decoded.exp);

      // // If Value of Token time greter than 

      // if (tokenExpDate.valueOf() > new Date().valueOf()) {
      //   return true;
      // }


      console.log("NEW DATE " + new Date().valueOf());
      // console.log("Token DATE " + tokenExpDate.valueOf());

    }

    return false;


  }

  get isLoggedIn() {
    return this.loginStatus.asObservable();
  }

  get currentUsername() {
    return this.Username.asObservable();
  }

  get currentUserRole() {
    return this.UserRole.asObservable();
  }
}
