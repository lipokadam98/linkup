import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
  friendList: string[] = [];
  constructor() { }

  ngOnInit(): void {

    for(let i = 0; i < 30; i ++){
      this.friendList.push(''+i);
    }
  }

}
