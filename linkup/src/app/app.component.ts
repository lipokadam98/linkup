import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  title = 'linkup';

  constructor(private authService: AuthService){

  }

  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
