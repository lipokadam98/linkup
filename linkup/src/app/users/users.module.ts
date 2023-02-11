import { UserComponent } from './user/user.component';
import { UsersComponent } from './users.component';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { UserDetailComponent } from './user-detail/user-detail.component';
import {RouterLinkWithHref} from "@angular/router";
import {PostsModule} from "../posts/posts.module";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [UsersComponent,UserComponent, UserDetailComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        RouterLinkWithHref,
        PostsModule,
        MatIconModule
    ]
})
export class UsersModule{

}
