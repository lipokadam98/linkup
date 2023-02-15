import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../state/app.state";
import {User} from "../shared/models/user.model";
import {selectAuthUser} from "../state/auth/auth.selectors";
import {loadUsers} from "../state/users/user.actions";
import {selectAllUsers} from "../state/users/user.selectors";

export interface Message{
  userId?: string;
  message: string;
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.sass']
})
export class MessagesComponent implements OnInit {

  messages: Message[] = [];
  public allUsers$ = this.store.select(selectAllUsers);
  user: User | null = null;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {

    this.store.dispatch(loadUsers());

    this.store.select(selectAuthUser).subscribe(user=>{
      this.user = user;
    });
  }

  addMessage(message: string){
      let userMessage: Message = {
        userId: this.user?.userId,
        message: message
      }
      this.messages.push(userMessage);

    let otherMessage: Message = {
      userId: 'other',
      message: 'OK'
    }
    this.messages.push(otherMessage);
  }

}
