import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../shared/models/user.model";

@Component({
  selector: 'app-left-side-nav',
  templateUrl: './left-side-nav.component.html',
  styleUrls: ['./left-side-nav.component.sass']
})
export class LeftSideNavComponent implements OnInit {

  @Input() user: User | null = null;

  constructor() { }

  ngOnInit(): void {
  }

}
