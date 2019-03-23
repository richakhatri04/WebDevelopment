import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth.sevice';

@Component({
  selector: 'app-profile-nav',
  templateUrl: './profile-nav.component.html',
  styleUrls: ['./profile-nav.component.scss']
})
export class ProfileNavComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );


currentUserId: string;
userDetail: any;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authServ: AuthService
    ) {}
    ngOnInit() {
      this.currentUserId=this.authServ.getUserId();
      this.authServ.getUserById(this.currentUserId).subscribe(userData=>{
        this.userDetail=userData;
      })
    }
}
