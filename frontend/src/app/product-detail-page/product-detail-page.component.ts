// Developer: Aditya Gadhvi (B00809664) (ad742065@dal.ca)

import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import { ProductmanagementService } from '../productmanagement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService  } from 'ngx-toastr';
@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.scss']
})
export class ProductDetailPageComponent implements OnInit {

  product_id: string;
  sub: any;
  product_data: any;

  constructor(
    private titleService:Title,
    private productService:ProductmanagementService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
    ) {
    this.titleService.setTitle("Product detail");
   }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.product_id = params['id']; 
      
   });
     this.productService.getProductsById(this.product_id).subscribe(product=>{
this.product_data = product;
     },error=>{
     this.router.navigate(["/product-not-found"]);
     })
  }
  // For toast message https://www.npmjs.com/package/ngx-toastr
  addToCart()
  {
  
    this.toastr.error('Just a message for Assignment4 UI', 'Coming Soon', {
      timeOut: 5000,
      closeButton: true,
      progressBar: true
    });
  }

  moreInfo()
  {
  
    this.toastr.error('Just a message for Assignment4 UI', 'Coming Soon', {
      timeOut: 5000,
      closeButton: true,
      progressBar: true
    });
  }

}
