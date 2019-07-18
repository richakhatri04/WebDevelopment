//Developer - Dheeraj Varshney B00808467 dh301823@dal.ca
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
    
  submitted:boolean = false;
  pwdForgotForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email])
    
  })
    
  constructor() { }

  ngOnInit() {
  }
    
    pwdForgotbtn()
    {
      this.submitted=true;
    }
  
  }


