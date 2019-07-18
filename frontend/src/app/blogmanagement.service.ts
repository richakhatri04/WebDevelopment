import { Injectable } from '@angular/core';
import { HttpClient , HttpParams } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
  })
export class BlogmanagementService {
constructor(private http: HttpClient) {   } 
 
newBlog(blogModel:any){
    this.http.post('api/blogs/',blogModel)
    .subscribe(responseData => {
      console.log("Blog added!");
    });
  }
  getBlog(){
    return this.http.get('api/blogs/');
    }
}