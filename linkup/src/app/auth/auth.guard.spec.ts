import {TestBed} from '@angular/core/testing';

import {AuthGuard} from './auth.guard';
import {provideMockStore} from "@ngrx/store/testing";

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        provideMockStore()
      ]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
