import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-donate-lakshmi',
  templateUrl: './donate-lakshmi.component.html',
  styleUrls: ['./donate-lakshmi.component.scss']
})
export class DonateLakshmiComponent implements OnInit {

  donationForm: FormGroup;
 
  submitted = false;



constructor( private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.donationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      street: ['', [Validators.required]],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      amount: ['', [Validators.required]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.donationForm.controls;}


  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.donationForm.invalid) {
      return;
    }

    alert('Donation form submitted Successfully' )
  }
}
