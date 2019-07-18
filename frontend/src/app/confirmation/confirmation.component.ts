import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.sevice';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  token:any;
  token_id: string;
  userDetail: any;
  updateUser:any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.token = this.route.params.subscribe(params => {
      this.token_id = params['token'];
      console.log(this.token_id);
      this.auth.getUserToken(this.token_id).subscribe( userToken=>{
        console.log(userToken);
        this.userDetail = userToken;
        console.log(this.userDetail);
        this.updateUser={
          firstNameModel: this.userDetail[0]["firstName"],
          lastNameModel: this.userDetail[0]["lastName"],
          emailModel: this.userDetail[0]["email"],
          phoneNumberModel: this.userDetail[0]["phoneNumber"],
          isActiveModel: true,
          adminModel: this.userDetail[0]["adminStatus"]
        }
        this.auth.updateUserData(this.userDetail[0]["_id"],this.updateUser);
      } )

});

  }

}
