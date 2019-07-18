// Developer : Aditya Gadhvi (B00809664)
// Modified by Marlee Donnelly in July 2019

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router"
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({providedIn:"root"})
export class AuthService{
    private token:string;
    private isAuthenticated=false;
    private userId:string;
    private userType:string;
    private isAdmin = (localStorage.getItem("isAdmin") == "true");
    private isSuperAdmin = (localStorage.getItem("isSuperAdmin") == "true");
    private authStatusListener=new Subject<boolean>();
    constructor(private http:HttpClient,private router: Router,private toaster:ToastrService){}

    //This method will return the token to the location where it gets called.
    getToken(){
       return this.token;
    }

    getUserType(){
        return this.userType;
    }

    //This method will return a boolean variable called "isAuthenticated". If user is logged in it will be set to true, otherwise it will be set to false.
    getIsAuth(){
       return this.isAuthenticated;
    }

    //This method will return the user_id of the logged in user.
    getUserId(){
        return this.userId;
    }

    getAuthStatusListener(){
        return this.authStatusListener.asObservable();
    }

    getIsAdmin(){
      return this.isAdmin;
    }

    getIsSuperAdmin(){
      return this.isSuperAdmin;
    }

    //This method will create a profile for a personal user. It will be called from the ts file of the register component.
     createUser( userData:any ){
        this.http.post("api/user/signup_user",userData)
        .subscribe(response=>{
            this.toaster.success('Profile created!', 'SUCCESS!', {
                timeOut: 5500,
                closeButton: true,
                progressBar: true
              });
              setTimeout(()=>{
                this.router.navigate(['/login']);
                 }, 3000);
        });

    }

 

    //This method will create a profile for an organization. It will be called from the ts file of the register component.
     createOrganizationUser(
         orgData:any
    ){
        this.http.post("api/user/signup_org",orgData)
        .subscribe(response=>{
            this.toaster.success('Profile created!', 'SUCCESS!', {
                timeOut: 5500,
                closeButton: true,
                progressBar: true
              });
              setTimeout(()=>{
                this.router.navigate(['/login']);
                 }, 3000);

        });
    }

    updateUserData(passed_userId:any, passed_userData:any){
        //editing user's data
        console.log("From service",passed_userData);
        return this.http.put('api/user/update/'+passed_userId,passed_userData)
        // Subscribe to this method in components to see the result
      }

      updateOrgData(passed_userId:any, passed_userData:any){
        //editing organization data
        console.log("From service",passed_userData);
        return this.http.put('api/user/org/update/'+passed_userId,passed_userData)
      }

      deleteUser(passed_userID:any){
        return this.http.delete('api/user/personal/'+passed_userID);
      }

      deleteOrganization(passed_userID:any){
        return this.http.delete('api/user/org/'+passed_userID);
      }

    //This method will authenticate a personal user. It will be called from the ts file of the login component.
    userLogin(loginData:any)
    {

        this.http.post<{token:string;userId:string;userType:string; isAdmin:boolean; isSuperAdmin: boolean;}>("api/user/login",loginData)
        .subscribe(response =>
            {
                const token=response.token;
                this.token=token;
                if(token !== null && token !== ''){
                    this.isAuthenticated=true;
                    this.userId=response.userId;
                    this.userType=response.userType;
                    this.isAdmin = response.isAdmin;
                    this.isSuperAdmin = response.isSuperAdmin;
                    this.authStatusListener.next(true);
                    this.saveAuthData(token, this.userId, this.userType, this.isAdmin, this.isSuperAdmin);
                    this.router.navigate(['/profile']);
                }

            },error=>{
                this.toaster.error('Invalid credentials!!!', 'ERROR!', {
                    timeOut: 5500,
                    closeButton: true,
                    progressBar: true
                  });

            }
        )
    }

    //This method will authenticate an organization user. It will be called from the ts file of the login component.
    orgLogin(orgLoginData:any)
    {

        this.http.post<{token:string;userId:string;userType:string;isAdmin:boolean;isSuperAdmin:boolean;}>("api/user/orgLogin",orgLoginData)
        .subscribe(response =>
            {
                const token=response.token;
                this.token=token;
                if(token !== null && token !== ''){
                this.isAuthenticated=true;
                this.userId=response.userId;
                this.userType=response.userType;
                this.isAdmin = response.isAdmin;
                this.isSuperAdmin = response.isSuperAdmin;
                this.authStatusListener.next(true);
                this.saveAuthData(token, this.userId, this.userType, this.isAdmin, this.isSuperAdmin);
                this.router.navigate(['/profile']);
                }

            },error=>{
                this.toaster.error('Invalid credentials!!!', 'ERROR!', {
                    timeOut: 5500,
                    closeButton: true,
                    progressBar: true
                  });
                }
        )
    }

    //This method will prevent the user from getting logged out when the app is refreshed. It will automatically authenticate the user (ofcourse if he/she is logged in). This method will be called from the main app component file.
    autoAuthUser(){
        const authInformation=this.getAuthData();
        if(authInformation.token){
            this.token=authInformation.token;
            this.isAuthenticated=true;
            this.userId=authInformation.userId;
            this.userType=authInformation.userType;
            // Convert from strings to booleans
            this.isAdmin = (authInformation.isAdmin === "true");
            this.isSuperAdmin = (authInformation.isSuperAdmin === "true");
            this.authStatusListener.next(true);
        }
        else{
            return null;
        }

    }

    //This method will be called when the user clicks on the logout button. It will clear out everything (token, userid, isAuthenticated). After clearing everything, it will redirect the logged out user to the home page.
    logout(){
        this.token=null;
        this.isAuthenticated=false;
        this.userId=null;
        this.userType=null;
        this.isAdmin = false;
        this.isSuperAdmin = false;
        this.authStatusListener.next(false);
        this.clearAuthData();
        this.router.navigate(['/']);

    }

    //This method will return all the data of the user who is currently logged in. This method will be called from the profile home component.
    getUserById(loggedInUser:any){
        return this.http.get("api/user/personal/"+loggedInUser);

    }

    getOrgById(orgId:any){
        return this.http.get("api/user/org/"+orgId);
    }

    getUserToken(token:string){
        return this.http.get("api/user/userToken/"+token);
    }

    //This method will save the token and user_Id of the logged in user in the local storage of the web browser.
    private saveAuthData(token:string,userId:string,userType:string,isAdmin:boolean,isSuperAdmin:boolean){
        localStorage.setItem("token",token);
        localStorage.setItem("userId",userId);
        localStorage.setItem("userType",userType);
        localStorage.setItem("isAdmin",isAdmin.toString());
        localStorage.setItem("isSuperAdmin",isSuperAdmin.toString());
    }

    //This method will return the data such as token, user_Id of the logged in user. Basically it returns the authentication information of the logged in user.
    private getAuthData(){
        const token=localStorage.getItem("token");
        const userId=localStorage.getItem("userId");
        const userType=localStorage.getItem("userType");
        const isAdmin=localStorage.getItem("isAdmin");
        const isSuperAdmin=localStorage.getItem("isSuperAdmin");
        if(token==="" && token===null){
            return;
        }
        return{
          token:token,
          userId:userId,
          userType:userType,
          isAdmin: isAdmin,
          isSuperAdmin: isSuperAdmin
        }
    }



    //This method will clear the token and user_Id of the logged in user from the local storage of the web browser.
    private clearAuthData(){
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("userType");
        localStorage.removeItem("isAdmin");
        localStorage.removeItem("isSuperAdmin");
    }
}
