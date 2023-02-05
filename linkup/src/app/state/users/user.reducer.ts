import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/shared/models/user.model";
import { addUser, loadUsers, loadUsersFailure, loadUsersSuccess, removeUser } from "./user.actions";


export interface UsersState {
  users: User[];
  newUser: User | null;
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: UsersState = {
  users: [],
  newUser: null,
  error: null,
  status: 'pending'
}

export const userReducer = createReducer(
  initialState,

  on(addUser, (state, {user})=> ({
    ...state,
    newUser: user,
    users: [...state.users, user]
  })),

  on(removeUser,(state,{id})=> ({
    ...state,
    users: state.users.filter((user)=> user.userId !== id)
  })),

  on(loadUsers, (state)=> ({
    ...state,
    status: 'loading'
  })),

  on(loadUsersFailure, (state, {error})=> ({
    ...state,
    status: 'error',
    error: error
  })),

  on(loadUsersSuccess, (state, {users})=> ({
    ...state,
    error: null,
    status: 'success',
    users: users
  })),


)
