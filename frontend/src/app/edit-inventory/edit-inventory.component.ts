import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductmanagementService } from '../productmanagement.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../auth.sevice';
import { ToastrService } from 'ngx-toastr';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-edit-inventory',
  templateUrl: './edit-inventory.component.html',
  styleUrls: ['./edit-inventory.component.scss']
})
export class EditInventoryComponent implements OnInit {
  sub: any;
  productId: string;
  productData: any;
  namePattern: string = '^([a-zA-Z_\-]*)$';
  imageSrc: string;
  currentUserId: string;
  currentUser: any;

  constructor(
    private titleService:Title,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductmanagementService,
    private authService: AuthService,
    private toastr: ToastrService
  ) 
  { 
    this.titleService.setTitle("Edit Product Inventory - StraySpirit");
  }
  editInventoryForm = new FormGroup({
    productName: new FormControl('', [Validators.required,Validators.pattern(this.namePattern)]),
    productQuantity: new FormControl('',Validators.required),
    productDescription: new FormControl('', Validators.required),
    productPrice: new FormControl('',Validators.required),
    productCategory:new FormControl('',Validators.required),
    productPic: new FormControl('')
  })
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.productId = params['id']; 
      console.log(this.productId);
      this.currentUserId=this.authService.getUserId();
      console.log("This id has logged in: ",this.currentUserId);
      this.authService.getUserById(this.currentUserId).subscribe(currentUserData =>{
        this.currentUser=currentUserData;
        console.log("Logged in user details:",this.currentUser);
      })
  });
  this.productService.getProductsById(this.productId).subscribe(productDetail=>{
    this.productData=productDetail;
    console.log(this.productData);
    this.editInventoryForm.controls.productName.patchValue(this.productData["productName"]);
    this.editInventoryForm.controls.productQuantity.patchValue(this.productData["productQuantity"]);
    this.editInventoryForm.controls.productPrice.patchValue(this.productData["productPrice"]);
    this.editInventoryForm.controls.productDescription.patchValue(this.productData["productDescription"]);
    this.editInventoryForm.controls.productCategory.patchValue(this.productData["productCategory"]);
    this.imageSrc=this.productData["productPic"];
  },error=>{
    this.router.navigate(['/product-not-found']);
  })

  }
  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imageSrc = reader.result;
    console.log(this.imageSrc);
  }

  editInventory(){
    this.productData = {
     productNameModel: this.editInventoryForm.get('productName').value,
     productDescriptionModel: this.editInventoryForm.get('productDescription').value,
     productQuantityModel: this.editInventoryForm.get('productQuantity').value,
     productPriceModel: this.editInventoryForm.get('productPrice').value,
     productCategoryModel:this.editInventoryForm.get('productCategory').value,
     productPicModel: this.imageSrc,
     productUploaderModel: {
       productUploaderId: this.currentUserId,
       productUploaderfirstName: this.currentUser["firstName"],
       productUploaderlastName: this.currentUser["lastName"]
       }

   }
   console.log(this.productData); 
   this.productService.updateProducts(this.productId,this.productData);
   this.toastr.success('Inventory  Updated!', 'SUCCESS!', {
    timeOut: 5500,
    closeButton: true,
    progressBar: true
  });
  
  setTimeout(()=>{  
  this.router.navigate(['/profile/inventory']);
}, 2000);
 
}
}
