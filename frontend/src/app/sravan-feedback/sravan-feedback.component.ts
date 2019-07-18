// Authored by Sravan Sajeev [B00825856]
import { Component, OnInit } from '@angular/core';
import { FAQService } from '../f-aq.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-sravan-feedback',
  templateUrl: './sravan-feedback.component.html',
  styleUrls: ['./sravan-feedback.component.scss']
})
export class SravanFeedbackComponent implements OnInit {
text = '';
Message ={};

  constructor(public faq_service:FAQService, private toastr: ToastrService) { }

 // Passing the feedback message to service 
onSubmit(){
   this.Message = {Message: this.text}
   this.faq_service.sendFeedback(this.Message);
   // Success on submission
   this.toastr.success('Feedback submitted!', 'Thank You!');
   // Refreshing the page after a delay
   this.delay(1000).then(any=>{
    this.refresh();
    });
   

  
}

//https://stackoverflow.com/questions/37764665/typescript-sleep (Adding a delay for refreshing the page after success message)
  async delay(ms: number) {
  await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("Delay added"));
 }

refresh(): void {
  window.location.reload();
}

  ngOnInit() {
  }

}
