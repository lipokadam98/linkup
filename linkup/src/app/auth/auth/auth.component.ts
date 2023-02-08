import {Router} from '@angular/router';
import {Subscription, take} from 'rxjs';
import {RegistrationComponent} from '../registration/registration.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import {Store} from "@ngrx/store";
import {AppState} from "../../state/app.state";
import {getAuthUserError, selectAuthUser} from "../../state/auth/auth.selectors";
import {signIn} from "../../state/auth/auth.actions";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit, OnDestroy {
  authFormGroup: FormGroup = new FormGroup({});
  authSub = new Subscription();
  constructor(private matDialog: MatDialog,
              private router: Router,
              private store: Store<AppState>) { }

  ngOnInit(): void {
    this.authFormGroup = new FormGroup({
      'email': new FormControl(null,[Validators.required,Validators.email]),
      'password': new FormControl(null,[Validators.required,Validators.minLength(6)])
    });

    this.store.select(selectAuthUser).pipe(take(1)).subscribe(user=>{
      if(user){
        this.router.navigate(['']).then();
      }
    });
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

    this.store.dispatch(signIn({email,password}));

    this.authSub = this.store.select(getAuthUserError).subscribe(error=>{
      if(error){
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
    }).then();
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
