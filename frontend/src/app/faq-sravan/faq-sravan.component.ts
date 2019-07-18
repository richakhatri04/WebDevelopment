// Authored by Sravan Sajeev [B00825856]
import { Component, OnInit } from '@angular/core';
import { FAQService } from '../f-aq.service';

@Component({
  selector: 'app-faq-sravan',
  templateUrl: './faq-sravan.component.html',
  styleUrls: ['./faq-sravan.component.scss']
})
export class FaqSravanComponent implements OnInit {
  result: any ;
  constructor(public faq_service:FAQService) { }



  ngOnInit() {

    // On page load, fetching all FAQs
    this.faq_service.getFaq().subscribe(faq =>
      {
    this.result = faq // assigning to variable to result (JSON object)
     })
}

}


