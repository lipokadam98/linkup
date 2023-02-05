import { AuthService } from '../services/auth-services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import {Store} from "@ngrx/store";
import {AppState} from "../state/app.state";
import {selectAuthUser} from "../state/auth/auth.selectors";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router,
              private store: Store<AppState>){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.store.select(selectAuthUser).pipe(take(1),map(user=>{
        const isAuth =  !!user;
        if(isAuth){
         return true;
        }

        return this.router.createUrlTree(['/login']);
     }))
  }

}
