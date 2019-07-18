import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sravan-changepassword',
  templateUrl: './sravan-changepassword.component.html',
  styleUrls: ['./sravan-changepassword.component.scss']
})
export class SravanChangepasswordComponent {
  n_password : string ='';
  show : boolean = false;
  
  toggle() {
    this.show = true;
  }

}
