import {createAction, props} from "@ngrx/store";
import {User} from "../../shared/models/user.model";

export const storeUser = createAction(
  '[Auth API] Success',
  props<{ user: User | null}>()
)

export const signUp = createAction(
  '[Auth API] SignUp',
  props<{ email: string, password: string, displayName: string}>()
)

export const signIn = createAction(
  '[Auth API] SignIn',
  props<{ email: string, password: string}>()
)

export const autoLogin = createAction(
  '[Auth Page] AutoLogin',
)

export const authFailure = createAction(
  '[Auth API] Failure',
  props<{ error: string}>()
)

export const logout = createAction(
  '[Auth Page] Logout'
)
