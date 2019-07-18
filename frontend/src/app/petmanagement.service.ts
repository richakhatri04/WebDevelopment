import { Injectable } from '@angular/core';
import { HttpClient , HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class PetmanagementService {

  constructor(private http: HttpClient) {

   }

  getPets(){
    //getting all pet profiles
    return this.http.get('api/pets/');
  }
  getPetById(id:any){
    //getting pet detail by id
    return this.http.get('api/pets/singlepet/'+id);
  }
  newPets(petModel:any){
    //adding a new pet
    console.log(petModel.petNameModel);
    this.http.post('api/pets/',petModel)
    .subscribe(responseData => {
      console.log("Pet added!");
    });
  }
  petUser(userId:any){
    //getting pets by userId
    return this.http.get('api/pets/uploader/'+userId);
  }
  updatePets(petId:any, petData:any){
    //editing pets
    console.log("From service",petData);
    this.http.put('api/pets/update/'+petId,petData)
    .subscribe(response=>{
      console.log(response);
    });
  }
  deletePet(petId:any){
    //deleting pets
    this.http.delete('api/pets/delete/'+petId)
    .subscribe(response=>{
      console.log(response);
    });
  }
}
