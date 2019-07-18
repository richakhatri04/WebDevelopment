import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  //TODO: replace with real event objects
  sampleEvents = ['Pet Painting Class', 'Puppy Yoga', 'Barbecue Fundraiser', 'Pet Food Drive', 'Agility Contest'];
  samplePets = ['Bran', 'Arya', 'Jon', 'Sansa', 'Rickon', 'Robb'];

  constructor() { }

  ngOnInit() {
  }

}
