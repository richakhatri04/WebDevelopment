import { Component,OnInit } from '@angular/core';
import { LocationService } from './location.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.sevice';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
 
})
export class AppComponent implements OnInit {

  title = 'StraySpirit';
  routeUrl: string;
  public myValue:number = 2;
  constructor(
    private authService:AuthService,
    private _router: Router,

    ){
      this._router.events.subscribe(() => this.routeUrl = this._router.url ); 
    }
    
    private hasMatches(...values: string[]): boolean {
      let matchFound: boolean = false;
      var i;
  
      // check for null or undefined first
      if(this.routeUrl){ 
          for (i=0; i<values.length; i++){
               if(this.routeUrl.indexOf(values[i]) > -1){
                  matchFound = true;
                  break;
               }
          }        
      }
  
      return matchFound;
  }
  ngOnInit(){
    this.authService.autoAuthUser();
    
  }
}
