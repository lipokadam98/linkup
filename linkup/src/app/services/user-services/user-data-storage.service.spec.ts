import { TestBed } from '@angular/core/testing';

import { UserDataStorageService } from './user-data-storage.service';
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../../../environments/environment";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";

describe('UserDataStorageService', () => {
  let service: UserDataStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore())
      ]
    });
    service = TestBed.inject(UserDataStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
