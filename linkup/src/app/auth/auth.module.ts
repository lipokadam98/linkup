import { MatIconModule } from '@angular/material/icon';
import { AuthInterceptor } from './auth.interceptor';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthComponent } from './auth/auth.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import {MatDialogModule} from '@angular/material/dialog';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [AuthComponent, RegistrationComponent],
  imports: [
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],

})
export class AuthModule { }
