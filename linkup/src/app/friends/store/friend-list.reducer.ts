

import * as FriendListActions from './friend-list.actions';

import { Friend } from './../model/friend.model';

export interface FriendListState {
  friends: Friend[];
  selectedFriendIndex: number;
}

const initialState: FriendListState = {
  friends: [],
  selectedFriendIndex: -1
};

export function friendListReducer(
  state: FriendListState = initialState,
  action: FriendListActions.FriendListActions
):FriendListState  {
  switch (action.type) {
    case FriendListActions.ADD_FRIEND:
      return {
        ...state,
        friends: [...state.friends, action.payload],
      };
      case FriendListActions.DELETE_FRIEND:
        const friendList = state.friends.slice();
        friendList.splice(action.payload,1);

        return {
          ...state,
          friends: [...friendList]
        };
    default:
      return state;
  }
}
