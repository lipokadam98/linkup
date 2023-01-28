import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../../shared/models/user.model';

export interface AuthResponseData{
  idToken: string,
  email: string,
  displayName: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{

  user = new BehaviorSubject<User | null>(null);

  private tokenExpirationTimer: any;

  constructor(private httpClient: HttpClient,private router: Router) {

  }

  ngOnInit(): void {
    this.autoLogin();
  }

  signUp(email: string, password: string, displayName: string){
    return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebase.apiKey,{
      email: email,
      password: password,
      displayName: displayName,
      returnSecureToken: true
    }).pipe(catchError(this.handleError),tap(resData=>{
      //Itt a lejárati dátumot állítjuk be a responseDataban megkapott expiresIn értéket alapul véve majd pedig 1000-el megszorozva
      this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn,resData.displayName);
    }))
  }

  signIn(email: string, password: string){
    return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='  + environment.firebase.apiKey,{
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError),tap(resData=>{
      //Itt a lejárati dátumot állítjuk be a responseDataban megkapott expiresIn értéket alapul véve majd pedig 1000-el megszorozva
      this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn,resData.displayName);
    }))
  }

  autoLogin(){
   const userData: {
    email: string,
    userId: string,
    displayName: string,
    _token: string,
    _tokenExpirationDate: string

   } = JSON.parse(sessionStorage.getItem('userData') || '{}');

    if(!userData){
      return;
    }

    const loadedUser = new User(userData.email,userData.userId,userData.displayName,userData._token,new Date(userData._tokenExpirationDate));

    if(loadedUser.token){
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }


  }

  logout(){
    this.user.next(null);
    sessionStorage.removeItem('userData');
    this.router.navigate(['login']);

    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }

    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout(()=>{
      this.logout();
    },expirationDuration);
  }

  private handleAuthentication(email: string,userId: string, token: string, expiresIn: number,displayName:string){
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email,userId,displayName,token,expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    this.router.navigate(['']);
    sessionStorage.setItem('userData',JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse){
    let errorMessage = 'An unknown error occured'
    if(!errorRes.error || !errorRes.error.error){
      return throwError(errorMessage);
    }

    switch(errorRes.error.error.message){
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'A megadott e-mail cím nem található';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'A megadott jelszó helytelen';
        break;
      case 'USER_DISABLED':
        errorMessage = 'A felhasználói fiók deaktiválva lett az adminisztrátor által';
        break;
      case 'EMAIL_EXISTS':
          errorMessage = 'Ez az e-mail cím már foglalt'
        break;
    }

    return throwError(errorMessage);
  }
}
