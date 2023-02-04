import { UserComponent } from './user/user.component';
import { UsersComponent } from './users.component';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [UsersComponent,UserComponent],
    imports: [
        CommonModule,
        MatButtonModule
    ]
})
export class UsersModule{

}
