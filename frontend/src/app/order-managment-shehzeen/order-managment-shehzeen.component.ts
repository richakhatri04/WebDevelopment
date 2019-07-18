import { Component, OnInit } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { OrdermanagmentService } from '../ordermanagment.service';
import {  FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.sevice';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-order-managment-shehzeen',
  templateUrl: './order-managment-shehzeen.component.html',
  styleUrls: ['./order-managment-shehzeen.component.scss'] 
})
export class OrderManagmentShehzeenComponent implements OnInit {
  updateForm: FormGroup;
  submitted = false;
  sub : any;
  order_id : any;
  order : any;
  updatedStatus : any;
 // that : any;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute, private auth: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private orders: OrdermanagmentService) { }

	

	

	/**
	 * on init : This function runs at the component initialization
	 */
	ngOnInit() {
 var that = this;
    this.updateForm = this.formBuilder.group({
      orderStatusField: ['', [Validators.required]]
  });

  this.sub = this.route.params.subscribe(params => {
    this.order_id = params['id']; 
   // this.that = this;
   this.orders.getOrdersById(this.order_id).subscribe(function(data){
     that.order = data;

   },error=>{
    this.router.navigate(["/product-not-found"]);
    });
  },error=>{
    this.router.navigate(["/product-not-found"]);
    });



  }

/**
 * Gets f this function is the getter for donate form controls
 */
get f() { return this.updateForm.controls; }

selected(event) {
  const selectedData = {
      text: (event.source.selected).viewValue,
      value: event.source.value
  }
  console.log(selectedData);
  this.updatedStatus = selectedData.text;
  debugger;
}




	/**
	 * Ondonates one time This function checks if the amount and organization both are valid then it submits else it remains on the same page.
	 * @returns  
	 */
	ondonateOneTime() {
    this.submitted = true;
    if(this.updateForm.invalid){
      return;
    }
    else{
 this.order.orderStatus = this.updatedStatus;
      this.orders.updateOrder(this.order_id,this.order);
     // debugger;
      this.toastr.success('Order Updated!', 'SUCCESS!', {
       timeOut: 5500,
       closeButton: true,
       progressBar: true
     });
    }

	}


	/**
	 * This function verifies if amountRecurring , frequency and oragnization all are given then it submits else it gives errors
	 * @returns  
	 */

  
}