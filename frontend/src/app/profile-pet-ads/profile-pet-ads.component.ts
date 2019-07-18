import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { LocationService } from '../location.service';
import { PetmanagementService } from '../petmanagement.service';
import { ToastrService } from 'ngx-toastr';
import { Title } from "@angular/platform-browser";
import { AuthService } from '../auth.sevice';

@Component({
  selector: 'app-profile-pet-ads',
  templateUrl: './profile-pet-ads.component.html',
  styleUrls: ['./profile-pet-ads.component.scss']
})
export class ProfilePetAdsComponent implements OnInit {

  currentCity: string;
  currentState: string;
  currentCountry: string;
  current_location: string;
  imagePreview: any;
  namePattern: string = '^([a-zA-Z_\ -]*)$';
  petListing: any;
  currentUserId: string;
  currentUser: any;
  petFound: boolean =true;
  searchLocationTerm: any;
  currentLoc: any;
  api_location: any;
  comma: string =', ';
  inputLoc: string;
  currentUserType: string;
  currentFirstName: string;
  currentLastName: string;

  public petData: any = {}

  constructor(
    private loc: LocationService, 
    private pets: PetmanagementService,
    private toastr: ToastrService,
    private titleService: Title,
    private authService: AuthService
    ){  
      this.titleService.setTitle("My Ads - StraySpirit");
    }

  addPetsForm = new FormGroup({
    petName: new FormControl('', [Validators.required,Validators.pattern(this.namePattern)]),
    petCategory: new FormControl('', Validators.required),
    petGender: new FormControl('', Validators.required),
    petAge: new FormControl('', Validators.required),
    petHealth: new FormControl('', Validators.required),
    petDescription: new FormControl('', Validators.required),
    petPic: new FormControl(''),
    searchLocation: new FormControl('', Validators.required)
  })
  ngOnInit() {
    this.currentUserId=this.authService.getUserId();
    console.log("This id has logged in: ",this.currentUserId);
    this.currentUserType = this.authService.getUserType();
    if(this.currentUserType==='personal'){
      this.authService.getUserById(this.currentUserId).subscribe(currentUserData =>{
        this.currentUser=currentUserData;
        console.log("Logged in user details:",this.currentUser);
      })
    }
    else{
      this.authService.getOrgById(this.currentUserId).subscribe(currentUserData =>{
        this.currentUser=currentUserData;
        console.log("Logged in user details:",this.currentUser);
      })
    }
    this.loc.getCurrentLocation().subscribe(currentData =>{
      console.log(currentData);
      this.currentCity=currentData.city;
      this.currentState=currentData.region_code;
      this.currentCountry=currentData.country_name;
      console.log(this.currentCity);
      this.inputLoc = this.currentCity+this.comma+this.currentState+this.comma+this.currentCountry;
      this.addPetsForm.controls.searchLocation.patchValue(this.inputLoc);
      this.searchLocationTerm = this.inputLoc.split(',');
    })
    
    this.pets.petUser(this.currentUserId).subscribe(petData =>{
      console.log(petData);
      this.petListing= petData;
      console.log("Pets for this user: ",this.petListing);
      if(this.petListing.length===0){
        this.petFound=false;
      }
    },error =>{
      console.log("Uploader not found!");
      this.petFound=false;
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
  
  private imageSrc: string = '';
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
  addPet(){
    if(this.currentUserType==='personal'){
      this.currentFirstName = this.currentUser["firstName"];
      this.currentLastName = this.currentUser["lastName"];
    }
    else{
      this.currentFirstName = this.currentUser["organizationtName"];
      this.currentLastName = this.currentUser["organizationtName"];
    }
     this.petData = {
      petNameModel: this.addPetsForm.get('petName').value,
      petCategoryModel: this.addPetsForm.get('petCategory').value,
      petGenderModel: this.addPetsForm.get('petGender').value,
      petAgeModel: this.addPetsForm.get('petAge').value,
      petHealthModel: this.addPetsForm.get('petHealth').value,
      petLocationModel:{
        petCityModel: this.searchLocationTerm[0],
      petStateModel: this.searchLocationTerm[1],
      petCountryModel: this.searchLocationTerm[2]
      },
      petDescriptionModel: this.addPetsForm.get('petDescription').value,
      petPicModel: this.imageSrc,
      petUploaderModel: {
        petUploaderId: this.currentUserId,
        petUploaderfirstName: this.currentFirstName,
        petUploaderlastName: this.currentLastName
        }
    }
    console.log(this.petData);
    this.pets.newPets(this.petData);
    this.showSuccess();
    setTimeout(()=>{  
      window.location.reload();
       }, 2000);
  }

  deletePet(delete_id:any){
    console.log(delete_id);
    this.pets.deletePet(delete_id);
    this.toastr.warning('Pet profile deleted!', 'SUCCESS!', {
      timeOut: 5500,
      closeButton: true,
      progressBar: true
    });
    setTimeout(()=>{  
      window.location.reload();
       }, 2000);
  }
  
  showSuccess() {
    this.toastr.success('Pet profile added!', 'SUCCESS!', {
      timeOut: 5500,
      closeButton: true,
      progressBar: true
    });
  }

}
