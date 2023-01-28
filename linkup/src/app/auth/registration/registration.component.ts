import { UserDataStorageService } from '../../services/user-services/user-data-storage.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-services/auth.service';
import { Component, OnInit,OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  signUpFormGroup: FormGroup  = new FormGroup({});
  signUpSub = new Subscription();
  constructor(private dialogRef: MatDialogRef<RegistrationComponent>,
              private authService: AuthService,
              private userDataStorageService: UserDataStorageService) { }

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

  onClose(){
    this.dialogRef.close();
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

    this.signUpSub = this.authService.signUp(email,password,displayName).subscribe({
      next: (data)=>{
        this.userDataStorageService.createUser(data).then(()=>{
          this.dialogRef.close();
        });
      },
      error: (data)=>{
        this.handleSignUpError(data);
      }
   });
}


handleSignUpError(error: string){
  Swal.fire({
    title: 'Hiba történt a regisztráció során!',
    text: error,
    icon: 'error',
    confirmButtonText: 'Ok'
  });
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
