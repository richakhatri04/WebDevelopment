import { Component, OnInit } from '@angular/core';
import { notEqual } from 'assert';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-donations-ajith',
  templateUrl: './donations-ajith.component.html',
  styleUrls: ['./donations-ajith.component.scss']
})
export class DonationsAjithComponent implements OnInit {
  
  monthly:boolean = false;
  onetime:boolean = true;
  hundered:boolean = false;
  fivehundered:boolean =false;
  thousand:boolean =false;
  isdonation:boolean =false;
  ismessage:boolean =false;
  MessageForCharity:string ="";
  DonationAmount: number;
  constructor(private toastr: ToastrService) { }
  
  ngOnInit() {
    this.monthly=false;
    this.onetime=true;
    this.hundered = false;
    this.fivehundered =false;
    this.thousand =false;
    this.isdonation=false;
    this.ismessage=false;
    this.MessageForCharity="";
  }
  
  payDonations()
  {
    
    if( !this.hundered && !this.fivehundered && !this.thousand && this.DonationAmount == undefined){
      this.isdonation =true;
    }
    else{
      this.isdonation=false;
    }
    if(this.MessageForCharity =="" || this.MessageForCharity==null ||this.MessageForCharity== undefined){
      this.ismessage=true;
      
    }
    else{
      this.ismessage=false;
    }
    if( !this.isdonation && !this.ismessage){
      this.toastr.success('Just a message for Assignment 1 UI', 'Donation paied Successfuly', {
        timeOut: 5000,
        closeButton: true,
        progressBar: true
      });
    }
    
  }
  monthlyDonation(){
    this.monthly=true;
    this.onetime=false;
  }
  oneTimeDonation(){
    this.monthly=false;
    this.onetime=true;
  }
  hundredrupees(){
    this.hundered=true;
    this.fivehundered =false;
    this.thousand = false;
  }
  fivehundredrupees(){
    this.fivehundered =true;
    this.hundered=false;
    this.thousand = false;
  }
  thousandhundredrupees(){
    this.thousand = true;
    this.hundered=false;
    this.fivehundered =false;
  }
  otherAmount(){
    this.thousand = false;
    this.hundered=false;
    this.fivehundered =false;
  }
}
