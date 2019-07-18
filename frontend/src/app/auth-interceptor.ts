// Developer : Aditya Gadhvi (B00809664)

// Interceptor is used intercept each outgoing request and attach the token with it.

import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.sevice';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private authService:AuthService){}

    intercept(req:HttpRequest<any>,next:HttpHandler){
        const authToken=this.authService.getToken();
        
        const authRequest=req.clone(
            {
                headers:req.headers.set("Authorization","Bearer "+authToken)
            }
        );
        
        return next.handle(authRequest);
    }
}