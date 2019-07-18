import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { FormGroup, FormControl, Validators, AbstractControl, NgForm } from '@angular/forms';
import { Router } from "@angular/router"
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.sevice';
@Component({
  selector: 'app-forgot-password-richa',
  templateUrl: './forgot-password-richa.component.html',
  styleUrls: ['./forgot-password-richa.component.scss']
})
export class ForgotPasswordRichaComponent implements OnInit {
  // isLinear = false;
  submitted: boolean = false;

  validateUserFormGroup = new FormGroup({
    securityAnswer: new FormControl('', Validators.required)
   })
   changePasswordFormGroup = new FormGroup({
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    oldPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
   });  

  constructor() {}
  ngOnInit() {}
}
