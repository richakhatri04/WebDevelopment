import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdoptionService {

  constructor(private http: HttpClient) { }

  newAdoption(adoptionModel:any){
    console.log(adoptionModel);
    this.http.post('api/adoption/',adoptionModel)
    .subscribe(responseData =>{
      console.log("Adoption Request Sent!");
    })
  }

  adopterUser(userId:string){
    console.log(userId);
    return this.http.get('api/adoption/adopterUser/'+userId);
  }

  adoptPetById(petId:string){
    console.log(petId);
    return this.http.get('api/adoption/petadopt/'+petId);
  }
  
  deleteAdoption(adoptId:any){
    //deleting pets
    this.http.delete('api/adoption/delete/'+adoptId)
    .subscribe(response=>{
      console.log(response);
    });
  }
  updateAdoption(adoptionId:any, adoptionData:any){
    //editing pets
    this.http.put('api/adoption/update/'+adoptionId,adoptionData)
    .subscribe(response=>{
      console.log(response);
    });
  }

  adoptReqMail(email:any){
    this.http.post('api/adoption/adopt-req',email)
    .subscribe(responseData =>{
      console.log("Adoption Mail Sent!");
    })
  }


}
