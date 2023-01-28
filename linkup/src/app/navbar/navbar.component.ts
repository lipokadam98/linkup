import { User } from './../shared/models/user.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  friendList: string[] = [];
  isLoggedIn: boolean = false;
  userSubscription: Subscription = new Subscription();
  user: User | null = null;

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {

   this.userSubscription = this.authService.user.subscribe(userData=>{
    this.user = userData;
   })

    for(let i = 0; i < 30; i ++){
      this.friendList.push(''+i);
    }
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }

  logout(){
    this.authService.logout();
  }

}
