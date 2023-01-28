import { PostDataStorageService } from '../shared/post-data-storage.service';
import { Observable } from 'rxjs';
import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';
import { Post } from '../posts/model/post.model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.sass']
})
export class WelcomeComponent implements OnInit {

  posts : Observable<Post[]> = new Observable<Post[]>();

  constructor(private postDataStorageService: PostDataStorageService,private postService: PostService) { }


  ngOnInit(): void {
    this.postDataStorageService.getAllPosts();

    this.posts = this.postService.postSubject.asObservable();


    console.log(this.posts);
  }

}
