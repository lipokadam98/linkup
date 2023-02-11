import {AppState} from "../app.state";
import {createSelector} from "@ngrx/store";
import {UsersState} from "./user.reducer";

export const selectUsers = (state: AppState) => state.users;
export const selectAllUsers = createSelector(
  selectUsers,
  (state: UsersState) => state.users
);

export const getLoadingState = createSelector(
  selectUsers,
  (state: UsersState) => state.status
);

export const getErrorState = createSelector(
  selectUsers,
  (state: UsersState) => state.error
)

export const getSelectedUser = createSelector(
  selectUsers,
  (state: UsersState) => state.selectedUser
)
