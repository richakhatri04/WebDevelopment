//Authored by Aparna Sridhar [B00799570]
import { Component, OnInit } from '@angular/core';
import { EventManagementService } from '../event-management.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.sevice';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
allevents:{};
user:string;
temp:any;
user_id: string;
isloggedin:boolean = false;
  constructor( 
    private eventser: EventManagementService, private toaster: ToastrService, private authser: AuthService
  ) {}

  ngOnInit() {
    this.eventser.getEvents().subscribe(events => {
      var i;
       this.allevents = events;
       console.log(this.allevents);
// Locks the register button for the eventuploader
       for(i in this.allevents){
        
        this.user= this.authser.getToken();
        if (this.user){
        this.user_id = this.authser.getUserId();
    
        if (this.user_id === this.allevents[i]["eventUploader"]["userId"]){
          this.isloggedin = true;
          console.log("Match found!");
        }
        }
        else {
          this.isloggedin = false; 
        }
      }
    })
}

//Toast alert for registeration
  register(){
    
    this.toaster.success('Your registeration was successful', 'Success', {
      timeOut: 5500,
      closeButton: true,
      progressBar: true
    });
  }

//Toast alert for sharing
  share(){
    this.toaster.success('Event shared!!!', 'Success', {
      timeOut: 5500,
      closeButton: true,
      progressBar: true
    });
  }

}
