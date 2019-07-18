import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PetmanagementService } from '../petmanagement.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../auth.sevice';
import { ToastrService } from 'ngx-toastr';
import { LocationService } from '../location.service';


@Component({
  selector: 'app-edit-pets',
  templateUrl: './edit-pets.component.html',
  styleUrls: ['./edit-pets.component.scss']
})
export class EditPetsComponent implements OnInit {

  sub: any;
  petId: string;
  petData: any;
  namePattern: string = '^([a-zA-Z_\-]*)$';
  imageSrc: string;
  currentUserId: string;
  currentUser: any;
  api_location: any;
  comma: string =', ';
  inputLoc: string;
  searchLocationTerm: any;
  currentLoc: any;

  constructor(
    private titleService:Title,
    private route: ActivatedRoute,
    private router: Router,
    private petService: PetmanagementService,
    private authService: AuthService,
    private toastr: ToastrService,
    private loc: LocationService
    ) {
      this.titleService.setTitle("Edit Pet Profile - StraySpirit");
     }


  editPetsForm = new FormGroup({
    petName: new FormControl('', [Validators.required,Validators.pattern(this.namePattern)]),
    petCategory: new FormControl('', Validators.required),
    petGender: new FormControl('', Validators.required),
    petAge: new FormControl('', Validators.required),
    petHealth: new FormControl('', Validators.required),
    petDescription: new FormControl('', Validators.required),
    adoptionStatus: new FormControl('', Validators.required),
    petPic: new FormControl(''),
    searchLocation: new FormControl('', Validators.required)
  })

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.petId = params['id']; 
      console.log(this.petId);
      this.currentUserId=this.authService.getUserId();
      console.log("This id has logged in: ",this.currentUserId);
      this.authService.getUserById(this.currentUserId).subscribe(currentUserData =>{
        this.currentUser=currentUserData;
        console.log("Logged in user details:",this.currentUser);
      })
   });

  this.petService.getPetById(this.petId).subscribe(petDetail=>{
    this.petData=petDetail;
    console.log(this.petData);
    this.editPetsForm.controls.petName.patchValue(this.petData["petName"]);
    this.editPetsForm.controls.petCategory.patchValue(this.petData["petCategory"]);
    this.editPetsForm.controls.petGender.patchValue(this.petData["petGender"]);
    this.editPetsForm.controls.petAge.patchValue(this.petData["petAge"]);
    this.inputLoc = this.petData["petLocation"]["petCity"]+this.comma+this.petData["petLocation"]["petState"]+this.comma+this.petData["petLocation"]["petCountry"];
    this.editPetsForm.controls.searchLocation.patchValue(this.inputLoc);
    this.editPetsForm.controls.petDescription.patchValue(this.petData["petDescription"]);
    this.editPetsForm.controls.petHealth.patchValue(this.petData["petHealth"]);     
    this.editPetsForm.controls.adoptionStatus.patchValue(this.petData["adoptionStatus"]);     
    this.imageSrc=this.petData["petPic"];
    this.searchLocationTerm = this.inputLoc.split(',');
  },error=>{
    this.router.navigate(['/pet-not-found']);
  })

  }
  
onKeydown(event:any) {
  this.currentLoc=event.target.value;
  //getting autocomplete suggestions
  if(this.currentLoc.length>2){
  this.loc.getLocation(this.currentLoc).subscribe(data =>{
    //console.log(data);
    this.api_location = data;
    //console.log(this.api_location);
  })
}

}

filterPet(searchTerm){
  // getting search term from user
  this.searchLocationTerm = searchTerm.split(',');
  this.searchLocationTerm[0] =this.searchLocationTerm[0].replace(/\s/g, "");
  this.searchLocationTerm[1] =this.searchLocationTerm[1].replace(/\s/g, "");
  this.searchLocationTerm[2] =this.searchLocationTerm[2].replace(/\s/g, "");
  console.log(this.searchLocationTerm);
}
  //Image conversion to base64:  https://stackoverflow.com/questions/48216410/angular-4-base64-upload-component
  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imageSrc = reader.result;
    console.log(this.imageSrc);
  }

  editPet(){
    this.petData = {
     petNameModel: this.editPetsForm.get('petName').value,
     petCategoryModel: this.editPetsForm.get('petCategory').value,
     petGenderModel: this.editPetsForm.get('petGender').value,
     petAgeModel: this.editPetsForm.get('petAge').value,
     petHealthModel: this.editPetsForm.get('petHealth').value,
     petAdoptionStatusModel: this.editPetsForm.get('adoptionStatus').value,
     petLocationModel:{
       petCityModel: this.searchLocationTerm[0],
     petStateModel: this.searchLocationTerm[1],
     petCountryModel: this.searchLocationTerm[2]
     },
     petDescriptionModel: this.editPetsForm.get('petDescription').value,
     petPicModel: this.imageSrc,
     petUploaderModel: {
       petUploaderId: this.currentUserId,
       petUploaderfirstName: this.petData["petUploader"]["firstName"],
       petUploaderlastName: this.petData["petUploader"]["lastName"]
       }
   }
   console.log(this.petData);
   this.petService.updatePets(this.petId,this.petData);
   this.toastr.success('Pet Profile Edited!', 'SUCCESS!', {
    timeOut: 5500,
    closeButton: true,
    progressBar: true
  });
  setTimeout(()=>{  
    this.router.navigate(['/profile/my-pet-ads']);
     }, 2000);
  
 }
}
