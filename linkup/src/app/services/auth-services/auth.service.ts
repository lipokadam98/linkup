import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {User} from '../../shared/models/user.model';

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
export class AuthService{

  private tokenExpirationTimer: any;

  constructor(private httpClient: HttpClient,
              private router: Router) {
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
      return Promise.resolve();
    }

    const loadedUser = new User(userData.email,userData.userId,userData.displayName,userData._token,new Date(userData._tokenExpirationDate));

    if(loadedUser.token){
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }

    return Promise.resolve(loadedUser);
  }

  logout(){
    sessionStorage.removeItem('userData');
    this.router.navigate(['login']).then();
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    return Promise.resolve();
  }

  private autoLogout(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout(()=>{
      this.logout().then();
    },expirationDuration);
  }

  private handleAuthentication(email: string,userId: string, token: string, expiresIn: number,displayName:string){
    const user = new User(email,userId,displayName,token,new Date(new Date().getTime() + expiresIn * 1000));
    this.autoLogout(expiresIn * 1000);
    this.router.navigate(['']).then();
    sessionStorage.setItem('userData',JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse){
    let errorMessage = 'An unknown error occured'
    if(!errorRes.error || !errorRes.error.error){
      return throwError(()=> new Error(errorMessage));
    }

    switch(errorRes.error.error.message){
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'E-mail not found';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Incorrect password';
        break;
      case 'USER_DISABLED':
        errorMessage = 'User was disabled';
        break;
      case 'EMAIL_EXISTS':
          errorMessage = 'This e-mail already exists'
        break;
    }

    return throwError(()=> new Error(errorMessage));
  }
}
