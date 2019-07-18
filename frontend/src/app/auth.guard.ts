// Developer : Aditya Gadhvi (B00809664)

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.sevice';

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private authService:AuthService,private router:Router){
        
    }

    //This method will work as an Authorization guard. It will only allow logged in users to access their profile. No one will be able to open the /profile page, unless they are logged in.
    //AuthGuard will protect /profile page. Any user who is not logged in will be automatically redirected to the login page. 
    canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean | Observable<boolean> | Promise<boolean>{

         const isAuth=this.authService.getIsAuth();
         if(!isAuth){
            this.router.navigate(['/login']);
         }
        return isAuth;
    }
}
    
