import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {AppState} from "../app.state";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
  addUser,
  getUserDetailById,
  loadUserDetailById,
  loadUsers,
  loadUsersFailure,
  loadUsersSuccess
} from "./user.actions";
import {from, map, of, switchMap, withLatestFrom} from "rxjs";
import {UserDataStorageService} from "../../services/user-services/user-data-storage.service";
import {catchError} from "rxjs/operators";
import {selectUsers} from "./user.selectors";

/**
 * Effects are listening to actions being dispatched and can make async calls towards backend services.
 *The way we can react to actions is because we need to inject the Actions into our constructor,
 * after that we will have the stream of actions and can differentiate between action types
 */
@Injectable()
export class UserEffects{

  constructor(
              private actions$: Actions,
              private store: Store<AppState>,
              private userDataStorageService: UserDataStorageService) {
  }

  loadUsers$ = createEffect(()=>
    this.actions$.pipe(
      ofType(loadUsers),
      switchMap(()=>
        from(this.userDataStorageService.getAllUsers()).pipe(
          map((users) => loadUsersSuccess({users: users})),
          catchError((error)=> of(loadUsersFailure({error})))
        )
      )
    )
  );

  saveUser$ = createEffect(()=>
  this.actions$.pipe(
    ofType(addUser),
    withLatestFrom(this.store.select(selectUsers)),
    switchMap(([action])=> from(this.userDataStorageService.createUser(action.user))
    )
  ),
    {dispatch: false}
  )

  loadUserDetails$ = createEffect(()=>
    this.actions$.pipe(
      ofType(getUserDetailById),
      withLatestFrom(this.store.select(selectUsers)),
      switchMap(([action])=>
        from(this.userDataStorageService.getUserById(action.id)).pipe(
          map( (user) =>{
            return loadUserDetailById({user: user})
          })
        )
      )
    )
  );
}


