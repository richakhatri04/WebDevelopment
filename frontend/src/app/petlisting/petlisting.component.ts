// Developed by Aadesh Shah B00802629
import { Component, OnInit } from '@angular/core';
// Using IPAPI to get users current location, available at - https://ipapi.co/
import { LocationService } from '../location.service';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { PetmanagementService } from '../petmanagement.service';
import {Title} from "@angular/platform-browser";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-petlisting',
  templateUrl: './petlisting.component.html',
  styleUrls: ['./petlisting.component.scss']
})
export class PetlistingComponent implements OnInit {
  pets: any = [];

  api_location: any;
  pet_newData: [];
  all_Pets: any;
  current_location: any;
  comma: string =', ';
  label_value: any;
  city: any;
  currentCity: string;
  currentState: string;
  currentCountry: string;
  inputLocation: string;
  searchLocation = new FormControl();
  mobile:boolean =false;
  filteredLocation: any;
  searchLocationTerm: any;
  isLoading: boolean = false;
  pet_cat_filter: any;

  filterPetsForm = new FormGroup({
    searchLocation: new FormControl(''),
    testSearch: new FormControl('')
  });

  constructor(
    private loc: LocationService,
    private petService: PetmanagementService,
    private toastr: ToastrService,
    private titleService:Title) {
      this.titleService.setTitle("Pets Availble for Adoption near you - StraySpirit");
  }

  ngOnInit() {

    this.loc.getCurrentLocation().subscribe(currentData =>{
      //console.log(currentData);
      this.current_location=currentData;
      this.currentCity=currentData.city;
      this.currentState=currentData.region_code;
      this.currentCountry=currentData.country_name;
      //console.log(this.currentCity);
      this.inputLocation = this.currentCity+this.comma+this.currentState+this.comma+this.currentCountry;
      this.searchLocation.patchValue(this.inputLocation);
    })

    this.isLoading = true;
    this.petService.getPets().subscribe(petData =>{
      //console.log(petData);
      this.isLoading=false;
      this.all_Pets=petData;
      //filtering according to current location
      this.pet_newData=this.all_Pets.filter(filterPets =>{
        return filterPets.petLocation.petCity.includes(this.currentCity) && filterPets.petLocation.petState.includes(this.currentState) && filterPets.petLocation.petCountry.includes(this.currentCountry);
      });
      console.log(this.all_Pets);
      console.log(this.pet_newData);
    })

}
filterPet(searchTerm){
  //console.log(searchTerm);
  // getting search term from user
  this.searchLocationTerm = searchTerm.split(',');
  this.searchLocationTerm[0] =this.searchLocationTerm[0].replace(/\s/g, "");
  this.searchLocationTerm[1] =this.searchLocationTerm[1].replace(/\s/g, "");
  this.searchLocationTerm[2] =this.searchLocationTerm[2].replace(/\s/g, "");
  //console.log(this.searchLocationTerm);
}
onSearch(){
  if(!this.searchLocationTerm){
    console.log("No search term!");
    this.toastr.error('Select different Location or pets are already listed for current location', 'Error!', {
      timeOut: 5500,
      closeButton: true,
      progressBar: true
    });
  }
  else{
    this.isLoading=true;
    setTimeout(()=>{
      this.isLoading=false;
       }, 2000);
       //filtering pets according to user entered location
    this.pet_newData = this.all_Pets.filter(filterPets =>{

      return filterPets.petLocation.petCity.includes(this.searchLocationTerm[0]) && filterPets.petLocation.petState.includes(this.searchLocationTerm[1]) && filterPets.petLocation.petCountry.includes(this.searchLocationTerm[2]);
    })
  }
  //console.log("Pet data after filter",this.pet_newData);
}
onKeydown(event:any) {
    this.city=event.target.value;
    //getting autocomplete suggestions
    if(this.city.length>2){
    this.loc.getLocation(this.city).subscribe(data =>{
      //console.log(data);
      this.api_location = data;
      //console.log(this.api_location);
    })
  }

}
reloadPage(){
  window.location.reload();
}
catSelected: any;
category_filter=new FormControl();
age_filter=new FormControl();
gender_filter=new FormControl();
health_filter=new FormControl();
categoryChange(event){
  if(!event){
    this.catSelected=this.category_filter.value && this.category_filter.value.toString();
    console.log(this.catSelected);
    this.pet_cat_filter=this.catSelected.split(',');
    console.log(this.pet_cat_filter);
    if(this.searchLocationTerm){

    if(this.pet_cat_filter.length>1){
      this.pet_newData = this.all_Pets.filter(filterPets =>{
        return filterPets.petLocation.petCity.includes(this.searchLocationTerm[0])
        && filterPets.petLocation.petState.includes(this.searchLocationTerm[1])
        && filterPets.petLocation.petCountry.includes(this.searchLocationTerm[2]);
      })
      }
      else{
        this.pet_newData = this.all_Pets.filter(filterPets =>{
          return filterPets.petLocation.petCity.includes(this.searchLocationTerm[0])
          && filterPets.petLocation.petState.includes(this.searchLocationTerm[1])
          && filterPets.petLocation.petCountry.includes(this.searchLocationTerm[2])
          && filterPets.petCategory.includes(this.pet_cat_filter[0]);
        })
      }
  }
  else{
    if(this.pet_cat_filter.length>1){
    this.pet_newData = this.all_Pets.filter(filterPets =>{
      return filterPets.petLocation.petCity.includes(this.currentCity)
      && filterPets.petLocation.petState.includes(this.currentState)
      && filterPets.petLocation.petCountry.includes(this.currentCountry);
    })
    }
    else{
      this.pet_newData = this.all_Pets.filter(filterPets =>{
        return filterPets.petLocation.petCity.includes(this.currentCity)
        && filterPets.petLocation.petState.includes(this.currentState)
        && filterPets.petLocation.petCountry.includes(this.currentCountry)
        && filterPets.petCategory.includes(this.pet_cat_filter[0]);
      })
    }
  }
  }
}

ageChange(event){
  if(!event){
    this.catSelected=this.age_filter.value && this.age_filter.value.toString();
    console.log(this.catSelected);
    this.pet_cat_filter=this.catSelected.split(',');
    console.log(this.pet_cat_filter);
    if(this.searchLocationTerm){

    if(this.pet_cat_filter.length>2){
      this.pet_newData = this.all_Pets.filter(filterPets =>{
        return filterPets.petLocation.petCity.includes(this.searchLocationTerm[0])
        && filterPets.petLocation.petState.includes(this.searchLocationTerm[1])
        && filterPets.petLocation.petCountry.includes(this.searchLocationTerm[2]);
      })
      }
      else if(this.pet_cat_filter.length===2){
        this.pet_newData = this.all_Pets.filter(filterPets =>{
          return filterPets.petLocation.petCity.includes(this.searchLocationTerm[0])
          && filterPets.petLocation.petState.includes(this.searchLocationTerm[1])
          && filterPets.petLocation.petCountry.includes(this.searchLocationTerm[2])
          && (filterPets.petAge.includes(this.pet_cat_filter[0])
          || filterPets.petAge.includes(this.pet_cat_filter[1]));
        })
      }
      else{
        this.pet_newData = this.all_Pets.filter(filterPets =>{
          return filterPets.petLocation.petCity.includes(this.searchLocationTerm[0])
          && filterPets.petLocation.petState.includes(this.searchLocationTerm[1])
          && filterPets.petLocation.petCountry.includes(this.searchLocationTerm[2])
          && filterPets.petAge.includes(this.pet_cat_filter[0]);
        })
      }
  }
  else{
    if(this.pet_cat_filter.length>2){
    this.pet_newData = this.all_Pets.filter(filterPets =>{
      return filterPets.petLocation.petCity.includes(this.currentCity)
      && filterPets.petLocation.petState.includes(this.currentState)
      && filterPets.petLocation.petCountry.includes(this.currentCountry);
    })
    }
    else if(this.pet_cat_filter.length===2){
      this.pet_newData = this.all_Pets.filter(filterPets =>{
        return filterPets.petLocation.petCity.includes(this.currentCity)
        && filterPets.petLocation.petState.includes(this.currentState)
        && filterPets.petLocation.petCountry.includes(this.currentCountry)
        && (filterPets.petAge.includes(this.pet_cat_filter[0])
        || filterPets.petAge.includes(this.pet_cat_filter[1]));
      })
    }
    else{
      this.pet_newData = this.all_Pets.filter(filterPets =>{
        return filterPets.petLocation.petCity.includes(this.currentCity)
        && filterPets.petLocation.petState.includes(this.currentState)
        && filterPets.petLocation.petCountry.includes(this.currentCountry)
        && filterPets.petAge.includes(this.pet_cat_filter[0]);
      })
    }
  }
  }
}

genderChange(event){
  if(!event){
    this.catSelected=this.gender_filter.value && this.gender_filter.value.toString();
    console.log(this.catSelected);
    this.pet_cat_filter=this.catSelected.split(',');
    console.log(this.pet_cat_filter);
    if(this.searchLocationTerm){

    if(this.pet_cat_filter.length>1){
      this.pet_newData = this.all_Pets.filter(filterPets =>{
        return filterPets.petLocation.petCity.includes(this.searchLocationTerm[0])
        && filterPets.petLocation.petState.includes(this.searchLocationTerm[1])
        && filterPets.petLocation.petCountry.includes(this.searchLocationTerm[2]);
      })
      }
      else{
        this.pet_newData = this.all_Pets.filter(filterPets =>{
          return filterPets.petLocation.petCity.includes(this.searchLocationTerm[0])
          && filterPets.petLocation.petState.includes(this.searchLocationTerm[1])
          && filterPets.petLocation.petCountry.includes(this.searchLocationTerm[2])
          && filterPets.petGender.includes(this.pet_cat_filter[0]);
        })
      }
  }
  else{
    if(this.pet_cat_filter.length>1){
    this.pet_newData = this.all_Pets.filter(filterPets =>{
      return filterPets.petLocation.petCity.includes(this.currentCity)
      && filterPets.petLocation.petState.includes(this.currentState)
      && filterPets.petLocation.petCountry.includes(this.currentCountry);
    })
    }
    else{
      this.pet_newData = this.all_Pets.filter(filterPets =>{
        return filterPets.petLocation.petCity.includes(this.currentCity)
        && filterPets.petLocation.petState.includes(this.currentState)
        && filterPets.petLocation.petCountry.includes(this.currentCountry)
        && filterPets.petGender.includes(this.pet_cat_filter[0]);
      })
    }
  }
  }
}
healthChange(event){
  if(!event){
    this.catSelected=this.health_filter.value && this.health_filter.value.toString();
    console.log(this.catSelected);
    this.pet_cat_filter=this.catSelected.split(',');
    console.log(this.pet_cat_filter);
    if(this.searchLocationTerm){

    if(this.pet_cat_filter.length>1){
      this.pet_newData = this.all_Pets.filter(filterPets =>{
        return filterPets.petLocation.petCity.includes(this.searchLocationTerm[0])
        && filterPets.petLocation.petState.includes(this.searchLocationTerm[1])
        && filterPets.petLocation.petCountry.includes(this.searchLocationTerm[2]);
      })
      }
      else{
        this.pet_newData = this.all_Pets.filter(filterPets =>{
          return filterPets.petLocation.petCity.includes(this.searchLocationTerm[0])
          && filterPets.petLocation.petState.includes(this.searchLocationTerm[1])
          && filterPets.petLocation.petCountry.includes(this.searchLocationTerm[2])
          && filterPets.petHealth.includes(this.pet_cat_filter[0]);
        })
      }
  }
  else{
    if(this.pet_cat_filter.length>1){
    this.pet_newData = this.all_Pets.filter(filterPets =>{
      return filterPets.petLocation.petCity.includes(this.currentCity)
      && filterPets.petLocation.petState.includes(this.currentState)
      && filterPets.petLocation.petCountry.includes(this.currentCountry);
    })
    }
    else{
      this.pet_newData = this.all_Pets.filter(filterPets =>{
        return filterPets.petLocation.petCity.includes(this.currentCity)
        && filterPets.petLocation.petState.includes(this.currentState)
        && filterPets.petLocation.petCountry.includes(this.currentCountry)
        && filterPets.petHealth.includes(this.pet_cat_filter[0]);
      })
    }
  }
  }
}
}


