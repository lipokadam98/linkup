import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendComponent } from './friend/friend.component';



@NgModule({
  declarations: [FriendComponent],
  imports: [
    CommonModule
  ],
  exports: [FriendComponent]
})
export class FriendsModule { }
