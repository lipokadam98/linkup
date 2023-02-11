import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/shared/models/user.model";
import {
  addUser,
  getUserDetailById,
  loadUserDetailById,
  loadUsers,
  loadUsersFailure,
  loadUsersSuccess,
  removeUser
} from "./user.actions";
import {autoLogin} from "../auth/auth.actions";


export interface UsersState {
  users: User[];
  selectedUser: User | undefined;
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: UsersState = {
  users: [],
  selectedUser: undefined,
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

  on(getUserDetailById, (state)=> ({
    ...state,
    selectedUser: undefined
  })),

  on(loadUserDetailById, (state, {user})=> ({
    ...state,
    selectedUser: user
  })),

  on(removeUser,(state,{id})=> ({
    ...state,
    users: state.users.filter((user)=> user.userId !== id)
  })),

  on(loadUsers, (state)=> ({
    ...state,
    status: 'loading'
  })),

  on(autoLogin, (state)=> ({
    ...state
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
