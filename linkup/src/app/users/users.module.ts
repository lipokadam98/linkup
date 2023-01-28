import { UserComponent } from './user/user.component';
import { UsersComponent } from './users.component';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
  declarations: [UsersComponent,UserComponent],
  imports: [
    CommonModule
  ]
})
export class UsersModule{

}
