import { Post } from './../posts/post/post.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class PostService{

  posts: Post[] = [];
  postSubject = new BehaviorSubject<Post[]>([]);

  constructor(private httpClient: HttpClient) { }


  getPosts(){
   return this.httpClient.get<{[key: string]: Post}>("https://linkup-8c013-default-rtdb.europe-west1.firebasedatabase.app/posts.json?print=pretty").pipe(map(responseData => {
     const postsArray = [];
     for(const key in responseData){
      if(responseData.hasOwnProperty(key)){
        postsArray.push({...responseData[key], id: key});
      }
     }

     return postsArray as Post[];
    })).subscribe(data=>{
      this.posts = data;
      this.postSubject.next(this.posts);
    });
  }

  savePost(message: string,userName?: string){
    this.httpClient.post("https://linkup-8c013-default-rtdb.europe-west1.firebasedatabase.app/posts.json",{
      message: message
    }).subscribe( ()=>{
      this.getPosts();
    }
    );
  }
}
