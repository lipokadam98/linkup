import { Post } from './post.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass']
})
export class PostComponent implements OnInit {

  @Input()
  post!: Post;

  constructor() { }

  ngOnInit(): void {
  }

}
