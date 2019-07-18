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
    return this.http.get('api/products/');
  }
  getProductsById(pId: any)
  {
    return this.http.get('api/products/singleproduct/'+pId);
  }
  getproductsUser(uId: any)
  {
    return this.http.get('api/products/uploader/'+uId);
  }

  newProducts(productModel:any){
    console.log(productModel);
    this.http.post('api/products/',productModel)
    .subscribe(responseData => {
      console.log("Product added!");
    });
  }
  updateProducts(productId:any, productData:any){ 
    
    console.log("From service",productData);
    this.http.put('api/products/update/'+productId,productData)
    .subscribe(response=>{
      console.log(response);
    });
  }
  deleteProduct(productId:any){
    this.http.delete('api/products/delete/'+productId)
    .subscribe(response=>{
      console.log(response);
    });
  }
}
