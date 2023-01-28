import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthComponent } from './auth/auth/auth.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', canActivate: [AuthGuard], component: WelcomeComponent},
  {path: 'login', component: AuthComponent},
  {path: 'newpost', canActivate: [AuthGuard], component: NewPostComponent},
  {path: '**', canActivate: [AuthGuard], component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
