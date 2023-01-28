import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit} from '@angular/core';
import { PostDataStorageService } from 'src/app/services/post-services/post-data-storage.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.sass']
})
export class NewPostComponent implements OnInit{

  newPostForm: FormGroup = new FormGroup({});

  constructor(private postDataStorageService: PostDataStorageService) { }

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
