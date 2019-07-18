//Authored by Aparna Sridhar [B00799570]
import { Injectable } from '@angular/core';
import { HttpClient , HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EventManagementService {

  constructor(
    private http: HttpClient
  ) { }
// POST request to the server to store the event posting
  saveEvents(model:any){
    console.log(model);
    this.http.post('api/event/',model)
    .subscribe(responseData => {
      console.log("Event added!");
    });
  }
// Retrieves all the events from the database
  getEvents(){
    return this.http.get('api/event/');
  }

  sendEmail(email:any){
    this.http.post('api/event/register/',email)
    .subscribe(responseData => {
      console.log("Email sent!");
    });
  }  
 // Retrieved single event based on the Event Id passed in GET method 
  getsingleEvent( id: string){
      return this.http.get('api/event/singleevent/' + id);
  }
}

