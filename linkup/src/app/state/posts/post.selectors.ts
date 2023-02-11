import {AppState} from "../app.state";
import {createSelector} from "@ngrx/store";
import {PostsState} from "./post.reducer";

export const selectPosts = (state: AppState) => state.posts;
export const selectAllPosts = createSelector(
  selectPosts,
  (state: PostsState) => state.posts
);

export const selectPostsStatus = createSelector(
  selectPosts,
  (state: PostsState) => state.status
);

export const selectPostsError= createSelector(
  selectPosts,
  (state: PostsState) => state.error
);

export const selectMessage = createSelector(
  selectPosts,
  (state: PostsState) => state.message
);

export const selectDeleteId = createSelector(
  selectPosts,
  (state: PostsState) => state.deleteId
);
