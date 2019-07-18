import { Injectable } from '@angular/core';
import { HttpClient , HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdermanagmentService {

  constructor(private http: HttpClient) { 

  }
  newOrder(orderModel:any){
    console.log(orderModel);
    this.http.post('api/order/',orderModel)
    .subscribe(responseData => {
      console.log("Order added!");
    });
  }

  getOrders(){
    console.log("Inside getProducts");
    return this.http.get('api/order/');
  }
  getOrdersById(oId: any)
  {
    return this.http.get('api/order/singleorder/'+oId);
  }

  getPOrders(firstName: any)
  {
    return this.http.get('api/order/normalUser/'+firstName);
  }

  cancelOrder(oId: any){
    return this.http.delete('api/order/delete/'+oId);
  }

  updateOrder(orderId:any, orderData:any){ 
    
    console.log("From service",orderData);
    this.http.put('api/order/update/'+orderId,orderData)
    .subscribe(response=>{
      console.log(response);
    });
  }


}
