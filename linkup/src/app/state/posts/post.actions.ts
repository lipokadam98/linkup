import {createAction, props} from "@ngrx/store";
import {Post} from "../../posts/model/post.model";

export const createPostSuccess = createAction(
  '[Posts Page] Create Post Success'
)

export const createPostFailure = createAction(
  '[Posts Page] Create Post Failure',
     props<{error: string}>()
)

export const getPostsByUserId = createAction(
  '[User Posts Page] Get Posts by UserId',
  props<{userId: string}>()
)

export const loadUserPosts = createAction(
  '[User Posts Page] Load Posts by UserId',
  props<{posts: Post[]}>()
)

export const deletePostSuccess = createAction(
  '[Posts Page] Delete Post Success'
)

export const deletePostFailure = createAction(
  '[Posts Page] Delete Post Failure',
  props<{error: string}>()
)

export const createPost = createAction(
  '[Posts Page] Create Post',
  props<{message: string,image: string | undefined}>()
)

export const deletePost = createAction(
  '[Posts Page] Delete Post',
        props<{id: string}>()
)

export const loadPosts = createAction('[Posts Api] Load Posts');

export const loadPostsFailure = createAction(
  '[Posts Api] Load Posts Failure ',
  props<{error: string}>()
);

export const loadPostsSuccess = createAction(
  '[Posts Api] Load Posts Success ',
  props<{posts: Post[]}>()
);



