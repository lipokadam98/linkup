import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {AppState} from "../../state/app.state";
import {Store} from "@ngrx/store";
import {createPost} from "../../state/posts/post.actions";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.sass']
})
export class NewPostComponent implements OnInit{

  newPostForm: FormGroup = new FormGroup({});

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {

    this.newPostForm = new FormGroup({
      'message': new FormControl(null,[Validators.required])
    });

  }

  processImage(imageInput: any){
    console.log(imageInput);
  }

  onNewPost(){
    const value = this.newPostForm.get('message')?.value;
    this.store.dispatch(createPost({message: value}))
    this.newPostForm.reset();
    window.scroll(0,0);
  }

}
