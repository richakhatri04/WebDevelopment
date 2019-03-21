import { Injectable } from '@angular/core';
import { HttpClient , HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductmanagementService {

  constructor(private http: HttpClient) { 

   }
   
  getProducts(){
    console.log("Inside getProducts");
    return this.http.get('http://localhost:3000/products/');
  }
  getProductsById(pId: any)
  {
    return this.http.get('http://localhost:3000/products/singleproduct/'+pId);
  }
  getproductsUser(uId: any)
  {
    return this.http.get('http://localhost:3000/products/uploader/'+uId);
  }

  newProducts(productModel:any){
    console.log(productModel);
    this.http.post('http://localhost:3000/products/',productModel)
    .subscribe(responseData => {
      console.log("Product added!");
    });
  }
}
