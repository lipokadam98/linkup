import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {AppState} from "../../state/app.state";
import {Store} from "@ngrx/store";
import {createPost} from "../../state/posts/post.actions";
import {DOC_ORIENTATION, NgxImageCompressService} from "ngx-image-compress";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.sass']
})
export class NewPostComponent implements OnInit{

  newPostForm: FormGroup = new FormGroup({});

  uploadedImage: string | undefined;
  constructor(private store: Store<AppState>,
              private imageCompress: NgxImageCompressService) { }

  ngOnInit(): void {

    this.newPostForm = new FormGroup({
      'message': new FormControl(null,[Validators.required])
    });

  }

  processImage(imageInput: any){
    const file = imageInput.target.files[0]
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.uploadedImage = event.target.result;
      if(this.uploadedImage){
        this.imageCompress.compressFile(this.uploadedImage,DOC_ORIENTATION.Default,45, 45).then((result)=>{
          this.uploadedImage = result;
        })
      }

    });
    reader.readAsDataURL(file);
  }

  onCancelImage(){
    this.uploadedImage = undefined;
  }


  onNewPost(){
    const value = this.newPostForm.get('message')?.value;
    this.store.dispatch(createPost({message: value, image: this.uploadedImage}))
    this.newPostForm.reset();
    this.onCancelImage();
    window.scroll(0,0);
  }

}
