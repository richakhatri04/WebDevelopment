// Author: Marlee Donnelly (B00710138)
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPersonalUsers(){
    //return all users who don't have an organization account
    return this.http.get('api/user');
  }
  getOrganizationUsers(){
    //return all users who have an organization account
    return this.http.get('api/user/org');
  }
}
