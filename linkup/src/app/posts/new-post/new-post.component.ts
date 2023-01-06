import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.sass']
})
export class NewPostComponent implements OnInit {

  newPostForm: FormGroup = new FormGroup({});
  constructor(private postsService: PostService) { }

  ngOnInit(): void {
    this.newPostForm = new FormGroup({
      'message': new FormControl(null,[Validators.required])
    });

    interval(2000)
    .subscribe(() => {
      this.postsService.getPosts();
    });
  }

  onNewPost(){
    const value = this.newPostForm.get('message')?.value;
    this.postsService.savePost(value);
    this.newPostForm.reset();
    window.scroll(0,0);
  }

}
