/** Author : Shehzeen B00812551 */
import {
  Component,
  OnInit
 } from '@angular/core';
 import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  AbstractControl
 } from '@angular/forms';
 import {
  MustMatch
 } from '../helper/must-match.validator';
 
 /**
  * Component
  */
 @Component({
  selector: 'app-change-password-shehzeen',
  templateUrl: './change-password-shehzeen.component.html',
  styleUrls: ['./change-password-shehzeen.component.scss']
 })
 export class ChangePasswordShehzeenComponent implements OnInit {
  emailPattern: string = '^[a-zA-Z0-9*_.-]+@[a-zA-Z]+[.][a-zA-Z]{2,3}$';
 
  changePasswordForm: FormGroup;
  submitted = false;
 
  constructor(private formBuilder: FormBuilder) {}
 
 
 
 
 
 /**
  * on init This function runs on the initializing of the component and intanCiate the changepassword form with validators and the must watch validator is taken from the 
  * following link https://jasonwatmore.com/post/2018/11/07/angular-7-reactive-forms-validation-example inorder to do the comparasion between the new and the old password
  */
 ngOnInit() {
   this.changePasswordForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required]
   }, {
    validator: MustMatch('password', 'confirmPassword')
   });
 
 
  }
  /**
   * Gets f The getter funtion for the change password form
   */
  get f() {
   return this.changePasswordForm.controls;
  }
 

  /**
   * This function runs on the submition of the chang password form and checks whether the fields has been submitted properly or not.
   *    * @returns  
   */
  onSubmit() {
   this.submitted = true;
 
   // stop here if form is invalid
   if (this.changePasswordForm.invalid) {
    return;
   }
 
   alert('Successfully submitted form');
  }
 
  
 
 
 }