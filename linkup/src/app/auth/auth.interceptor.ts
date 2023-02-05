import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, take} from 'rxjs';
import {AppState} from "../state/app.state";
import {Store} from "@ngrx/store";
import {selectAuthUser} from "../state/auth/auth.selectors";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store<AppState>) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this.store.select(selectAuthUser).pipe(take(1)).subscribe((userData)=>{
        console.log(userData);
    });


    return next.handle(request);
  }
}
