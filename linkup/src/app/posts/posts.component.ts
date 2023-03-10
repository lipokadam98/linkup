import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../state/app.state";
import {loadPosts} from "../state/posts/post.actions";
import {selectAllPosts} from "../state/posts/post.selectors";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.sass']
})
export class PostsComponent implements OnInit {
  public posts$ = this.store.select(selectAllPosts);

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(loadPosts());
  }

}
