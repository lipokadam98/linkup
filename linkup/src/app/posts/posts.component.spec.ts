import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsComponent } from './posts.component';
import {provideMockStore} from "@ngrx/store/testing";
import {PostDataStorageService} from "../services/post-services/post-data-storage.service";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../../environments/environment";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {NewPostComponent} from "./new-post/new-post.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsComponent,NewPostComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore())
      ],
      providers: [ provideMockStore(), PostDataStorageService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
