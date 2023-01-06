import { Observable, Subscription } from 'rxjs';
import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';
import { Post } from '../posts/post/post.model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.sass']
})
export class WelcomeComponent implements OnInit {

  posts : Observable<Post[]> = new Observable<Post[]>();

  constructor(private postService: PostService) { }


  ngOnInit(): void {
    this.postService.getPosts();

    this.posts = this.postService.postSubject.asObservable();


    console.log(this.posts);
  }

}
