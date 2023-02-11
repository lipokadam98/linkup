import {Post} from "../../posts/model/post.model";
import {createReducer, on} from "@ngrx/store";
import {
  createPostFailure,
  createPostSuccess,
  createPost,
  deletePost,
  loadPosts,
  loadPostsFailure,
  loadPostsSuccess, deletePostSuccess, deletePostFailure
} from "./post.actions";

export interface PostsState{
  posts: Post[],
  deleteId: string | null,
  message: string | null,
  error: string | null,
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: PostsState = {
  posts: [],
  message: null,
  deleteId: null,
  error: null,
  status: 'pending'
}

export const postReducer = createReducer(
  initialState,

  on(createPost, (state,{message}) => ({
    ...state,
    message: message
  })),

  on(createPostSuccess, (state) => ({
    ...state,
    message: null
  })),

  on(createPostFailure, (state, {error}) => ({
    ...state,
    message: null,
    error: error
  })),

  on(deletePost,(state,{id})=> ({
    ...state,
    deleteId: id,
    posts: state.posts.filter((post)=> post.id !== id)
  })),

  on(deletePostSuccess, (state) => ({
    ...state,
    deleteId: null
  })),

  on(deletePostFailure, (state, {error}) => ({
    ...state,
    deleteId: null,
    error: error
  })),

  on(loadPosts, (state)=> ({
    ...state,
    status: 'loading'
  })),

  on(loadPostsFailure, (state, {error})=> ({
    ...state,
    status: 'error',
    error: error
  })),

  on(loadPostsSuccess, (state, {posts})=> ({
    ...state,
    error: null,
    status: 'success',
    posts: posts
  })),
)
