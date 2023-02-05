import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {AppState} from "../app.state";
import {AuthService} from "../../services/auth-services/auth.service";
import {addUser} from "../users/user.actions";
import {from, map, of, switchMap, withLatestFrom} from "rxjs";
import {catchError} from "rxjs/operators";
import {selectAll} from "./auth.selectors";
import {authFailure, signUp} from "./auth.actions";
import {User} from "../../shared/models/user.model";

@Injectable()
export class AuthEffects{

  constructor(private actions$: Actions,
              private store: Store<AppState>,
              private authService: AuthService) {
  }

  signUp$ = createEffect(()=>
      this.actions$.pipe(
        ofType(signUp),
        withLatestFrom(this.store.select(selectAll)),
        switchMap(([action])=> from(this.authService.signUp(action.email,action.password,action.displayName)).pipe(
          map((user) => {
            return addUser({user: new User(user.email,user.localId,user.displayName,null,null,new Date())})
          }),
          catchError((error)=> {
            return of(authFailure({error}));
          })
        ))
      ),
    {dispatch: true}
  )
}
