import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "./state/app.state";
import {autoLogin} from "./state/auth/auth.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  title = 'linkup';
  constructor(private store: Store<AppState>){

  }

  ngOnInit(): void {
   this.store.dispatch(autoLogin());
  }
}
