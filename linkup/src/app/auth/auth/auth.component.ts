import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import {Store} from "@ngrx/store";
import {AppState} from "../../state/app.state";
import {getAuthUserError, selectAuthUser} from "../../state/auth/auth.selectors";
import {signIn, signUp} from "../../state/auth/auth.actions";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit, OnDestroy {
  authFormGroup: FormGroup = new FormGroup({});
  authSub = new Subscription();

  isLogin = true;
  constructor(private matDialog: MatDialog,
              private router: Router,
              private store: Store<AppState>) { }

  ngOnInit(): void {
    this.authFormGroup = new FormGroup({
      'email': new FormControl(null,[Validators.required,Validators.email]),
      'username': new FormControl(null,[Validators.required]),
      'password': new FormControl(null,[Validators.required,Validators.minLength(6)])
    });

    this.store.select(selectAuthUser).subscribe(user=>{
      if(user){
        this.router.navigate(['']).then();
      }
    });
  }

  ngOnDestroy(): void {
   this.authSub.unsubscribe();
  }


  authenticate(){

    const email = this.authFormGroup.get('email')?.value;
    const password = this.authFormGroup.get('password')?.value;
    const displayName = this.authFormGroup.get('username')?.value;

    if(this.isLogin){
      this.store.dispatch(signIn({email,password}));
    }else{
      this.store.dispatch(signUp({email,password,displayName}));
    }

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

  checkDisabled(){
    if(this.isLogin){
      if(!this.authFormGroup.get('password')?.invalid &&
        !this.authFormGroup.get('email')?.invalid){
        return false;
      }
    }else{
      if(!this.authFormGroup.get('username')?.invalid &&
        !this.authFormGroup.get('password')?.invalid &&
        !this.authFormGroup.get('email')?.invalid){
        return false;
      }
    }
    return true;
  }

  switchMode(){
    this.isLogin = !this.isLogin;
  }

  emailValidation(){

      if (this.authFormGroup.get('email')?.hasError('required')) {
        return 'You must provide an e-mail address';
      }

      return this.authFormGroup.get('email')?.hasError('email') ? 'E-mail format is not correct' : '';
  }

  passwordValidation(){
    if (this.authFormGroup.get('password')?.hasError('required')) {
      return 'You must provide a password';
    }

    return this.authFormGroup.get('password')?.hasError('minlength') ? 'The password must be at least 6 characters' : '';
  }

}
