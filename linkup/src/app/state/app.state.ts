import {UsersState} from "./users/user.reducer";
import {AuthState} from "./auth/auth.reducer";
import {PostsState} from "./posts/post.reducer";

export interface AppState{
  users: UsersState,
  user: AuthState,
  posts: PostsState
}
