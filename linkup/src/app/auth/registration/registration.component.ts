import {Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import {Store} from "@ngrx/store";
import {AppState} from "../../state/app.state";
import {signUp} from "../../state/auth/auth.actions";
import {getAuthUserError} from "../../state/auth/auth.selectors";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  signUpFormGroup: FormGroup  = new FormGroup({});
  signUpSub = new Subscription();
  constructor(private dialogRef: MatDialogRef<RegistrationComponent>,
              private store: Store<AppState>) { }

  ngOnInit(): void {
    this.signUpFormGroup = new FormGroup({
        email: new FormControl(null,[Validators.required,Validators.email]),
        surname: new FormControl(null,Validators.required),
        givenName: new FormControl(null,Validators.required),
        password: new FormControl(null, [Validators.required,Validators.minLength(6)])
    });
  }

  ngOnDestroy(): void {
    this.signUpSub.unsubscribe();
  }

  onSignUp(){
    if(!this.signUpFormGroup.valid){
      return;
    }

    const email = this.signUpFormGroup.get('email')?.value;
    const password = this.signUpFormGroup.get('password')?.value;
    const surname = this.signUpFormGroup.get('surname')?.value;
    const givenName = this.signUpFormGroup.get('givenName')?.value;

    const displayName = surname + ' '+ givenName;

    this.store.dispatch(signUp({email,password,displayName}));

    //Javítani kell az error kezelésen
   this.store.select(getAuthUserError).subscribe(error=>{
      if(error){
        this.handleSignUpError(error);
      }else{
        this.dialogRef.close();
      }
    });

}


handleSignUpError(error: string){
  Swal.fire({
    title: 'Hiba történt a regisztráció során!',
    text: error,
    icon: 'error',
    confirmButtonText: 'Ok'
  }).then();
}

emailValidation(){

  if (this.signUpFormGroup.get('email')?.hasError('required')) {
    return 'E-mail cím megadása kötelező';
  }

  return this.signUpFormGroup.get('email')?.hasError('email') ? 'Nem helyes e-mail formátum' : '';
}

passwordValidation(){
  if (this.signUpFormGroup.get('password')?.hasError('required')) {
    return 'Jelszó megadása kötelező';
  }

  return this.signUpFormGroup.get('password')?.hasError('minlength') ? 'A jelszó hossza nem megfelelő' : '';
}

}
