// Developer: Aditya Gadhvi (B00809664) (ad742065@dal.ca)

import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
@Component({
  selector: 'app-why-adopt-cat',
  templateUrl: './why-adopt-cat.component.html',
  styleUrls: ['./why-adopt-cat.component.scss']
})
export class WhyAdoptCatComponent implements OnInit {

  constructor(private titleService:Title) {
    this.titleService.setTitle("Why adopt a cat?");
   }

  ngOnInit() {
  }

}
