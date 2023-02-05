import { UserComponent } from './user/user.component';
import { UsersComponent } from './users.component';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [UsersComponent,UserComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        MatProgressSpinnerModule
    ]
})
export class UsersModule{

}
