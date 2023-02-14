import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {AppState} from "../app.state";
import {AuthService} from "../../services/auth-services/auth.service";
import {addUser} from "../users/user.actions";
import {from, map, of, switchMap, withLatestFrom} from "rxjs";
import {catchError} from "rxjs/operators";
import {selectAll} from "./auth.selectors";
import {authFailure, storeUser, autoLogin, logout, signIn, signUp} from "./auth.actions";
import {User} from "../../shared/models/user.model";

@Injectable()
export class AuthEffects{

  constructor(private actions$: Actions,
              private store: Store<AppState>,
              private authService: AuthService) {
  }

  //Ezt is érdemes megfontolni hogy egyik effect hívhat e más statehez tartozó actiont mivel így a másik actionhöz tartozó error kezelése nehézkes
  signUp$ = createEffect(()=>
      this.actions$.pipe(
        ofType(signUp),
        withLatestFrom(this.store.select(selectAll)),
        switchMap(([action])=> from(this.authService.signUp(action.email,action.password,action.displayName)).pipe(
          map((data) => {
            const expirationDate = new Date(new Date().getTime() + +data.expiresIn * 1000);
            const user = new User(data.email,data.localId,data.displayName,data.idToken,expirationDate);
            addUser({user: user})
            return storeUser({user: user})
          }),
          catchError((error)=> {
            return of(authFailure({error}));
          })
        ))
      )
  )


  signIn$ = createEffect(()=>
      this.actions$.pipe(
        ofType(signIn),
        withLatestFrom(this.store.select(selectAll)),
        switchMap(([action])=> from(this.authService.signIn(action.email,action.password)).pipe(
            map(data=> {
              const expirationDate = new Date(new Date().getTime() + +data.expiresIn * 1000);
              const user = new User(data.email,data.localId,data.displayName,data.idToken,expirationDate);
              addUser({user: user})
              return storeUser({user: user})
            }),
            catchError((error)=> {
              return of(authFailure({error}));
            })
          )
        )
      )
  )

  logout$ = createEffect(()=>
    this.actions$.pipe(
      ofType(logout),
      switchMap(()=> this.authService.logout())
    ),
    {dispatch: false}
  )

  autoLogin$ = createEffect(()=>
    this.actions$.pipe(
      ofType(autoLogin),
      switchMap(()=> from(this.authService.autoLogin()).pipe(
          map(data=> {
            if(data){
              if(data.userId){
                return storeUser({user: data});
              }else{
                return storeUser({user: null})
              }

            } else{
              return authFailure({error: 'Hiba az auto login során a token érvényességi ideje lejárt!'})
            }
          })
        )
      )
    )
  )

}

