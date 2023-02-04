import {AppState} from "../app.state";
import {createSelector} from "@ngrx/store";
import {UsersState} from "./user.reducer";

export const selectUsers = (state: AppState) => state.users;
export const selectAllUsers = createSelector(
  selectUsers,
  (state: UsersState) => state.users
);
