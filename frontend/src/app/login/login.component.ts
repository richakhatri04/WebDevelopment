// Developer : Aditya Gadhvi (B00809664)

import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { FormGroup, FormControl, Validators, AbstractControl, NgForm } from '@angular/forms';
import { Router } from "@angular/router"
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.sevice';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  emailPattern: string = '^[a-zA-Z0-9*_.-]+@[a-zA-Z]+[.][a-zA-Z]{2,3}$';

  submitted: boolean = false;

 public userLoginData:any={} 
 public orgLoginData:any={} 


   userLoginForm = new FormGroup({
    emailLogin: new FormControl('', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]),
     passwordLogin: new FormControl('', Validators.required)
   })

   orgLoginForm = new FormGroup({
     emailLogin: new FormControl('', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]),
     passwordLogin: new FormControl('', Validators.required)
   })

  constructor(private titleService: Title, private router: Router,public authService:AuthService) {
    this.titleService.setTitle("Login to StraySpirit");
  }

  ngOnInit() {
    var token=this.authService.getToken();
    if(token){
      this.router.navigate(['/profile']);
    }
  }
  
  //This method will be executed when the user clicks on Sign in button located on the user login tab on the login page.
  loginUserSubmit(form:NgForm) {
    this.userLoginData={
      email:this.userLoginForm.get('emailLogin').value,
      password:this.userLoginForm.get('passwordLogin').value
    }
    this.authService.userLogin(
     this.userLoginData
    )
  }

  //This method will be executed when the user clicks on Sign in button located on the organization login tab on the login page.
  loginOrgSubmit(form:NgForm) {
    this.orgLoginData={
      email:this.orgLoginForm.get('emailLogin').value,
      password:this.orgLoginForm.get('passwordLogin').value
    }
    this.authService.orgLogin(
     this.orgLoginData
    )
  }

  }

