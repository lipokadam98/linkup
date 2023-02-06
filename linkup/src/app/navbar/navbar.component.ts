import {User} from '../shared/models/user.model';
import {Component, OnInit} from '@angular/core';
import {AppState} from "../state/app.state";
import {Store} from "@ngrx/store";
import {selectAuthUser} from "../state/auth/auth.selectors";
import {logout} from "../state/auth/auth.actions";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  friendList: string[] = [];

  user: User | null = null;

  constructor(private store: Store<AppState>) {

  }

  ngOnInit(): void {

    this.store.select(selectAuthUser).subscribe(user=>{
      this.user = user;
    });

    for(let i = 0; i < 30; i ++){
      this.friendList.push(''+i);
    }
  }

  logout(){
    this.store.dispatch(logout());
  }

}
