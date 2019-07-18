/** Author : Shehzeen B00812551 */
import { Component, OnInit } from '@angular/core'; 
import {MatExpansionModule} from '@angular/material/expansion';
import {  FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import {Title} from "@angular/platform-browser";
import { AuthService } from '../auth.sevice';
import { ProductmanagementService } from '../productmanagement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import { ToastrService  } from 'ngx-toastr';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material';

/**
 * Component
 */
@Component({
  selector: 'app-product-review-shehzeen',
  templateUrl: './product-review-shehzeen.component.html',
  styleUrls: ['./product-review-shehzeen.component.scss']
})


export class ProductReviewShehzeenComponent implements OnInit { 
 
  @ViewChild('review') inputEl:ElementRef;
  reviewForm: FormGroup;
  submitted = false;
 
  namePattern: string = '';//'/^[\w\s]+$/';  

  product_id: string;
  product_reviews: any;
  sub: any;
  product_data: any;
  currentUserId : any;
  currentUser : any;
  productData : any;
  dirty: boolean;
  objectIdToBeEdited : 0;
  

  constructor(
    private titleService:Title,
    private formBuilder: FormBuilder,
    private productService:ProductmanagementService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
    ) {
    this.titleService.setTitle("Product detail");
   }
  
/**
 * on init This function intanciate the review form with all the validators present in the form.Also the function fetches the details of the user from the backend for authentication purpose.
 */
ngOnInit() { 
  var that = this;
this.objectIdToBeEdited = null;
    this.dirty = false;   
    this.reviewForm = this.formBuilder.group({
      reviewBox: ['', [Validators.required,Validators.pattern(this.namePattern)]],
    });
//Fetching the user id from the database.
    this.currentUserId=this.authService.getUserId();
    console.log("This id has logged in: ",this.currentUserId);

    //Fetching the user details by the help of user id from the database.
    this.authService.getUserById(this.currentUserId).subscribe(currentUserData =>{
      this.currentUser=currentUserData;
      console.log("Logged in user details:",this.currentUser);
    },error=>{
   
      });

    this.sub = this.route.params.subscribe(params => {
      this.product_id = params['id']; 
      
   });

//Fetching the product details from the databse so that the details along with the reviews can be displayed on the screen.
     this.productService.getProductsById(this.product_id).subscribe(product=>{
this.product_data = product;


this.product_data.productReview.forEach(function(element , i){
  debugger;
  if(element.productUploaderId == that.currentUserId){
    element.editShow = true;
  }
  else{
    element.editShow = false;

  }
  
});
this.product_reviews = this.product_data.productReview;

//this.product_data.productReview = [];
     });
  }

  editReview(event , i){
    debugger;
    this.inputEl.nativeElement.focus();
    this.dirty = true;
    this.objectIdToBeEdited = i;
    debugger;
    this.reviewForm.controls.reviewBox.setValue(this.product_data.productReview[i].productReview);
   

  }

  deleteReview(event, i){
    this.product_data.productReview.splice(i,1);
debugger;

this.productData = {
  productNameModel: this.product_data.productName,
  productDescriptionModel: this.product_data.productDescription,
  productQuantityModel: this.product_data.productQuantity,
  productPriceModel: this.product_data.productPrice,
  productCategoryModel:this.product_data.productCategory,
  productPicModel: this.product_data.productPic,
  productUploaderModel: {
    productUploaderId: this.product_data.productUploader.uId,
    productUploaderfirstName: this.product_data.productUploader.firstName,
    productUploaderlastName: this.product_data.productUploader.lastName

  },
  productReview : this.product_data.productReview 
};

    var result = this.productService.updateProducts(this.product_id , this.productData);
    console.log(this.product_data);
    
    //Toaster for the successful submission of the form.
    this.toastr.success('Successfully deleted the review for the Product.', 'SUCCESS!', {
      timeOut: 5500,
      closeButton: true,
      progressBar: true
    });


  }
/**
 * This function validates all the fields on the submit button click of the form.If all the fields are validated correctly then the review is submitted in the database.
 * @returns  
 */
onSubmit() {

 var that = this;

    this.submitted = true;
    

    // stop here if form is invalid
    if (this.reviewForm.invalid) {
        return;
    }
    else{
      //If the form is valid user details along with the review is submitted in the database.
      console.log(this.reviewForm.get('reviewBox'));
      
      if(this.dirty == false){
        this.product_data.productReview.push(
          {
            productUploaderId: this.currentUserId,
            productUploaderfirstName: this.currentUser["firstName"],
            productReview: this.reviewForm.get('reviewBox').value,
          }
        );
      }
      else{
        this.product_data.productReview.forEach(function(val, i) {
          if(i == that.objectIdToBeEdited){
            val.productReview= that.reviewForm.get('reviewBox').value;
            that.dirty = false;
            that.objectIdToBeEdited = null;
          }
          
        });


      }
     
      debugger;

      //Formulating the object for submitting to the database.
      this.productData = {
        productNameModel: this.product_data.productName,
        productDescriptionModel: this.product_data.productDescription,
        productQuantityModel: this.product_data.productQuantity,
        productPriceModel: this.product_data.productPrice,
        productCategoryModel:this.product_data.productCategory,
        productPicModel: this.product_data.productPic,
        productUploaderModel: {
          productUploaderId: this.product_data.productUploader.uId,
          productUploaderfirstName: this.product_data.productUploader.firstName,
          productUploaderlastName: this.product_data.productUploader.lastName

        },
        productReview : this.product_data.productReview 
      };
      var result = this.productService.updateProducts(this.product_id , this.productData);
    
      console.log(this.product_data);
      
      //Toaster for the successful submission of the form.
      this.toastr.success('Successfully submitted the review for the Product.', 'SUCCESS!', {
        timeOut: 5500,
        closeButton: true,
        progressBar: true
      });
      //Reset the form once the form is successfully submitted.
      this.reviewForm.reset();

    
    }
  
    
}


}
