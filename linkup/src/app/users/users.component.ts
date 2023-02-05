import {addUser, loadUsers, removeUser} from '../state/users/user.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../shared/models/user.model';
import {getLoadingState, selectAllUsers} from "../state/users/user.selectors";
import {AppState} from "../state/app.state";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit {

  public allUsers$ = this.store.select(selectAllUsers);
  status: string | undefined;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(loadUsers());

    this.store.select(getLoadingState).subscribe((status)=>{
        this.status = status;
    });
  }
  addUser(){
    console.log("user was added");
    this.store.dispatch(addUser({user: new User("example","1","asdasdasdas")}));
  }

  removeUser(user: User){
    this.store.dispatch(removeUser({id: user.userId}))
  }

}
