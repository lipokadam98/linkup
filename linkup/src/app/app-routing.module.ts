import {UsersComponent} from './users/users.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {AuthGuard} from './auth/auth.guard';
import {AuthComponent} from './auth/auth/auth.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserDetailComponent} from "./users/user-detail/user-detail.component";

const routes: Routes = [
  {path: '', canActivate: [AuthGuard], component: WelcomeComponent},
  {path: 'login', component: AuthComponent},
  {path: 'users',canActivate: [AuthGuard], component: UsersComponent},
  {path: 'users/:id',canActivate: [AuthGuard], component: UserDetailComponent},
  {path: '**', canActivate: [AuthGuard], component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
