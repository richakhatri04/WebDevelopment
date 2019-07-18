import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "./auth.sevice";

@Injectable({
  providedIn: 'root'
})
//This class protects pages that are only meant to be acces
export class SuperAdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if(this.authService.getIsSuperAdmin()){
      return true;
    }
    else{
      //If the user tries to access an admin page without the correct privileges, show an error message
      this.router.navigate(['/unauthorized']);
    }
  }
}
