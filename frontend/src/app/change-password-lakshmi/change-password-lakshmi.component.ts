import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import custom validator to validate that password and confirm password fields match
import { PasswordMatch } from '../_helpers/password-match.validator';


@Component({
  selector: 'app-change-password-lakshmi',
  templateUrl: './change-password-lakshmi.component.html',
  styleUrls: ['./change-password-lakshmi.component.scss']
})
export class ChangePasswordLakshmiComponent implements OnInit {
  
  changePasswordForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
      this.changePasswordForm = this.formBuilder.group({
          oldpassword: ['', [Validators.required, Validators.minLength(6)]],
          newpassword: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', Validators.required]
      }, {
          validator: PasswordMatch('newpassword', 'confirmPassword')
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.changePasswordForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.changePasswordForm.invalid) {
          return;
      }

      alert('Password Changed Successfully' )
  }

}
