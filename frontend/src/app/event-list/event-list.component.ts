//Authored by Aparna Sridhar [B00799570]
import { Component, OnInit } from '@angular/core';
import { EventManagementService } from '../event-management.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.sevice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
allevents:{};
user:string;
temp:any;
user_id: string;
currentUserId: string; 
userDetails: any;
isloggedin:boolean = false;
userType: string;

  constructor( private eventser: EventManagementService, private toaster: ToastrService, private authser: AuthService, private router: Router) { }

  ngOnInit() {
    this.userType = this.authser.getUserType();
    console.log (this.userType);
    if(this.userType === 'Organization'){
      this.isloggedin = false; 
    }
    else {
      this.isloggedin = true;
    }
    this.eventser.getEvents().subscribe(events => {
      var i;
       this.allevents = events;
       console.log(this.allevents);
       // Locks register button for event uploaders
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
    this.currentUserId = this.authser.getUserId(); 
    this.authser.getUserById(this.currentUserId).subscribe ( UserDet => {
      this.userDetails = UserDet;
    } )

  }
// Toast alert for registeration
  register(id:any){
    if(!this.currentUserId){
      this.toaster.error('Please Log in to register', 'Error', {
        timeOut: 5500,
        closeButton: true,
        progressBar: true
      });
      setTimeout(()=>{  
        this.router.navigate(['/login']);
         }, 2000);
      
    }
    else {
      this.eventser.sendEmail({'email': this.userDetails["email"], 'eventName':this.allevents[id]["eventName"],
      'eventDate': this.allevents[id]["eventDate"],
      'eventVenue': this.allevents[id]["location"]
       });
      this.toaster.success('Your registeration was successful', 'Success', {
        timeOut: 5500,
        closeButton: true,
        progressBar: true
      });
    }
    
  }


}
