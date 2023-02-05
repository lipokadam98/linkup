import {UsersState} from "./users/user.reducer";
import {AuthState} from "./auth/auth.reducer";

export interface AppState{
  users: UsersState,
  user: AuthState
}
