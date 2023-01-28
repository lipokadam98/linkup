import { RouterModule } from '@angular/router';
import { FriendsModule } from './../friends/friends.module';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from './navbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftSideNavComponent } from './left-side-nav/left-side-nav.component';
import { RightSideNavComponent } from './right-side-nav/right-side-nav.component';

@NgModule({
  declarations: [NavbarComponent,LeftSideNavComponent,RightSideNavComponent],
  imports: [
    CommonModule,
    MatIconModule,
    FriendsModule,
    RouterModule
  ],
  exports:[NavbarComponent]
})
export class NavbarModule { }
