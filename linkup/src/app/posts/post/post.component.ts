import { PostDataStorageService } from './../../shared/post-data-storage.service';
import { User } from './../../shared/models/user.model';
import { AuthService } from './../../services/auth.service';
import { Post } from '../model/post.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass']
})
export class PostComponent implements OnInit {

  @Input()
  post: Post | undefined;

  canDelete = false;
  user: User | undefined;

  constructor(private authService: AuthService,private postDataStorageService: PostDataStorageService) {

  }

  ngOnInit(): void {
    this.canDelete = this.authService.user.value?.id === this.post?.userId;
  }

  removePost(){
    this.postDataStorageService.deletePost(this.post?.id);
  }

}
