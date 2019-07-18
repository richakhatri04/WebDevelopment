import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EventManagementService } from '../event-management.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.sevice';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {

  sub:any;
  event_id:string;
  singleEvent:any;
  currentUserId: string; 
  userDetails: any;
  isLoading: boolean = false;
  isloggedin:boolean = false;
 userType: string;

  constructor(
    private toastr: ToastrService, private eventdetail: EventManagementService,private router: Router,
    private route: ActivatedRoute, private auth: AuthService
  ) { }

  ngOnInit() {
    this.userType = this.auth.getUserType();
    console.log (this.userType);
    if(this.userType === 'Organization'){
      this.isloggedin = false; 
    }
    else {
      this.isloggedin = true;
    }
    
// Locks the register button for the eventuploader    
  
    this.isLoading = true;
    this.sub = this.route.params.subscribe(params => {
      this.isLoading = false;
      this.event_id = params['id']; 
      console.log(this.event_id);});
this.eventdetail.getsingleEvent(this.event_id).subscribe( singleModel =>{
 this.singleEvent = singleModel;

});

this.currentUserId = this.auth.getUserId(); 
this.auth.getUserById(this.currentUserId).subscribe ( UserDet => {
  this.userDetails = UserDet;
} )
  }

  eventRegister(){
    if(!this.currentUserId){
      this.toastr.error('Please Log in to register', 'Error', {
        timeOut: 5500,
        closeButton: true,
        progressBar: true
      });
      setTimeout(()=>{  
        this.router.navigate(['/login']);
         }, 2000);
      
    }
    else {
      this.eventdetail.sendEmail({'email': this.userDetails["email"], 'eventName': this.singleEvent.eventName, 
      'eventDate': this.singleEvent.eventDate,
      'eventVenue': this.singleEvent.location
       });
    
      this.toastr.success('You are registered for the event', 'SUCCESS!', {
        timeOut: 5500,
        closeButton: true,
        progressBar: true
      });
    }
    
  }

}
