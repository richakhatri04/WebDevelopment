import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../auth.sevice';
import { AdoptionService } from '../adoption.service';
import  * as jsPDF from 'jspdf';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-adoptions',
  templateUrl: './my-adoptions.component.html',
  styleUrls: ['./my-adoptions.component.scss']
})
export class MyAdoptionsComponent implements OnInit {

  current_user_id: string;
  userAdopter: any;

  constructor(
    private authService: AuthService,
    private adoptionService: AdoptionService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.current_user_id=this.authService.getUserId();
    this.adoptionService.adopterUser(this.current_user_id).subscribe(adoptUser=>{
      this.userAdopter=adoptUser;
      console.log(this.userAdopter);
    });
  }

  @ViewChild('content') content : ElementRef;

  downloadPDF(){
    let doc = new jsPDF();
    let specialElementHandlers = {
      '#editor': function(element, renderer){
        return true;
      }
    };

    let content = this.content.nativeElement;

    doc.fromHTML(content.innerHTML,15,15,{
      'width': 250,
      'elementHandlers': specialElementHandlers
    });

    doc.save('Adoption_Request.pdf');
  }
  deleteAdoption(delete_id){
    console.log(delete_id);
    this.adoptionService.deleteAdoption(delete_id);
    this.toastr.warning('Adoption request deleted!', 'SUCCESS!', {
      timeOut: 5500,
      closeButton: true,
      progressBar: true
    });
    setTimeout(()=>{  
      window.location.reload();
       }, 2000);
  }
}
