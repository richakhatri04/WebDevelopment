// Developer : Aditya Gadhvi (B00809664)
// Modified by Marlee Donnelly (B00710138) in July 2019
//  modified by Ajith Jayanthi B00825322 aj788769@dal.ca
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.sevice';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingcartService } from '../shoppingcart.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit,OnDestroy {
  private authListenerSubs:Subscription;
  private rsub;
  public isUserAuthenticated=false;

  isAdmin = false;
  isSuperAdmin = false;
  items_in_cart : string ="0";

  constructor(private authService:AuthService, private router:Router, private shoppingCartService: ShoppingcartService) { }

  //This method will be executed when the nav will be launched for the first time. It will check whether the user is logged in or not. If so, it will set isUserAuthenticated to true, or else set to false.
  ngOnInit() {
    this.shoppingCartService.existing.subscribe(shopping_count => this.items_in_cart = shopping_count)
    if(JSON.parse(localStorage.getItem("shopping_cart")) != null){
      this.items_in_cart = String(JSON.parse(localStorage.getItem("shopping_cart")).length);
    }
    else{
      this.items_in_cart="0";
    }
    this.isUserAuthenticated=this.authService.getIsAuth();
    this.authListenerSubs=this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated=> {
        this.isUserAuthenticated=isAuthenticated;
        this.isAdmin = this.authService.getIsAdmin();
        this.isSuperAdmin = this.authService.getIsSuperAdmin();
      }
    );
  }


  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }

  //This method will get executed when the user will click on the logout.
  onLogout(){
    this.authService.logout();
  }

}
