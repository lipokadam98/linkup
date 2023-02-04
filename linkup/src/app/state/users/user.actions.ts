import { User } from '../../shared/models/user.model';
import {createAction, props} from "@ngrx/store";

export const addUser = createAction(
  '[Users Page] Add User',
  props<{user: User}>()
)

export const removeUser = createAction(
  '[Users Page] Remove User',
  props<{ id: string}>()
)

export const loadUsers = createAction('[Users Page] Load Users');

export const loadUsersSuccess = createAction(
  '[Users API] Load Success',
  props<{ users: User[]}>()
);

export const loadUsersFailure = createAction(
  '[Users API] Load Failure',
  props<{ error: string}>()
);
