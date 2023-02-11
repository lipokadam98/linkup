import {Injectable} from "@angular/core";
import {PostDataStorageService} from "../../services/post-services/post-data-storage.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {AppState} from "../app.state";
import {
  createPost,
  createPostFailure,
  createPostSuccess, deletePost, deletePostFailure, deletePostSuccess, getPostsByUserId,
  loadPosts,
  loadPostsFailure,
  loadPostsSuccess, loadUserPosts
} from "./post.actions";
import {from, map, of, switchMap, withLatestFrom} from "rxjs";
import {catchError} from "rxjs/operators";
import {Post} from "../../posts/model/post.model";
import {selectAll, selectDeleteId, selectMessage} from "./post.selectors";

@Injectable()
export class PostsEffects{

  constructor(private postDataStorageService: PostDataStorageService,
              private store: Store<AppState>,
              private actions$: Actions) {
  }

  loadPosts$ = createEffect(()=>
    this.actions$.pipe(
      ofType(loadPosts),
      switchMap(()=>
        from(this.postDataStorageService.getAllPosts()).pipe(
          map( (posts) =>{
            posts.sort((a: Post, b: Post) => {
              return new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime();
            })
            return loadPostsSuccess({posts: posts})
          }),
          catchError((error)=>of(loadPostsFailure({error})))
        )
      )
    )
  );

  createPost$ = createEffect(()=>
    this.actions$.pipe(
      ofType(createPost),
      withLatestFrom(this.store.select(selectMessage)),
      switchMap(([action])=> from(this.postDataStorageService.createPost(action.message)).pipe(
        map(()=> createPostSuccess()),
        catchError((error)=> of(createPostFailure({error: error})))
          )
        )
      )
    );

  deletePost$ = createEffect(()=>
    this.actions$.pipe(
      ofType(deletePost),
      withLatestFrom(this.store.select(selectDeleteId)),
      switchMap(([action])=> from(this.postDataStorageService.deletePost(action.id)).pipe(
          map(()=> deletePostSuccess()),
          catchError((error)=> of(deletePostFailure({error: error})))
      )
    )
   )
  );

  loadUserPosts$ = createEffect(()=>
    this.actions$.pipe(
      ofType(getPostsByUserId),
      withLatestFrom(this.store.select(selectAll)),
      switchMap(([action])=>
        from(this.postDataStorageService.getPostsByUserId(action.userId)).pipe(
          map( (posts) =>{
            posts.sort((a: Post, b: Post) => {
              return new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime();
            })
            return loadUserPosts({posts: posts})
          })
        )
      )
    )
  );
}
