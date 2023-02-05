import {User} from '../../shared/models/user.model';
import {Post} from '../model/post.model';
import {Component, Input, OnInit} from '@angular/core';
import {PostDataStorageService} from 'src/app/services/post-services/post-data-storage.service';
import {Store} from "@ngrx/store";
import {AppState} from "../../state/app.state";
import {selectAuthUser} from "../../state/auth/auth.selectors";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass']
})
export class PostComponent implements OnInit {

  @Input()
  post: Post | undefined;

  canDelete = false;

  user: User | null | undefined;

  constructor(private store: Store<AppState>,
              private postDataStorageService: PostDataStorageService) {

  }

  ngOnInit(): void {
    this.store.select(selectAuthUser).subscribe(user=>{
      this.user = user;
      this.canDelete = this.user?.userId === this.post?.userId;
    });
  }

  removePost(){
    this.postDataStorageService.deletePost(this.post?.id);
  }

  getUserName(){
    if(this.post?.userId === this.user?.userId){
      return this.user?.displayName;
    }

    return "Anonymus";
  }


}
