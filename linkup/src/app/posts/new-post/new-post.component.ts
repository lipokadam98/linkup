import { PostDataStorageService } from '../../shared/post-data-storage.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from './../../services/post.service';
import { Component, OnInit} from '@angular/core';
import { interval } from 'rxjs';
import { Post } from '../model/post.model';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.sass']
})
export class NewPostComponent implements OnInit{

  newPostForm: FormGroup = new FormGroup({});

  constructor(private postsService: PostService,
              private postDataStorageService: PostDataStorageService) { }

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
    this.postDataStorageService.createPost(value);
    this.newPostForm.reset();
    window.scroll(0,0);
  }

}
