//  Developed by Ajith Jayanthi B00825322 aj788769@dal.ca
import { Component, OnInit  } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ShoppingcartService} from '../shoppingcart.service';
import {formatDate } from '@angular/common';
import { AuthService } from '../auth.sevice';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-shoppingcart-ajith',
  templateUrl: './shoppingcart-ajith.component.html',
  styleUrls: ['./shoppingcart-ajith.component.scss']
})
export class ShoppingcartAjithComponent implements OnInit {
  
  product1count:number;
  product2count:number;
  product1mobilecount:number;
  product2mobilecount:number;
  cart_items:any=[];
  initial_cart_details:any=[];
  grand_total:number=0;
  first_name:string="";
  last_name:string="";
  email:string="";
  address_line1:string="";
  pincode:string="";
  phone_number:string="";
  first_name_validation:boolean=true;
  last_name_validation:boolean=true;
  email_validation:boolean=true;
  address_line1_validation:boolean=true;
  pincode_validation:boolean=true;
  phone_number_validation=true;
  email_required:boolean=true;
  pincode_required:boolean=true;
  phone_number_required:boolean=true;
  finaldata_shoppingCart={};
  current_data= new Date();
  todays_date = '';
  estimated_date_object= new Date();
  estimated_shipping_date= '';
  userId: string;
  current_User: any;
  address_line2:string="";
  regexp:RegExp;
  string_phone_number:string;
  global_cart_count:string;
  phone_regexp:RegExp;
  constructor(private toastr: ToastrService,private _formBuilder: FormBuilder,private shoppingCartService: ShoppingcartService,private authService: AuthService ) { }

  ngOnInit() {
    this.product1count=1;
    this.product2count=1;
    this.product1mobilecount=1;
    this.product2mobilecount=1;
    this.initial_cart_details=[];
    this.cart_items=[];
    this.grand_total=0;
    this.first_name_validation=true;
    this.last_name_validation=true;
    this.email_validation=true;
    this.address_line1_validation=true;
    this.pincode_validation=true;
    this.phone_number_validation=true;
    this.email_required=true;
    this.pincode_required=true;
    this.phone_number_required=true;
    this.first_name="";
    this.last_name="";
    this.email="";
    this.phone_number="";
    this.address_line1="";
    this.address_line2="";
    this.pincode="";
    this.finaldata_shoppingCart={};
    this.modify_cache_details();
    //To format the date in date-month-year format ex:(17-june-2019)
    // https://stackoverflow.com/questions/51299944/get-current-date-with-yyyy-mm-dd-format-in-angular-4/51300093
    this.todays_date = formatDate(this.current_data, 'dd MMMM yyyy', 'en-US', '+0530');
    //To add 7 days to the existing date
    // https://stackoverflow.com/questions/49899212/angular-4-date-for-today-and-tomorrow
    this.estimated_date_object =  new Date(this.current_data.setDate(this.current_data.getDate() + 7));
    this.estimated_shipping_date = formatDate(this.estimated_date_object, 'dd MMMM yyyy', 'en-US', '+0530');
    this.userId = this.authService.getUserId();

    this.authService.getUserById(this.userId).subscribe(currentUser => {
      this.current_User = currentUser;
    })
    this.global_cart_count="";
    //use to share the products count with navigation bar component
    // https://angularfirebase.com/lessons/sharing-data-between-angular-components-four-methods/#Unrelated-Components-Sharing-Data-with-a-Service
    this.shoppingCartService.existing.subscribe(shopping_count => this.global_cart_count = shopping_count)
    
  }
  checkout(){
    //if the user is logged in then the address fields will be auto populated by user details
    this.first_name=(this.current_User == undefined || this.current_User == null || this.current_User["firstName"] == null || this.current_User["firstName"] == undefined) ? "":this.current_User["firstName"];
    this.last_name=(this.current_User == undefined || this.current_User == null || this.current_User["lastName"] == null || this.current_User["lastName"] == undefined) ? "":this.current_User["lastName"];
    this.email=(this.current_User == undefined || this.current_User == null || this.current_User["email"] == null || this.current_User["email"] == undefined) ? "":this.current_User["email"];
  }
  modify_cache_details(){
    //used to get the shopping cart details on the page load
    this.cart_items =JSON.parse(localStorage.getItem("shopping_cart"));
    if(this.cart_items == null){
      this.cart_items=[];
    }
    this.update_grand_total();
  }
  update_grand_total(){
    //update the total price for the products in the shopping cart
    this.grand_total=0;
    for( var item in this.cart_items){
      this.grand_total = this.grand_total+(this.cart_items[item]["itemcount"] * this.cart_items[item]["productprice"]);
    }
  }
  count_items_update(productpic,productname,productcount){
    //if the item count is increased or decreased then the shopping cart will be updated accordingly
    for( var item in this.cart_items){
      if(this.cart_items[item]["productpic"] == productpic && this.cart_items[item]["productname"] == productname){
        this.cart_items[item]["itemcount"] = productcount;
        localStorage.removeItem("shopping_cart");
        localStorage.setItem("shopping_cart",JSON.stringify(this.cart_items));
        this.update_grand_total();
      }
      
    }
    
  }
  removeproduct(productpic,productname){
    //removes the item from the shopping cart
    for( var item in this.cart_items){
      if(this.cart_items[item]["productpic"] == productpic && this.cart_items[item]["productname"] == productname){
      this.cart_items.splice(item,1);
      localStorage.removeItem("shopping_cart");
      localStorage.setItem("shopping_cart",JSON.stringify(this.cart_items));
      this.shoppingCartService.updatecount(String((JSON.parse(localStorage.getItem("shopping_cart")).length)));
      this.update_grand_total();
    }
  }
  this.toastr.success('', 'Product removed successfully', {
    timeOut: 1000,
    closeButton: true,
    progressBar: true
  });
  }
  onAddressSubmit(stepper : MatStepper){
      //places the order and returns the status wheather the order is places successfully or not
    if(this.first_name == ""){
      this.first_name_validation=false;
    }
    else{
      this.first_name_validation=true;   
    }
    if(this.last_name == ""){
      this.last_name_validation=false;
    }
    else{
      this.last_name_validation=true;
    }
    if(this.email == ""){
      this.email_required=false;
    }
    else{
      this.email_required=true;
    }
    if(this.address_line1 == ""){
      this.address_line1_validation=false;
    }
    else{
      this.address_line1_validation=true;
    }
    if(this.pincode == ""){
      this.pincode_required=false;
    }
    else{
      this.pincode_required=true;
    }
    if(this.phone_number == null){
      this.phone_number_required=false;
    }
    else{
      this.phone_number_required=true;
    }
    //regular expression for checking whether the given email is valid or not
    //https://stackoverflow.com/questions/46370725/how-to-do-email-validation-using-regular-expression-in-typescript/46370978
    this.regexp = new RegExp(/^[a-zA-Z0-9*_.-]+@[a-zA-Z]+[.][a-zA-Z]{2,3}$/);
    //regular expression taken from register component developed by aadesh shah
    this.phone_regexp= new RegExp(/^[\(][0-9]{3}[\)][\-][\(][0-9]{3}[\)][\-][\(][0-9]{4}[\)]$|[0-9]{10}|[0-9]{3}-[0-9]{3}-[0-9]{4}$/);
    if((!this.regexp.test(this.email)) && this.email_required){
      this.email_validation=false;
    }
    else{
      this.email_validation=true;
    }
    if((!this.phone_regexp.test(this.phone_number)) && this.phone_number_required){ 
      this.phone_number_validation =false;
    }
    else{
      this.phone_number_validation =true;
    }
    if(this.pincode.length != 6 && this.pincode_required){
      this.pincode_validation =false;
    }
    else{
      this.pincode_validation =true;
    }
    if(this.first_name_validation && this.last_name_validation
        && this.email_required    && this.email_validation
        && this.address_line1_validation
        && this.phone_number_required && this.phone_number_validation
        && this.pincode_required && this.pincode_validation
      ){
        // https://stackoverflow.com/questions/46469233/can-i-programmatically-move-the-steps-of-a-mat-horizontal-stepper-in-angular-a
        stepper.next();
        
        this.finaldata_shoppingCart={
          // https://stackoverflow.com/questions/51536262/angular-6-saving-data-to-local-storage
          products:JSON.parse(localStorage.getItem("shopping_cart")),
          firstName: this.first_name,
          lastName:this.last_name,
          email:this.email,
          addressLine1:this.address_line1,
          addressLine2:this.address_line2,
          pincode:this.pincode,
          phoneNumber:this.phone_number,
          totalPrice:this.grand_total,
          orderPlacedDate:this.todays_date,
          estimatedDeliveryDate:this.estimated_shipping_date,
          orderStatus:"pending",
          uID:this.userId
        }
    
        this.shoppingCartService.insertPurchaseDetails(this.finaldata_shoppingCart);
        this.cart_items=[];
        localStorage.removeItem("shopping_cart");
        this.shoppingCartService.updatecount("0");
    }
    

  }
}
