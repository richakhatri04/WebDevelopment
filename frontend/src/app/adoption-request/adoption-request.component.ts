import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PetmanagementService } from '../petmanagement.service';
import { AdoptionService } from '../adoption.service';
import { ActivatedRoute, Router } from '@angular/router';
import  * as jsPDF from 'jspdf';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-adoption-request',
  templateUrl: './adoption-request.component.html',
  styleUrls: ['./adoption-request.component.scss']
})
export class AdoptionRequestComponent implements OnInit {

  constructor(
    private petService: PetmanagementService,
    private adoptionService: AdoptionService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  sub: any;
  petId: string;
  petAdoptDetail: any;
  adoptionModel: any;
  filteredPetAdoptDetail: any;

  ngOnInit() {
    
    this.sub = this.route.params.subscribe(params => {
      this.petId = params['id']; 
      console.log(this.petId);
    }) 
    this.adoptionService.adoptPetById(this.petId).subscribe(petAdopt=>{
      this.petAdoptDetail=petAdopt;
      console.log(this.petAdoptDetail);
    })
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

  editAdopt(adoptionStatus:string, adoptionId:string, adoptUserId:string){
    // console.log(adoptionStatus);
    this.filteredPetAdoptDetail = this.petAdoptDetail.filter(filteredPetAdopt =>{
      
      return filteredPetAdopt.petAdopter.userId.includes(adoptUserId) && filteredPetAdopt._id.includes(adoptionId);
    })
    console.log("Filtered content",this.filteredPetAdoptDetail);
    this.adoptionModel={
      prevPetModel: this.filteredPetAdoptDetail[0]["prevPet"],
      curPetModel: this.filteredPetAdoptDetail[0]["curPet"],
      firstPetModel: this.filteredPetAdoptDetail[0]["firstPet"],
      adopterPetFamilyModel: this.filteredPetAdoptDetail[0]["adopterPetFamily"],
      petBehaviourModel: this.filteredPetAdoptDetail[0]["petBehaviour"],
      petHomeModel: this.filteredPetAdoptDetail[0]["petHome"],
      travelModel: this.filteredPetAdoptDetail[0]["travel"],
      vacciModel: this.filteredPetAdoptDetail[0]["vacci"],
      petAdopterModel:{
        petAdopterId: adoptUserId,
        petAdopterfirstName: this.filteredPetAdoptDetail[0]["petAdopter"]["firstName"],
        petAdopterlastName: this.filteredPetAdoptDetail[0]["petAdopter"]["lastName"],
        petAdopteradopterAge: this.filteredPetAdoptDetail[0]["petAdopter"]["adopterAge"],
        petAdopteradopterAddress: this.filteredPetAdoptDetail[0]["petAdopter"]["adopterAddress"],
        petAdopteradopterEmail: this.filteredPetAdoptDetail[0]["petAdopter"]["adopterEmail"],
        petAdopteradopterPhone: this.filteredPetAdoptDetail[0]["petAdopter"]["adopterPhone"]
        
      },
      petDetailModel:{
        petIdModel: this.filteredPetAdoptDetail[0]["petDetail"]["petId"],
        petNameModel: this.filteredPetAdoptDetail[0]["petDetail"]["petName"],
        petUploaderIdModel: this.filteredPetAdoptDetail[0]["petDetail"]["petUploaderId"]
      },
      adoptionStatusModel: adoptionStatus
    }
    if(adoptionStatus==='Accepted'){
      this.toastr.success('Adoption Request Accepted!', 'SUCCESS!', {
        timeOut: 5500,
        closeButton: true,
        progressBar: true
      });
    }
    console.log("New Adoption Model: ",this.adoptionModel);
    this.adoptionService.updateAdoption(adoptionId,this.adoptionModel);
  }
}
