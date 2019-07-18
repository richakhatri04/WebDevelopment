/** Authored by Shehzeen[B00812551]
    Modified by Lakshmi Ponnuru [B00811623] */

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DonationService } from '../donation.service';
import { Router } from '@angular/router';

/**
 * Component
 */
@Component({
  selector: 'app-donate-shehzeen',
  templateUrl: './donate-shehzeen.component.html',
  styleUrls: ['./donate-shehzeen.component.scss']
})


export class DonateShehzeenComponent implements OnInit {

  emailPattern: string = '^[a-zA-Z0-9*_.-]+@[a-zA-Z]+[.][a-zA-Z]{2,3}$';
  donationModel: any;
  donateForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private donationService: DonationService,
    private router: Router) { }

	/**
	 * This code is done by the help  from https://stackblitz.com/edit/numeric-only
	 * This function checks and validates that the amount field lets the user only enter numbers
	 * @param event
	 * @returns  boolean
	 */


	/**
	 * on init : This function runs at the component initialization
	 */
  ngOnInit() {

    // form validations for the donation page
    this.donateForm = this.formBuilder.group({
      donorFirstName: ['', [Validators.required]],
      donorLastName: ['', [Validators.required]],
      emailID: ['', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]],
      amount: ['', [Validators.required]],
      frequency: ['', [Validators.required]]
    });

  }

  /**
   * Gets fr This function is the getter for donateformrecurring controls
   */
  get fr() { return this.donateForm.controls; }


  show: boolean = false;
  toggle() {
    this.show = true;

  }

  // This function runs on form submission and connects to the service
  onDonation() {
    this.submitted = true;
    this.donationModel = {
      donorFirstNameModel: this.donateForm.get('donorFirstName').value,
      donorLastNameModel: this.donateForm.get('donorLastName').value,
      emailIDModel: this.donateForm.get('emailID').value,
      amountModel: this.donateForm.get('amount').value,
      frequencyModel: this.donateForm.get('frequency').value
    }
    if (this.donateForm.valid) {
      this.router.navigateByUrl('/payment_gateway');
    }
    else if (this.donateForm.invalid) {
      return;
    }
    console.log('hi');
    this.donationService.newDonation(this.donationModel);
  }
}
