// Developed By Ajith Jayanthi B00825322 aj788769@dal.ca
import { Injectable } from '@angular/core';
import { HttpClient , HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingcartService {
  private initial = new BehaviorSubject<string>('0');
  
  existing=this.initial.asObservable();
    constructor(private http: HttpClient) { }

  updatecount(shopping_count: string){
      this.initial.next(shopping_count);
  }
  insertPurchaseDetails(shoppingCartData:any){
    this.http.post('api/shoppingCart/',shoppingCartData)
    .subscribe(responseData => {
      console.log("Cart deatils added!");
    });
  }
}
