import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-right-side-nav',
  templateUrl: './right-side-nav.component.html',
  styleUrls: ['./right-side-nav.component.sass']
})
export class RightSideNavComponent implements OnInit {

  @Input() friendList: string[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
