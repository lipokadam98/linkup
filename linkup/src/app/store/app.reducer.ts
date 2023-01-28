import { FriendListState,friendListReducer } from './../friends/store/friend-list.reducer';

import { ActionReducerMap } from '@ngrx/store';

export interface AppState{
  friendList: FriendListState;
}

export const appReducer: ActionReducerMap<AppState,any> = {
  friendList: friendListReducer
}
