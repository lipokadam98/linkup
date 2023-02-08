import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';
import {PostsComponent} from "../posts/posts.component";
import {PostDataStorageService} from "../services/post-services/post-data-storage.service";
import {provideMockStore} from "@ngrx/store/testing";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../../environments/environment";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {NewPostComponent} from "../posts/new-post/new-post.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeComponent,PostsComponent,NewPostComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore())
      ],
      providers: [PostDataStorageService,provideMockStore()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
