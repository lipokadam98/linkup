import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../shared/models/user.model";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {

  @Input() user: User | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
