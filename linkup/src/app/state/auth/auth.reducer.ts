import {User} from "../../shared/models/user.model";
import {createReducer, on} from "@ngrx/store";

import {authFailure, authSuccess, logout, signUp} from "./auth.actions";

export interface AuthState {
  user: User | null;
  error: string | null;
  email: string | null;
  password: string | null;
  displayName: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: AuthState = {
  user: null,
  email: null,
  password: null,
  displayName: null,
  error: null,
  status: 'pending'
}

export const authReducer = createReducer(
  initialState,

  on(authSuccess, (state, {user})=> ({
    ...state,
    user: user
  })),

  on(signUp, (state, {email,password,displayName}) =>({
    ...state,
    password: password,
    email: email,
    displayName: displayName,
    status: 'pending',
    error: null
  })),

  on(authFailure, (state, {error})=> ({
    ...state,
    user: null,
    error: error,
    status: 'error'
  })),

  on(logout, (state)=> ({
    ...state,
    user: null,
    error: null,
    status: 'pending'
  }))
)
