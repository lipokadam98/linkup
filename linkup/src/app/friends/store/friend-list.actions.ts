import { Friend } from './../model/friend.model';
import { Action } from "@ngrx/store";

export const ADD_FRIEND = 'ADD_FRIEND';
export const DELETE_FRIEND = 'DELETE_FRIEND';


export class AddFriend implements Action{
 readonly type = ADD_FRIEND;

  constructor(public payload: Friend){

  }
}

export class DeleteFriend implements Action{
  readonly type = DELETE_FRIEND;

  constructor(public payload: number){

  }
}

export type FriendListActions = AddFriend | DeleteFriend;

