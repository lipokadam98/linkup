import { TestBed } from '@angular/core/testing';

import { PostDataStorageService } from './post-data-storage.service';
import {provideMockStore} from "@ngrx/store/testing";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../../../environments/environment";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";

describe('DatastorageService', () => {
  let service: PostDataStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore())
      ],
      providers: [provideMockStore()]
    });
    service = TestBed.inject(PostDataStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
