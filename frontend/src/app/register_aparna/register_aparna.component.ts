//Authored by Aparna Sridhar[B00799570]
import { Component, OnInit } from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register_aparna.component.html',
  styleUrls: ['./register_aparna.component.scss']
})
export class RegisterAparnaComponent implements OnInit {
 registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required,Validators.pattern("^[a-zA-Z]*")]),
    Name: new FormControl('', [Validators.required,Validators.pattern("^[a-zA-Z]*")]),
    lastName: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z]*")]),
    pincode: new FormControl('', [Validators.required, Validators.pattern("^[0-9a-zA-Z]*")]),
    phoneNumber: new FormControl('', Validators.required),
    orgphone: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    orgemail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]),
  orgpassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]),
   repassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]),
 Orgrepassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(12)])
  })
  constructor() { }

  ngOnInit() {
  }

}
 
