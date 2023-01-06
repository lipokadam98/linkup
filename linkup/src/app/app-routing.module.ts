import { WelcomeComponent } from './welcome/welcome.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'newpost', component: NewPostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
