import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-forgotpassword-lakshmi',
  templateUrl: './forgotpassword-lakshmi.component.html',
  styleUrls: ['./forgotpassword-lakshmi.component.scss']
})

export class ForgotpasswordLakshmiComponent implements OnInit {

  ForgotPasswordForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.ForgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      });
   }

 // convenience getter for easy access to form fields
 get f() { return this.ForgotPasswordForm.controls; }

  onSubmit()
  {
    this.submitted = true;
     // stop here if form is invalid
     if (this.ForgotPasswordForm.invalid) {
      return;
  }

  alert('An activation link is sent to the Email Id\n\n');
  }


}


