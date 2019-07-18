// Developer - Dheeraj Varshney B00808467 dh301823@dal.ca 
// Modified By - Ajith Jayanthi B00825322 aj788769@dal.ca
import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { FormControl } from '@angular/forms';
import { ProductmanagementService } from '../productmanagement.service'
import { ToastrService } from 'ngx-toastr';
import {ShoppingcartService} from '../shoppingcart.service';
@Component({
  selector: 'app-productlisting',
  templateUrl: './productlisting.component.html',
  styleUrls: ['./productlisting.component.scss']
})
export class ProductlistingComponent implements OnInit {
  
  
  products: any = [];
  product_newData: any;
  allProducts: any;
  productCategory=new FormControl();
  product_details : any ={};
  cart_items:any=[];
  item_exists:boolean;
  constructor(private toastr: ToastrService,private productService: ProductmanagementService,private shoppingCartService: ShoppingcartService) { }
  global_cart_count:string;
 
  ngOnInit() {
    this.product_details={};
      this.productService.getProducts().subscribe(productData =>
        {
      this.product_newData=productData;
      this.allProducts=this.product_newData;
      console.log(this.allProducts);
       })
       //code to update the global shopping cart products count
       this.shoppingCartService.existing.subscribe(shopping_count => this.global_cart_count = shopping_count)
  }
filtCat(cat:string){
  console.log(cat);
  if(cat==='all'){
    this.product_newData=this.allProducts;
  }
  else{
    this.product_newData = this.allProducts.filter(filterProducts =>{
      return filterProducts.productCategory.includes(cat);
    })
  }
}
categoryChange(event){
  if(!event){
    console.log(this.productCategory.value);
    switch(this.productCategory.value){
      case 'atoz':
      console.log("Inside A to z");
      this.product_newData = this.allProducts.sort(this.sortByName);
      break;
      case 'ztoa':
      console.log("Inside Z to A");
      this.product_newData = this.allProducts.sort(this.reverseSortByName);
      break;
      case 'lowtohigh':
      console.log("Inside lowtohigh");
      this.product_newData = this.allProducts.sort(this.lowToHigh);
      break;
      case 'hightolow':
      console.log("Inside hightolow");
      this.product_newData = this.allProducts.sort(this.highToLow);
      break;
    }
  }
}
sortByName(a: any, b:any){
  if(a.productName>b.productName) return 1
  else if(a.productName===b.productName) return 0
  else return -1;
}
lowToHigh(a: any, b:any){
  if(a.productPrice>b.productPrice) return 1
  else if(a.productPrice===b.productPrice) return 0
  else return -1;
}
highToLow(a: any, b:any){
  if(a.productPrice<b.productPrice) return 1
  else if(a.productPrice===b.productPrice) return 0
  else return -1;
}
reverseSortByName(a: any, b:any){
  if(a.productName<b.productName) return 1
  else if(a.productName===b.productName) return 0
  else return -1;
}

onClick()
  {
    window.location.href = '/product-detail-page';
    
  }
  // method to add products to the cart
  addToCart(productpic,productname,productprice,productid,productDescription,uploaderid){
    this.product_details={};
    this.cart_items=JSON.parse(localStorage.getItem("shopping_cart"));
    if(this.cart_items == null){
      // add details to the first product to the cart
      this.cart_items=[];
      this.product_details["productpic"]=productpic;
      this.product_details["productname"]=productname;
      this.product_details["productprice"]=productprice;
      this.product_details["itemcount"]=1;
      this.product_details["productid"]=productid;
      this.product_details["productDescription"]=productDescription;
      this.product_details["status"]=false;
      this.product_details["uploader_id"]=uploaderid;
      this.cart_items.push(this.product_details);
      localStorage.setItem("shopping_cart",JSON.stringify(this.cart_items));
    }
    else{
      // add the products to the cart after checking if the product already exists in the cart
      this.item_exists=false;
      for(var item in this.cart_items){
        if(this.cart_items[item]["productpic"]==productpic && this.cart_items[item]["productname"]==productname ){
          this.cart_items[item]["itemcount"] = this.cart_items[item]["itemcount"]+1;
          this.item_exists=true;
          break;
        }
      }
      if(!this.item_exists){
        this.product_details["productpic"]=productpic;
        this.product_details["productname"]=productname;
        this.product_details["productprice"]=productprice;
        this.product_details["itemcount"]=1;
        this.product_details["productid"]=productid;
        this.product_details["productDescription"]=productDescription;
        this.product_details["status"]=false;
        this.product_details["uploader_id"]=uploaderid;
        this.cart_items.push(this.product_details);
      }
      localStorage.removeItem("shopping_cart");
      localStorage.setItem("shopping_cart",JSON.stringify(this.cart_items));
    } 
    //updates the global count to the shopping cart which will be displayed in the navigation menu
    this.shoppingCartService.updatecount(String((JSON.parse(localStorage.getItem("shopping_cart")).length)));
    this.toastr.success('please continue shopping....', 'Product Added to the cart', {
      timeOut: 5000,
      closeButton: true,
      progressBar: true
    });
  }

  share(){
    this.toastr.error('Just a message for Assignment 4 UI', 'Coming Soon', {
      timeOut: 5000,
      closeButton: true,
      progressBar: true
    });
  }
  
}


