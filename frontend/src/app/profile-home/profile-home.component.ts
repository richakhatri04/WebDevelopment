// Developer : Aditya Gadhvi (B00809664)

import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../auth.sevice';
import { empty } from 'rxjs';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-profile-home',
  templateUrl: './profile-home.component.html',
  styleUrls: ['./profile-home.component.scss']
})

export class ProfileHomeComponent implements OnInit {

  userData: {  };
  orgData:{ };
  personal:boolean=false;
  current_user_type:any;
  editField: boolean = false;
  editRowID: any ='';
  editRowValue: any ='';
  submitted: boolean = false;

  namePattern: string = '^([a-zA-Z_\-]*)$';
  emailPattern: string = '^[a-zA-Z0-9*_.-]+@[a-zA-Z]+[.][a-zA-Z]{2,3}$';
  phoneNumberPattern: string = '^[\(][0-9]{3}[\)][\-][\(][0-9]{3}[\)][\-][\(][0-9]{4}[\)]$|[0-9]{10}|[0-9]{3}-[0-9]{3}-[0-9]{4}';
  datePattern: string = '^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$';

  updateProfileForm = new FormGroup({
    firstName: new FormControl('', Validators.pattern(this.namePattern)),
    lastName: new FormControl('',Validators.pattern(this.namePattern)),
    orgName:new FormControl('',Validators.pattern(this.namePattern)),
    orgEmail:new FormControl('',Validators.pattern(this.emailPattern)),
    orgPhone: new FormControl('',Validators.pattern(this.phoneNumberPattern)),
    orgReg: new FormControl('',Validators.pattern(this.phoneNumberPattern)),
    email: new FormControl('',[Validators.email,Validators.pattern(this.emailPattern)]),
    phone: new FormControl('',Validators.pattern(this.phoneNumberPattern)),
    address: new FormControl(''),
    pincode: new FormControl(''),
    dob: new FormControl('')
  })


  constructor(
    private titleService:Title,
    private authService:AuthService,
    private toaster: ToastrService
    ){
    this.titleService.setTitle("Dashboard - StraySpirit");
   }

  ngOnInit() {

    //The following code will get the userId of the logged in user and then it will retrieve all the data of the logged in user and then display it on the profile page.
    var userId=this.authService.getUserId();
    this.current_user_type=this.authService.getUserType();

    if(this.current_user_type==='personal'){
      this.personal=true;

      this.authService.getUserById(userId).subscribe(user=>{
        this.userData=user;

        console.log(this.userData);

        this.updateProfileForm.controls.firstName.patchValue(this.userData["firstName"]);
        this.updateProfileForm.controls.lastName.patchValue(this.userData["lastName"]);
        this.updateProfileForm.controls.email.patchValue(this.userData["email"]);
        this.updateProfileForm.controls.phone.patchValue(this.userData["phoneNumber"]);
        this.updateProfileForm.controls.address.patchValue(this.userData["address"]);
        this.updateProfileForm.controls.pincode.patchValue(this.userData["pinCode"]);
        this.updateProfileForm.controls.dob.patchValue(this.userData["dateOfBirth"]);
        });

    }
    else{
      this.personal=false;

      this.authService.getOrgById(userId).subscribe(user=>{
        this.userData=user;
        console.log(this.userData);


        this.updateProfileForm.controls.orgName.patchValue(this.userData["organizationtName"]);
        //console.log(this.updateProfileForm.controls.userName.value);
        this.updateProfileForm.controls.orgEmail.patchValue(this.userData["email"]);
        this.updateProfileForm.controls.orgPhone.patchValue(this.userData["phoneNumber"]);
        this.updateProfileForm.controls.orgReg.patchValue(this.userData["registrationNumber"]);
        this.updateProfileForm.controls.address.patchValue(this.userData["address"]);
        this.updateProfileForm.controls.pincode.patchValue(this.userData["pinCode"]);
        });

    }


    }

  updateSubmit(){

    if(this.current_user_type==='personal'){

      var user_id=this.authService.getUserId();
      this.userData={
        firstNameModel: this.updateProfileForm.get('firstName').value,
        lastNameModel: this.updateProfileForm.get('lastName').value,
        emailModel: this.updateProfileForm.get('email').value,
        phoneNumberModel: this.updateProfileForm.get('phone').value,
        addressModel: this.updateProfileForm.get('address').value,
        pincodeModel: this.updateProfileForm.get('pincode').value,
        dobModel:this.updateProfileForm.get('dob').value
      }
      console.log(this.userData);
      this.authService.updateUserData(user_id,this.userData);
      this.toaster.success('User Profile Updated!', 'SUCCESS!', {
        timeOut: 5500,
        closeButton: true,
        progressBar: true
      });
      location.reload();
    }
    else{

      console.log("organization");

      var user_id=this.authService.getUserId();
      this.userData={
        orgNameModel: this.updateProfileForm.get('orgName').value,
        orgEmailModel: this.updateProfileForm.get('orgEmail').value,
        phoneNumberModel: this.updateProfileForm.get('orgPhone').value,
        regNumberModel:this.updateProfileForm.get('orgReg').value,
        addressModel: this.updateProfileForm.get('address').value,
        pincodeModel: this.updateProfileForm.get('pincode').value

      }
      console.log(this.userData);
      this.authService.updateOrgData(user_id,this.userData);
      location.reload();

    }

  }

  Edit(val,rowVal){
    this.editRowID = val;
    this.editRowValue = rowVal;
    this.editField = true;
  }
}
