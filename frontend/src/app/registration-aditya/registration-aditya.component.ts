// Developer: Aditya Gadhvi (B00809664) (ad742065@dal.ca)

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-registration-aditya',
  templateUrl: './registration-aditya.component.html',
  styleUrls: ['./registration-aditya.component.scss']
})
export class RegistrationAdityaComponent implements OnInit {
  

  userForm = new FormGroup({
    firstNameInput : new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z]*$")]),
    lastNameInput : new FormControl ('',[Validators.required,Validators.pattern("^[a-zA-Z]*$")]),
    numberInput:new FormControl('',[Validators.required,Validators.pattern("^[\(][0-9]{3}[\)][\-][\(][0-9]{3}[\)][\-][\(][0-9]{4}[\)]$|[0-9]{10}|[0-9]{3}-[0-9]{3}-[0-9]{4}")]),
    emailInput : new FormControl('',[Validators.required,Validators.email,Validators.pattern("^[a-zA-Z0-9*_.-]+@[a-zA-Z]+[.][a-zA-Z]{2,3}$")]),
    passwordInput : new FormControl('',Validators.required),
    cPasswordInput : new FormControl('',Validators.required)
    
  });
  

  constructor() { }

  ngOnInit() {
    
  }

 

}


