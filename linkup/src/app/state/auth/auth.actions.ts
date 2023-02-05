import {createAction, props} from "@ngrx/store";
import {User} from "../../shared/models/user.model";

export const authSuccess = createAction(
  '[Auth API] Success',
  props<{ user: User}>()
)

export const signUp = createAction(
  '[Auth API] SignUp',
  props<{ email: string, password: string, displayName: string}>()
)

export const signIn = createAction(
  '[Auth API] SignIn',
  props<{ email: string, password: string}>()
)

export const authFailure = createAction(
  '[Auth API] Failure',
  props<{ error: string}>()
)

export const logout = createAction(
  '[Auth Page] Logout'
)
