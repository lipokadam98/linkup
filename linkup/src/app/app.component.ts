import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "./state/app.state";
import {autoLogin} from "./state/auth/auth.actions";
import {selectAuthUser} from "./state/auth/auth.selectors";
import {User} from "./shared/models/user.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  title = 'linkup';
  user: User | null = null;
  constructor(private store: Store<AppState>){

  }

  ngOnInit(): void {

    this.store.select(selectAuthUser).subscribe(user=>{
      this.user = user;
    });

   this.store.dispatch(autoLogin());
  }
}
