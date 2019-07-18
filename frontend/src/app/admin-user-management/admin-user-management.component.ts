// Author: Marlee Donnelly (B00710138)

import {Component, OnInit, ViewChild} from '@angular/core';
import { UserService } from "../user.service";
import { AuthService } from "../auth.sevice";
import { ModalDirective } from "angular-bootstrap-md";
import { MatTable } from "@angular/material";

@Component({
  selector: 'app-admin-user-management',
  templateUrl: './admin-user-management.component.html',
  styleUrls: ['./admin-user-management.component.scss']
})
export class AdminUserManagementComponent implements OnInit {
  @ViewChild('confirmDelete') warningModal: ModalDirective;
  @ViewChild('userTable') table: MatTable<any>;

  personalUsers: any = [];
  organizations: any = [];
  currentList: any = [];
  userData: { };

  showAdminTable = false;
  //0 - Users, 1 - Organizations, 2 - Admins
  tabSelected = 0;
  idToDelete = "";
  userCols = ['name', 'email', 'activity', 'admin', 'delete'];
  adminCols = ['username', 'email', 'admin', 'superAdmin'];
  colsToShow = this.userCols;

  constructor(
    private userService: UserService,
    private authService: AuthService,) { }

  ngOnInit() {
    //Get all users
    this.userService.getPersonalUsers().subscribe(userData =>{
      this.personalUsers = userData;
      this.currentList = this.personalUsers;
    })
    this.userService.getOrganizationUsers().subscribe(orgData => {
      this.organizations = orgData;
    })
    this.showUsers();
  }

  showUsers(){
    this.currentList = this.personalUsers;
    this.colsToShow = this.userCols;
    this.showAdminTable = false;
    this.tabSelected = 0;
  }
  showOrganizations(){
    this.currentList = this.organizations;
    this.colsToShow = this.userCols;
    this.showAdminTable = false;
    this.tabSelected = 1;
  }
  showAdmins(){
    var admins = [];
    for (let user of this.personalUsers){
      if(user.isAdmin) {
        admins.push(user);
      }
    }
    for (let user of this.organizations){
      if(user.isAdmin) {
        admins.push(user);
      }
    }
    this.currentList = admins;
    this.colsToShow = this.adminCols;
    this.showAdminTable = true;
    this.tabSelected = 2;
  }
  //Check whether they're an admin or not and set the new value to the opposite
  toggleAdmin(id){
    // For personal accounts
    if(this.tabSelected === 0){
      this.authService.getUserById(id).subscribe(targetUserData => {
          this.changeRegularAdmin(id, targetUserData['isAdmin']);
          this.authService.updateUserData(id,this.userData).subscribe(response=>{
            console.log(response);
            this.reloadTable();
          });
      })
    }

    // If not a personal account, handle the organization account
    else if(this.tabSelected === 1){
      this.authService.getOrgById(id).subscribe(targetOrgData => {
        this.changeRegularAdmin(id, targetOrgData['isAdmin']);
        this.authService.updateOrgData(id, this.userData).subscribe(response=>{
          console.log(response);
          this.reloadTable();
        });
      })

    }
    else {
      // If the id matches a document in the personal user collection, update them using the personal route
      this.authService.getUserById(id).subscribe(targetUserData => {
        if(targetUserData != null) {
          this.changeRegularAdmin(id, targetUserData['isAdmin']);
          this.authService.updateUserData(id,this.userData).subscribe(response=>{
            console.log(response);
            this.reloadTable();
          });
        }
      })
      //Otherwise, it's an organization
      this.authService.getOrgById(id).subscribe(targetOrgData => {
        if(targetOrgData != null) {
          this.changeRegularAdmin(id, targetOrgData['isAdmin']);
          this.authService.updateOrgData(id, this.userData).subscribe(response=>{
            console.log(response);
            this.reloadTable();
          });
        }
      })
    }
  }

  toggleSuperAdmin(id){
    // If the id matches a document in the personal user collection, update them using the personal route
    this.authService.getUserById(id).subscribe(targetUserData => {
      if(targetUserData != null) {
        this.changeSuperAdmin(id, targetUserData['isSuperAdmin']);
        this.authService.updateUserData(id,this.userData).subscribe(response=>{
            console.log(response);
            this.reloadTable();
          });
      }
    })
    //Otherwise, it's an organization
    this.authService.getOrgById(id).subscribe(targetOrgData => {
      if(targetOrgData != null) {
        this.changeSuperAdmin(id, targetOrgData['isSuperAdmin']);
        this.authService.updateOrgData(id, this.userData).subscribe(response=>{
          console.log(response);
          this.reloadTable();
        });
      }
    })
  }

  changeRegularAdmin(id, isAdmin){
    if (isAdmin) {
      //If removing regular admin status, remove super admin status too
      this.userData = {
        isAdminModel: false,
        isSuperAdminModel: false,
      }
    }
    else {
      //Make the user a regular admin
      this.userData = {
        isAdminModel: true,
      }
    }
  }
  changeSuperAdmin(id, isSuperAdmin){
    if (isSuperAdmin) {
      console.log("removing super admin status");
      //Just remove super admin status
      this.userData = {
        isSuperAdminModel: false,
      }
    }
    else {
      //If giving super admin status, grant regular admin status too
      console.log("granting super admin status");
      this.userData = {
        isAdminModel: true,
        isSuperAdminModel: true,
      }
    }
  }

  reloadTable(){
    // Get updated data for the table
    if(this.tabSelected == 0){
      this.userService.getPersonalUsers().subscribe(userData =>{
      this.personalUsers = userData;
      this.currentList = this.personalUsers;
      })
    }
    else if(this.tabSelected == 1){
      this.userService.getOrganizationUsers().subscribe(orgData => {
      this.organizations = orgData;
      this.currentList = this.organizations;
    })
    }
    else{
      this.userService.getPersonalUsers().subscribe(userData => {
        this.personalUsers = userData;

        this.userService.getOrganizationUsers().subscribe(orgData => {
        this.organizations = orgData;
        })

        this.showAdmins();
      })
    }

    // Now refresh the contents of the table
    this.table.renderRows();
  }

  showDeletePopup(id){
    this.warningModal.show();
    this.idToDelete = id;
  }

  hideDeletePopup(){
    this.idToDelete = "";
    this.warningModal.hide();
  }

  deleteUser(){
    if(this.idToDelete != "") {
      if (this.tabSelected == 0) {
        this.authService.deleteUser(this.idToDelete).subscribe(response =>{
          console.log(response);
          this.reloadTable();
          this.warningModal.hide();
        });
      }
      else if (this.tabSelected == 1) {
        this.authService.deleteOrganization(this.idToDelete).subscribe(response =>{
          console.log(response);
          this.reloadTable();
          this.warningModal.hide();
        });
      }
    }
  }

}
