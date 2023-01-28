import { Component, OnInit } from '@angular/core';
import { PostDataStorageService } from '../services/post-services/post-data-storage.service';
import { PostService } from '../services/post-services/post.service';
import { Observable } from 'rxjs';
import { Post } from './model/post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.sass']
})
export class PostsComponent implements OnInit {

  posts : Observable<Post[]> = new Observable<Post[]>();

  constructor(private postDataStorageService: PostDataStorageService,
              private postService: PostService) { }

  ngOnInit(): void {
    this.postDataStorageService.getAllPosts();
    this.posts = this.postService.postSubject.asObservable();
  }

}
