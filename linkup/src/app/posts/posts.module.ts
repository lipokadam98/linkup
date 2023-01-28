import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { PostsComponent } from './posts.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPostComponent } from './new-post/new-post.component';
import { PostComponent } from './post/post.component';

@NgModule({
  declarations: [PostsComponent,NewPostComponent,PostComponent],
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTooltipModule
  ],
  exports: [PostsComponent]
})
export class PostsModule { }
