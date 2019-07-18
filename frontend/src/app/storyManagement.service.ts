import { Injectable } from '@angular/core';
import { HttpClient , HttpParams } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
  })
export class storyManagementService {
constructor(private http: HttpClient) {   } 
 
newStory(storyModel:any){
    this.http.post('api/stories/',storyModel)
    .subscribe(responseData => {
      console.log("Story added!");
    });
  }
getStory(){
  return this.http.get('api/stories/');
  }
  updateStory(id:any,storyData:any){
  console.log(id);
  this.http.put('api/stories/updateStory/'+id,storyData)
    .subscribe(response=>{
    console.log(response);
    console.log("Story Updated");
    //return this.http.post('api/stories/approveStory/',id);
    });
}
getApprovedStory(){
  return this.http.get('api/stories/getApprovedStory');
}
}
