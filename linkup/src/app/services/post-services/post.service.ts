import { Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Post } from 'src/app/posts/model/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService{

  private posts: Post[] = [];
  postSubject = new BehaviorSubject<Post[]>([]);

  constructor() { }

  getPost(index: number){
    return this.posts[index];
  }

  getPosts(){
    this.postSubject.next(this.posts.slice());
  }

  addPost(post: Post){
    this.posts.push(post);
    this.postSubject.next(this.posts.slice());
  }

  addPosts(posts: Post[]){
    this.posts = [];
    this.posts.push(...posts);
    this.postSubject.next(this.posts.slice());
  }

  deletePost(id: string | undefined){
    const foundPost = this.posts.find( (post: Post)=> post.id === id);
    if(foundPost){
      this.posts.splice(this.posts.indexOf(foundPost),1);
    }
    this.postSubject.next(this.posts);
  }

}
