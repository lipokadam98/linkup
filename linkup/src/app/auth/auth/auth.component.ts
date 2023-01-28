import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RegistrationComponent } from './../registration/registration.component';
import { AuthService, AuthResponseData } from '../../services/auth-services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit, OnDestroy {
  authFormGroup: FormGroup = new FormGroup({});
  authSub = new Subscription();

  constructor(private authService: AuthService,private matDialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.authFormGroup = new FormGroup({
      'email': new FormControl(null,[Validators.required,Validators.email]),
      'password': new FormControl(null,[Validators.required,Validators.minLength(6)])
    });

    if(this.authService.user.value){
      this.router.navigate(['']);
    }
  }

  ngOnDestroy(): void {
   this.authSub.unsubscribe();
  }


  authenticate(){

    if(!this.authFormGroup.valid){
      return;
    }

    const email = this.authFormGroup.get('email')?.value;
    const password = this.authFormGroup.get('password')?.value;

    this.authSub = this.authService.signIn(email,password).subscribe({
       error: (error)=>{
          this.handleAuthError(error);
       }
    });

  }

  handleAuthError(error: string){
    Swal.fire({
      title: 'Hiba történt a bejelentkezés során!',
      text: error,
      icon: 'error',
      confirmButtonText: 'Ok'
    });
  }

  onRegistration(){
    this.matDialog.open(RegistrationComponent,
    {
      disableClose: true,
      panelClass: 'dialog-style'
    });
  }

  emailValidation(){

      if (this.authFormGroup.get('email')?.hasError('required')) {
        return 'E-mail cím megadása kötelező';
      }

      return this.authFormGroup.get('email')?.hasError('email') ? 'Nem helyes e-mail formátum' : '';
  }

  passwordValidation(){
    if (this.authFormGroup.get('password')?.hasError('required')) {
      return 'Jelszó megadása kötelező';
    }

    return this.authFormGroup.get('password')?.hasError('minlength') ? 'A jelszó hossza nem megfelelő' : '';
  }

}
