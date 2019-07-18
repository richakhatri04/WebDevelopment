import { Component, OnInit } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {  FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Title } from "@angular/platform-browser";
import { OrdermanagmentService } from '../ordermanagment.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.sevice';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductmanagementService } from '../productmanagement.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-particular-order-manage',
  templateUrl: './particular-order-manage.component.html',
  styleUrls: ['./particular-order-manage.component.scss'] 
}) 
export class ParticularOrderManageComponent implements OnInit {
  
  currentList : any;
  //0 - pet profiles, 1 - shop items, 2 - blog posts
  tabSelected = 0;
  currentUserId : any;
  currentUser : any;
  order_data :any;
  productData :any;
  selectedOrder: any;
  checker :any;
  loop : any;
  loading : any;
  showCancel: any;

  constructor(
    private orders: OrdermanagmentService,
    private productService: ProductmanagementService,
    private toastr: ToastrService,
    private titleService: Title,
    private authService: AuthService,
    private router: Router
  ) { 
  
  }

  ngOnInit() {
    this.currentList = [{}];
    this.loading = "indeterminate";
    var that = this;
    this.loop = false;
    try {
      this.currentUserId=this.authService.getUserId();
      this.authService.getUserById(this.currentUserId).subscribe(currentUserData =>{
        this.currentUser=currentUserData;
        console.log("Logged in user details:",this.currentUser);
  
        if(that.currentUser.user_type == "seller"){
          this.orders.getOrders().subscribe ( data => {
            that.loop = true;
            this.loading = "determinate";
            that.currentList = data;
           // debugger;
          },error=>{
            this.router.navigate(['/server-cannot-process-the-request.']);
            });
      
        }
        else{
          this.orders.getPOrders(this.currentUser.firstName).subscribe ( data => {
            that.currentList = data;
            this.loop = true;
           // debugger;
          },error=>{
            this.router.navigate(['/server-cannot-process-the-request.']);
            });
      
    
        }
      },error=>{
        this.router.navigate(['/server-cannot-process-the-request.']);
        });
    }
    catch(e){
      debugger;
      this.router.navigate(['/server-cannot-process-the-request.']);

    }
    

  
  
    console.log("shehzeen");
    console.log(that.currentList);

   


  /*  this.currentUserId=this.authService.getUserId();
    console.log("This id has logged in: ",this.currentUserId);
    var that = this;
    this.authService.getUserById(this.currentUserId).subscribe ( data => {
      that.currentUser = data;
      this.productService.getProducts().subscribe(productData =>
        {
          //Place the dummy order here
          that.order_data = {
            orderName: "Order 1",
          totalPrice: "123", //Make a new function for calculating the total price
          orderPlacedDate : "10 January 2019",
          estimatedDeliveryDate : "19 January 2019",
          orderStatus : "Shipped",
          products: productData,
          orderUploader: {
            firstName: that.currentUser["firstName"],
          lastName: that.currentUser["lastName"],
          uId: that.currentUserId
          }
          
          };
          var result = this.orders.newOrder(that.order_data);


       });
    });

  
   */
   
 
 //   console.log(this.order_data);

  
  





  }

  onUpdateOrder(event){
    console.log(this.selectedOrder);
  //  debugger;
   /* this.selectedOrder.products.forEach(item => {
      
    });*/
    window.location.href = "";

  }
  open(){
    if(this.currentUser.user_type == "personal"){
      this.showCancel = true;
    }
    else{
      this.showCancel = false;
    }
    var that = this;
    that.checker = false; 
    if(this.selectedOrder.checker != true){
      this.selectedOrder.products.forEach(function(data){
      //  debugger;
        that.productService.getProductsById(data.productid).subscribe(product=>{
       debugger;
       
          //this.product_data.productReview = [];
          if(product["productUploader"]["uId"] == that.currentUserId ){
            that.checker = true;
            that.showCancel = true;
          }
               },error=>{
               this.router.navigate(["/product-not-found"]);
               });
    
      });

    }
   
  }

  /*
  if(that.currentList.checker != true ){
  d
}
*/

  onCancel(event){
    //debugger;
    var test = "";

   /* if(event.srcElement.firstElementChild.firstElementChild == null){
      test = event.srcElement.firstElementChild.value;
    }
    else{
      test = event.srcElement.firstElementChild.firstElementChild.value;
    }*/

    this.orders.cancelOrder(this.selectedOrder._id).subscribe ( data => {
     
      this.toastr.success('Order Canceled!', 'SUCCESS!', {
        timeOut: 5500,
        closeButton: true,
        progressBar: true
      });
    },
    error=>{
      this.router.navigate(['/server-cannot-process-the-request.']);

      });



  }
 
}